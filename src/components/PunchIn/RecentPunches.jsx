export default function RecentPunches({ punchHistory, formatTime }) {
  if (punchHistory.length === 0) return null

  const formatTimeShort = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const getHumanType = (type) => {
    switch(type) {
      case 'IN': return 'IN'
      case 'OUT': return 'OUT'
      case 'BREAK 1': return 'Break 1'
      case 'BREAK 2': return 'Break 2'
      case 'LUNCH': return 'Lunch'
      case 'TRAINING': return 'Training'
      case 'TECHNICAL': return 'Technical'
      default: return type
    }
  }

  return (
    <div className="punch-sheet">
      <div className="punch-sheet-header">
        <div className="punch-sheet-title">Punch Log</div>
        <div className="punch-note">Recent punch activities</div>
      </div>
      
      <table className="punch-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {punchHistory.length === 0 ? (
            <tr>
              <td className="muted" colSpan="3">No punches yet</td>
            </tr>
          ) : (
            punchHistory.slice(-8).reverse().map(punch => (
              <tr key={punch.id}>
                <td>{getHumanType(punch.type)}</td>
                <td>{formatTimeShort(punch.time)}</td>
                <td className="muted">Completed</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      </div>
  )
}