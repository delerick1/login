import { useState, useMemo } from 'react'
import AttendanceHeader from '../components/Attendance/AttendanceHeader'
import AttendanceControls from '../components/Attendance/AttendanceControls'
import AttendanceStats from '../components/Attendance/AttendanceStats'
import AttendanceTable from '../components/Attendance/AttendanceTable'
import AttendanceLegend from '../components/Attendance/AttendanceLegend'

export default function Attendance() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [highlightsEnabled, setHighlightsEnabled] = useState(true)

  // Sample user data (will come from admin/API later)
  const userData = {
    fullName: "John Smith",
    idNumber: "EMP001",
    campaignName: "Customer Support Q1",
    supName: "Sarah Johnson"
  }

  // Generate years (current year ± 2)
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i)

  // Month names
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  // Sample schedule data (from schedule tracker)
  const scheduleData = {
    Monday: { loginTime: '09:00', break1: '10:30-10:45', break2: '14:30-14:45', lunch: '12:00-13:00', totalHours: 8 },
    Tuesday: { loginTime: '09:00', break1: '10:30-10:45', break2: '14:30-14:45', lunch: '12:00-13:00', totalHours: 8 },
    Wednesday: { loginTime: '09:00', break1: '10:30-10:45', break2: '14:30-14:45', lunch: '12:00-13:00', totalHours: 8 },
    Thursday: { loginTime: '09:00', break1: '10:30-10:45', break2: '14:30-14:45', lunch: '12:00-13:00', totalHours: 8 },
    Friday: { loginTime: '09:00', break1: '10:30-10:45', break2: '14:30-14:45', lunch: '12:00-13:00', totalHours: 8 },
    Saturday: { loginTime: 'OFF', break1: '-', break2: '-', lunch: '-', totalHours: 0 },
    Sunday: { loginTime: 'OFF', break1: '-', break2: '-', lunch: '-', totalHours: 0 }
  }

  // Sample attendance data (will come from punch in data/API)
  const sampleAttendanceData = {
    1: { login: '09:05', logout: '17:30', break1Out: '10:35', break1In: '10:50', break2Out: '14:35', break2In: '14:50', lunchOut: '12:05', lunchIn: '13:05' },
    2: { login: '08:55', logout: '17:25', break1Out: '10:30', break1In: '10:45', break2Out: '14:30', break2In: '14:45', lunchOut: '12:00', lunchIn: '13:00' },
    3: { login: '09:15', logout: '17:35', break1Out: '10:40', break1In: '11:00', break2Out: '14:40', break2In: '15:00', lunchOut: '12:10', lunchIn: '13:15' },
    4: { login: '09:00', logout: '17:30', break1Out: '10:30', break1In: '10:45', break2Out: '14:30', break2In: '14:45', lunchOut: '12:00', lunchIn: '13:00' },
    5: { login: '09:02', logout: '17:28', break1Out: '10:32', break1In: '10:47', break2Out: '14:32', break2In: '14:47', lunchOut: '12:02', lunchIn: '13:02' },
    // Weekend days will show OFF or NO SHOW
  }

  // Get days in selected month
  const getDaysInMonth = (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const days = []
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' })
      days.push({
        day: dayName,
        monthDay: day,
        date: date
      })
    }
    
    return days
  }

  const daysInMonth = getDaysInMonth(selectedYear, selectedMonth)

  // Helper functions for time calculations and highlighting
  const parseTime = (timeStr) => {
    if (!timeStr || timeStr === 'OFF' || timeStr === 'NO SHOW') return null
    const [hours, minutes] = timeStr.split(':').map(Number)
    return hours * 60 + minutes
  }

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}:${mins.toString().padStart(2, '0')}`
  }

  const calculateTimeDifference = (time1, time2) => {
    const t1 = parseTime(time1)
    const t2 = parseTime(time2)
    if (t1 === null || t2 === null) return 0
    return Math.abs(t2 - t1)
  }

  const isLate = (actualTime, scheduledTime) => {
    const actual = parseTime(actualTime)
    const scheduled = parseTime(scheduledTime)
    if (actual === null || scheduled === null) return false
    return actual > scheduled
  }

  const isBreakLate = (outTime, inTime, scheduledBreak) => {
    if (!scheduledBreak || scheduledBreak === '-') return false
    const [schedOut, schedIn] = scheduledBreak.split('-')
    const actualDuration = calculateTimeDifference(outTime, inTime)
    const scheduledDuration = calculateTimeDifference(schedOut, schedIn)
    return actualDuration > scheduledDuration + 5 // 5 minutes tolerance
  }

  const calculateAdherence = (dayData, dayName) => {
    if (!dayData || !scheduleData[dayName] || scheduleData[dayName].loginTime === 'OFF') {
      return 'OFF'
    }

    const scheduledHours = scheduleData[dayName].totalHours * 60 // in minutes
    const actualHours = calculateTimeDifference(dayData.login, dayData.logout)
    const adherencePercentage = (actualHours / scheduledHours) * 100

    return `${Math.round(adherencePercentage)}%`
  }

  const getAdherenceColor = (adherence) => {
    if (adherence === 'OFF' || adherence === 'NO SHOW') return ''
    const percentage = parseInt(adherence)
    if (percentage >= 95) return 'text-green-600 font-semibold'
    if (percentage >= 85) return 'text-yellow-600 font-semibold'
    return 'text-red-600 font-semibold'
  }

  // Calculate statistics
  const stats = useMemo(() => {
    const workDays = daysInMonth.filter(day => scheduleData[day.day]?.loginTime !== 'OFF')
    const attendedDays = workDays.filter(day => sampleAttendanceData[day.monthDay]?.login)
    const lateDays = workDays.filter(day => {
      const dayData = sampleAttendanceData[day.monthDay]
      return dayData && isLate(dayData.login, scheduleData[day.day]?.loginTime)
    })

    const totalScheduledHours = workDays.reduce((sum, day) => {
      return sum + (scheduleData[day.day]?.totalHours || 0)
    }, 0)

    const totalWorkedHours = attendedDays.reduce((sum, day) => {
      const dayData = sampleAttendanceData[day.monthDay]
      if (dayData?.login && dayData?.logout) {
        return sum + (calculateTimeDifference(dayData.login, dayData.logout) / 60)
      }
      return sum
    }, 0)

    return {
      totalWorkDays: workDays.length,
      attendedDays: attendedDays.length,
      absentDays: workDays.length - attendedDays.length,
      lateDays: lateDays.length,
      attendanceRate: workDays.length > 0 ? ((attendedDays.length / workDays.length) * 100).toFixed(1) : 0,
      punctualityRate: attendedDays.length > 0 ? (((attendedDays.length - lateDays.length) / attendedDays.length) * 100).toFixed(1) : 0,
      totalScheduledHours: totalScheduledHours.toFixed(1),
      totalWorkedHours: totalWorkedHours.toFixed(1),
      hoursAdherence: totalScheduledHours > 0 ? ((totalWorkedHours / totalScheduledHours) * 100).toFixed(1) : 0
    }
  }, [selectedYear, selectedMonth, daysInMonth])

  return (
    <div className="max-w-full mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Attendance Tracker
        </h2>

        <AttendanceHeader userData={userData} />

        <AttendanceControls
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          highlightsEnabled={highlightsEnabled}
          setHighlightsEnabled={setHighlightsEnabled}
          years={years}
          months={months}
        />

        <AttendanceStats stats={stats} />

        <AttendanceTable
          daysInMonth={daysInMonth}
          sampleAttendanceData={sampleAttendanceData}
          scheduleData={scheduleData}
          highlightsEnabled={highlightsEnabled}
          calculateTimeDifference={calculateTimeDifference}
          formatTime={formatTime}
          isLate={isLate}
          isBreakLate={isBreakLate}
          calculateAdherence={calculateAdherence}
          getAdherenceColor={getAdherenceColor}
        />

        <AttendanceLegend />
      </div>
    </div>
  )
}