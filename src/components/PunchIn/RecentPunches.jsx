
export default function RecentPunches({ punchHistory, formatTime }) {
  if (punchHistory.length === 0) return null

  return (
    <div className="mb-8 p-4 bg-gray-50 rounded-lg">
      <h3 className="font-semibold text-gray-800 mb-2">Recent Punches</h3>
      <div className="space-y-1 max-h-32 overflow-y-auto">
        {punchHistory.slice(-5).reverse().map(punch => (
          <div key={punch.id} className="flex justify-between text-sm">
            <span className="font-medium">{punch.type}</span>
            <span className="text-gray-600">{formatTime(punch.time)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
