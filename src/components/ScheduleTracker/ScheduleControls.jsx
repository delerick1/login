export default function ScheduleControls({ 
  selectedYear, 
  setSelectedYear, 
  selectedMonth, 
  setSelectedMonth, 
  selectedWeek, 
  setSelectedWeek,
  years,
  months,
  weeks 
}) {
  return (
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
  )
}