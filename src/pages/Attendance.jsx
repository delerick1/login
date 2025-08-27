import { useState, useMemo } from 'react'

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

        {/* User Information Header */}
        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <span className="text-blue-600 font-medium">Full Name:</span>
              <p className="text-gray-800 font-semibold">{userData.fullName}</p>
            </div>
            <div>
              <span className="text-blue-600 font-medium">ID Number:</span>
              <p className="text-gray-800 font-semibold">{userData.idNumber}</p>
            </div>
            <div>
              <span className="text-blue-600 font-medium">Campaign Name:</span>
              <p className="text-gray-800 font-semibold">{userData.campaignName}</p>
            </div>
            <div>
              <span className="text-blue-600 font-medium">Supervisor Name:</span>
              <p className="text-gray-800 font-semibold">{userData.supName}</p>
            </div>
          </div>
        </div>

        {/* Date Selection and Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Year:</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Month:</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {months.map((month, index) => (
                  <option key={index} value={index}>{month}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Highlights:</label>
            <button
              onClick={() => setHighlightsEnabled(!highlightsEnabled)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                highlightsEnabled 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-300 text-gray-700'
              }`}
            >
              {highlightsEnabled ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-6">
          <div className="bg-blue-100 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.totalWorkDays}</div>
            <div className="text-sm text-blue-800">Work Days</div>
          </div>
          <div className="bg-green-100 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">{stats.attendedDays}</div>
            <div className="text-sm text-green-800">Attended</div>
          </div>
          <div className="bg-red-100 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-red-600">{stats.absentDays}</div>
            <div className="text-sm text-red-800">Absent</div>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.lateDays}</div>
            <div className="text-sm text-yellow-800">Late Days</div>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.attendanceRate}%</div>
            <div className="text-sm text-purple-800">Attendance</div>
          </div>
          <div className="bg-indigo-100 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-indigo-600">{stats.punctualityRate}%</div>
            <div className="text-sm text-indigo-800">Punctuality</div>
          </div>
          <div className="bg-teal-100 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-teal-600">{stats.totalWorkedHours}</div>
            <div className="text-sm text-teal-800">Hours Worked</div>
          </div>
          <div className="bg-orange-100 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.hoursAdherence}%</div>
            <div className="text-sm text-orange-800">Hours Adherence</div>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="overflow-x-auto">
          <div className="min-w-full">
            <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
              {/* Header Row */}
              <div className="grid grid-cols-16 bg-gray-100 border-b border-gray-300 text-xs">
                <div className="px-2 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">Day</div>
                <div className="px-2 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">Month Day#</div>
                <div className="px-2 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">LOGIN</div>
                <div className="px-2 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">LOG OUT</div>
                <div className="px-2 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">TIME</div>
                <div className="px-2 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">BREAK1 OUT</div>
                <div className="px-2 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">BREAK1 IN</div>
                <div className="px-2 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">TIME</div>
                <div className="px-2 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">BREAK2 OUT</div>
                <div className="px-2 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">BREAK2 IN</div>
                <div className="px-2 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">TIME</div>
                <div className="px-2 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">LUNCH OUT</div>
                <div className="px-2 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">LUNCH IN</div>
                <div className="px-2 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">TIME</div>
                <div className="px-2 py-3 text-left font-medium text-gray-700 uppercase tracking-wider">ADHERENCE</div>
              </div>

              {/* Data Rows */}
              {daysInMonth.map((dayInfo, index) => {
                const dayData = sampleAttendanceData[dayInfo.monthDay]
                const schedule = scheduleData[dayInfo.day]
                const isOff = schedule?.loginTime === 'OFF'
                const adherence = calculateAdherence(dayData, dayInfo.day)

                // Calculate times
                const totalTime = dayData?.login && dayData?.logout 
                  ? formatTime(calculateTimeDifference(dayData.login, dayData.logout))
                  : (isOff ? 'OFF' : 'NO SHOW')

                const break1Time = dayData?.break1Out && dayData?.break1In
                  ? formatTime(calculateTimeDifference(dayData.break1Out, dayData.break1In))
                  : (isOff ? 'OFF' : '-')

                const break2Time = dayData?.break2Out && dayData?.break2In
                  ? formatTime(calculateTimeDifference(dayData.break2Out, dayData.break2In))
                  : (isOff ? 'OFF' : '-')

                const lunchTime = dayData?.lunchOut && dayData?.lunchIn
                  ? formatTime(calculateTimeDifference(dayData.lunchOut, dayData.lunchIn))
                  : (isOff ? 'OFF' : '-')

                // Determine highlighting classes
                const getHighlightClass = (condition, colorClass) => {
                  return highlightsEnabled && condition ? colorClass : ''
                }

                const loginHighlight = getHighlightClass(
                  dayData?.login && isLate(dayData.login, schedule?.loginTime),
                  'bg-red-100'
                )

                const break1Highlight = getHighlightClass(
                  dayData?.break1Out && dayData?.break1In && isBreakLate(dayData.break1Out, dayData.break1In, schedule?.break1),
                  'bg-yellow-100'
                )

                const break2Highlight = getHighlightClass(
                  dayData?.break2Out && dayData?.break2In && isBreakLate(dayData.break2Out, dayData.break2In, schedule?.break2),
                  'bg-yellow-100'
                )

                const lunchHighlight = getHighlightClass(
                  dayData?.lunchOut && dayData?.lunchIn && isBreakLate(dayData.lunchOut, dayData.lunchIn, schedule?.lunch),
                  'bg-yellow-100'
                )

                const adherenceHighlight = getHighlightClass(
                  adherence !== 'OFF' && adherence !== 'NO SHOW' && parseInt(adherence) >= 95,
                  'bg-green-100'
                )

                return (
                  <div key={dayInfo.monthDay} className={`grid grid-cols-16 text-xs ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b border-gray-200 hover:bg-blue-50 transition-colors`}>
                    <div className="px-2 py-3 font-medium text-gray-900 border-r border-gray-200">{dayInfo.day}</div>
                    <div className="px-2 py-3 text-gray-900 border-r border-gray-200">{dayInfo.monthDay}</div>
                    <div className={`px-2 py-3 text-gray-900 border-r border-gray-200 ${loginHighlight}`}>
                      {dayData?.login || (isOff ? 'OFF' : 'NO SHOW')}
                    </div>
                    <div className="px-2 py-3 text-gray-900 border-r border-gray-200">
                      {dayData?.logout || (isOff ? 'OFF' : 'NO SHOW')}
                    </div>
                    <div className="px-2 py-3 text-gray-900 border-r border-gray-200">{totalTime}</div>
                    <div className={`px-2 py-3 text-gray-900 border-r border-gray-200 ${break1Highlight}`}>
                      {dayData?.break1Out || (isOff ? 'OFF' : '-')}
                    </div>
                    <div className={`px-2 py-3 text-gray-900 border-r border-gray-200 ${break1Highlight}`}>
                      {dayData?.break1In || (isOff ? 'OFF' : '-')}
                    </div>
                    <div className={`px-2 py-3 text-gray-900 border-r border-gray-200 ${break1Highlight}`}>{break1Time}</div>
                    <div className={`px-2 py-3 text-gray-900 border-r border-gray-200 ${break2Highlight}`}>
                      {dayData?.break2Out || (isOff ? 'OFF' : '-')}
                    </div>
                    <div className={`px-2 py-3 text-gray-900 border-r border-gray-200 ${break2Highlight}`}>
                      {dayData?.break2In || (isOff ? 'OFF' : '-')}
                    </div>
                    <div className={`px-2 py-3 text-gray-900 border-r border-gray-200 ${break2Highlight}`}>{break2Time}</div>
                    <div className={`px-2 py-3 text-gray-900 border-r border-gray-200 ${lunchHighlight}`}>
                      {dayData?.lunchOut || (isOff ? 'OFF' : '-')}
                    </div>
                    <div className={`px-2 py-3 text-gray-900 border-r border-gray-200 ${lunchHighlight}`}>
                      {dayData?.lunchIn || (isOff ? 'OFF' : '-')}
                    </div>
                    <div className={`px-2 py-3 text-gray-900 border-r border-gray-200 ${lunchHighlight}`}>{lunchTime}</div>
                    <div className={`px-2 py-3 border-r border-gray-200 ${adherenceHighlight} ${getAdherenceColor(adherence)}`}>
                      {adherence}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-800 mb-3">Color Legend:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-100 border border-red-200 rounded"></div>
              <span className="text-gray-700">Late Login (Red)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-100 border border-yellow-200 rounded"></div>
              <span className="text-gray-700">Extended Break/Lunch (Yellow)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
              <span className="text-gray-700">Good Adherence 95%+ (Green)</span>
            </div>
          </div>
          <div className="mt-3 text-xs text-gray-600">
            <p>• Data can be modified by administrators</p>
            <p>• Times are synchronized with Schedule Tracker and Punch In data</p>
            <p>• Adherence is calculated based on scheduled vs actual hours worked</p>
          </div>
        </div>
      </div>
    </div>
  )
}