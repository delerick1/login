import { useState } from 'react'

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

        {/* User Information Header */}
        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          </div>
        </div>

        {/* Date Selection Controls */}
        <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
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

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Week:</label>
            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(parseInt(e.target.value))}
              className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {weeks.map(week => (
                <option key={week.number} value={week.number}>{week.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Schedule Spreadsheet */}
        <div className="overflow-x-auto">
          <div className="min-w-full">
            <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
              {/* Header Row */}
              <div className="grid grid-cols-6 bg-gray-100 border-b border-gray-300">
                <div className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">
                  Day
                </div>
                <div className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">
                  Login Time
                </div>
                <div className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">
                  Break 1
                </div>
                <div className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">
                  Break 2
                </div>
                <div className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">
                  Lunch
                </div>
                <div className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  QA Time
                </div>
              </div>

              {/* Data Rows */}
              {days.map((day, index) => (
                <div key={day} className={`grid grid-cols-6 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b border-gray-200 hover:bg-blue-50 transition-colors`}>
                  <div className="px-4 py-3 text-sm font-medium text-gray-900 border-r border-gray-200">
                    {day}
                  </div>
                  <div className={`px-4 py-3 text-sm border-r border-gray-200 ${
                    scheduleData[day].loginTime === 'OFF' ? 'text-red-600 font-medium' : 'text-gray-900'
                  }`}>
                    {scheduleData[day].loginTime}
                  </div>
                  <div className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">
                    {scheduleData[day].break1}
                  </div>
                  <div className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">
                    {scheduleData[day].break2}
                  </div>
                  <div className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">
                    {scheduleData[day].lunch}
                  </div>
                  <div className="px-4 py-3 text-sm text-gray-900">
                    {scheduleData[day].qaTime}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Schedule Notes */}
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <h3 className="text-sm font-medium text-yellow-800 mb-2">Schedule Notes:</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• This schedule is assigned by your administrator</li>
            <li>• All times are in your local timezone</li>
            <li>• QA Time is mandatory quality assurance training</li>
            <li>• Contact your supervisor for schedule changes</li>
          </ul>
        </div>
      </div>
    </div>
  )
}