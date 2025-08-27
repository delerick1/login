export default function AttendanceLegend() {
  return (
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
  )
}