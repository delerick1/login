export default function ScheduleTable({ scheduleData, days }) {
  return (
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
  )
}