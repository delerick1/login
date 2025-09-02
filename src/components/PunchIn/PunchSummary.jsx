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
  const formatTimeShort = (timeStr) => {
    if (timeStr === '--:--') return '--:--'
    // Convert from full format to short format
    const match = timeStr.match(/(\d{1,2}):(\d{2}):(\d{2}) (AM|PM)/)
    if (match) {
      return `${match[1]}:${match[2]} ${match[4]}`
    }
    return timeStr
  }

  return (
    <div className="punch-summary">
      <h3>Today's Summary</h3>
      
      <div className="punch-summary-line">
        <div className="punch-summary-small">First Punch IN:</div>
        <div className="punch-summary-big">{formatTimeShort(getFirstPunchIn())}</div>
      </div>

      <div className="punch-summary-line">
        <div className="punch-summary-small">Last Punch OUT:</div>
        <div className="punch-summary-big">{formatTimeShort(getLastPunchOut())}</div>
      </div>

      <div className="punch-summary-line">
        <div className="punch-summary-small">Total Hours:</div>
        <div className="punch-summary-big">{getTotalHours()}</div>
      </div>

      {adminHourLimit && (
        <div className="punch-limit">
          <div className="punch-summary-small">Limit:</div>
          <div className="punch-summary-big">{adminHourLimit} hours</div>
        </div>
      )}

      <hr className="punch-divider" />

      <div className="punch-breaks-grid">
        <div className="punch-break-line">
          <div className="punch-summary-small">Break 1:</div>
          <div className="punch-summary-big">{getBreakStatus('BREAK 1')}</div>
        </div>
        <div className="punch-break-line">
          <div className="punch-summary-small">Break 2:</div>
          <div className="punch-summary-big">{getBreakStatus('BREAK 2')}</div>
        </div>
        <div className="punch-break-line">
          <div className="punch-summary-small">Lunch:</div>
          <div className="punch-summary-big">{getBreakStatus('LUNCH')}</div>
        </div>
        <div className="punch-break-line">
          <div className="punch-summary-small">Training:</div>
          <div className="punch-summary-big">{getBreakStatus('TRAINING')}</div>
        </div>
        <div className="punch-break-line">
          <div className="punch-summary-small">Technical:</div>
          <div className="punch-summary-big">{getBreakStatus('TECHNICAL')}</div>
        </div>
      </div>
    </div>
  )
}