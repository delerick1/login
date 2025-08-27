export default function PunchSummary({ 
  punchHistory, 
  currentTime, 
  adminHourLimit, 
  formatTime,
  getFirstPunchIn,
  getLastPunchOut,
  getTotalHours,
  getBreakStatus
}) {
  return (
    <div className="p-4 bg-blue-50 rounded-lg">
      <h3 className="font-semibold text-blue-800 mb-4">Today's Summary</h3>
      
      {/* Basic Info */}
      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div>
          <span className="text-blue-600">First Punch IN:</span>
          <p className="font-medium">{getFirstPunchIn()}</p>
        </div>
        <div>
          <span className="text-blue-600">Last Punch OUT:</span>
          <p className="font-medium">{getLastPunchOut()}</p>
        </div>
        <div className="col-span-2">
          <span className="text-blue-600">Total Hours:</span>
          <p className="font-medium">{getTotalHours()}</p>
          {adminHourLimit && (
            <p className="text-xs text-blue-500">Limit: {adminHourLimit} hours</p>
          )}
        </div>
      </div>

      {/* Break Details */}
      <div className="space-y-2 text-sm">
        <div>
          <span className="text-blue-600">Break 1:</span>
          <p className="font-medium text-xs">{getBreakStatus('BREAK 1')}</p>
        </div>
        <div>
          <span className="text-blue-600">Break 2:</span>
          <p className="font-medium text-xs">{getBreakStatus('BREAK 2')}</p>
        </div>
        <div>
          <span className="text-blue-600">Lunch:</span>
          <p className="font-medium text-xs">{getBreakStatus('LUNCH')}</p>
        </div>
        <div>
          <span className="text-blue-600">Training:</span>
          <p className="font-medium text-xs">{getBreakStatus('TRAINING')}</p>
        </div>
        <div>
          <span className="text-blue-600">Technical:</span>
          <p className="font-medium text-xs">{getBreakStatus('TECHNICAL')}</p>
        </div>
      </div>
    </div>
  )
}