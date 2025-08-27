import { useState } from 'react'
import ScheduleHeader from '../components/ScheduleTracker/ScheduleHeader'
import ScheduleControls from '../components/ScheduleTracker/ScheduleControls'
import ScheduleTable from '../components/ScheduleTracker/ScheduleTable'
import ScheduleNotes from '../components/ScheduleTracker/ScheduleNotes'

export default function ScheduleTracker() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedWeek, setSelectedWeek] = useState(1)

  // Sample user data (will come from admin/API later)
  const userData = {
    fullName: "John Smith",
    idNumber: "EMP001",
    campaignName: "Customer Support Q1"
  }

  // Generate years (current year ± 2)
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i)

  // Month names
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  // Get weeks in selected month
  const getWeeksInMonth = (year, month) => {
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const weeks = []
    
    let currentWeek = 1
    let currentDate = new Date(firstDay)
    
    while (currentDate <= lastDay) {
      const weekStart = new Date(currentDate)
      const weekEnd = new Date(currentDate)
      weekEnd.setDate(weekEnd.getDate() + 6)
      
      if (weekEnd > lastDay) {
        weekEnd.setTime(lastDay.getTime())
      }
      
      weeks.push({
        number: currentWeek,
        start: weekStart,
        end: weekEnd,
        label: `Week ${currentWeek} (${weekStart.getDate()}-${weekEnd.getDate()})`
      })
      
      currentDate.setDate(currentDate.getDate() + 7)
      currentWeek++
    }
    
    return weeks
  }

  const weeks = getWeeksInMonth(selectedYear, selectedMonth)

  // Sample schedule data (will come from admin/API)
  const scheduleData = {
    Monday: { loginTime: '09:00', break1: '10:30-10:45', break2: '14:30-14:45', lunch: '12:00-13:00', qaTime: '16:00-16:30' },
    Tuesday: { loginTime: '09:00', break1: '10:30-10:45', break2: '14:30-14:45', lunch: '12:00-13:00', qaTime: '16:00-16:30' },
    Wednesday: { loginTime: '09:00', break1: '10:30-10:45', break2: '14:30-14:45', lunch: '12:00-13:00', qaTime: '16:00-16:30' },
    Thursday: { loginTime: '09:00', break1: '10:30-10:45', break2: '14:30-14:45', lunch: '12:00-13:00', qaTime: '16:00-16:30' },
    Friday: { loginTime: '09:00', break1: '10:30-10:45', break2: '14:30-14:45', lunch: '12:00-13:00', qaTime: '16:00-16:30' },
    Saturday: { loginTime: 'OFF', break1: '-', break2: '-', lunch: '-', qaTime: '-' },
    Sunday: { loginTime: 'OFF', break1: '-', break2: '-', lunch: '-', qaTime: '-' }
  }

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Schedule Tracker
        </h2>

        <ScheduleHeader userData={userData} />

        <ScheduleControls
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          selectedWeek={selectedWeek}
          setSelectedWeek={setSelectedWeek}
          years={years}
          months={months}
          weeks={weeks}
        />

        <ScheduleTable scheduleData={scheduleData} days={days} />

        <ScheduleNotes />
      </div>
    </div>
  )
}