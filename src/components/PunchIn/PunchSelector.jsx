export default function PunchSelector({ selectedPunchType, setSelectedPunchType, punchTypes, handlePunch }) {
    return (
      <div className="punch-controls-section">
        <div className="punch-controls-label">Select Punch Type:</div>
        <div className="punch-controls">
          <select
            value={selectedPunchType}
            onChange={(e) => setSelectedPunchType(e.target.value)}
            className="punch-select"
          >
            {punchTypes.map(type => (
              <option key={type} value={type}>
                {type === 'IN' ? 'IN (Work)' : 
                 type === 'OUT' ? 'OUT (Work)' :
                 type === 'BREAK 1' ? 'Break 1' :
                 type === 'BREAK 2' ? 'Break 2' :
                 type === 'LUNCH' ? 'Lunch' :
                 type === 'TRAINING' ? 'Training' :
                 type === 'TECHNICAL' ? 'Technical' : type}
              </option>
            ))}
          </select>
          <button
            onClick={handlePunch}
            className="punch-btn-primary"
          >
            Punch {selectedPunchType}
          </button>
        </div>
      </div>
    )
}