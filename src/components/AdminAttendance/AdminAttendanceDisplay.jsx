const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
)

export default function AdminAttendanceDisplay({ selectedAgent, attendanceRecords, activeFilters }) {
  if (!selectedAgent) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p className="text-lg">Please search and select an employee to view their attendance records</p>
      </div>
    )
  }

  if (attendanceRecords.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p className="text-lg">No attendance records found for the selected date range</p>
      </div>
    )
  }

  const calculateDuration = (login, logout) => {
    if (!login || !logout) return '--:--'
    
    const loginTime = new Date(`2024-01-01 ${login}`)
    const logoutTime = new Date(`2024-01-01 ${logout}`)
    const diffMs = logoutTime - loginTime
    const hours = Math.floor(diffMs / (1000 * 60 * 60))
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    
    return `${hours}:${minutes.toString().padStart(2, '0')}`
  }

  const calculateBreakDuration = (outTime, inTime) => {
    if (!outTime || !inTime) return '--:--'
    
    const out = new Date(`2024-01-01 ${outTime}`)
    const inT = new Date(`2024-01-01 ${inTime}`)
    const diffMs = inT - out
    const minutes = Math.floor(diffMs / (1000 * 60))
    
    return `${Math.floor(minutes / 60)}:${(minutes % 60).toString().padStart(2, '0')}`
  }

  const isLate = (loginTime) => {
    if (!loginTime) return false
    const scheduled = new Date(`2024-01-01 09:00`)
    const actual = new Date(`2024-01-01 ${loginTime}`)
    return actual > scheduled
  }

  const getAdherenceColor = (adherence) => {
    if (adherence >= 95) return 'text-green-600 font-semibold'
    if (adherence >= 85) return 'text-yellow-600 font-semibold'
    return 'text-red-600 font-semibold'
  }

  const getLateStatus = (record) => {
    if (record.late) {
      const loginTime = new Date(`2024-01-01 ${record.login}`)
      const scheduled = new Date(`2024-01-01 09:00`)
      const diffMinutes = Math.floor((loginTime - scheduled) / (1000 * 60))
      
      if (diffMinutes > 15) return 'Very Late'
      return 'Late'
    }
    return 'On Time'
  }

  const getLateStatusColor = (record) => {
    const status = getLateStatus(record)
    if (status === 'Very Late') return 'text-red-700 font-semibold'
    if (status === 'Late') return 'text-yellow-700 font-semibold'
    return 'text-green-700 font-semibold'
  }

  return (
    <div>
      {/* Agent Information Header */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">Agent Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm">
          <div>
            <span className="text-blue-600 font-medium">Agent Name:</span>
            <p className="font-semibold text-gray-800">{selectedAgent.name}</p>
          </div>
          <div>
            <span className="text-blue-600 font-medium">Agent ID:</span>
            <p className="font-semibold text-gray-800">{selectedAgent.userId}</p>
          </div>
          <div>
            <span className="text-blue-600 font-medium">Agent Email:</span>
            <p className="font-semibold text-gray-800">{selectedAgent.email}</p>
          </div>
          <div>
            <span className="text-blue-600 font-medium">Agent Campaign:</span>
            <p className="font-semibold text-gray-800">{selectedAgent.campaign}</p>
          </div>
          <div>
            <span className="text-blue-600 font-medium">Agent Supervisor:</span>
            <p className="font-semibold text-gray-800">{selectedAgent.supervisor}</p>
          </div>
        </div>
      </div>

      {/* Attendance Records Table */}
      <div className="overflow-x-auto">
        <div className="min-w-full">
          <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
            {/* Header Row */}
            <div className="grid grid-cols-12 bg-gray-100 border-b border-gray-300 text-xs">
              <div className="px-3 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">Date</div>
              <div className="px-3 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">Log IN</div>
              <div className="px-3 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">Log OUT</div>
              <div className="px-3 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">Duration</div>
              <div className="px-3 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">Break 1</div>
              <div className="px-3 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">Break 2</div>
              <div className="px-3 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">Lunch</div>
              <div className="px-3 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">Training</div>
              <div className="px-3 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">Technical</div>
              <div className="px-3 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">Late</div>
              <div className="px-3 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">Adherence</div>
              <div className="px-3 py-3 text-left font-medium text-gray-700 uppercase tracking-wider">Edit</div>
            </div>

            {/* Data Rows */}
            {attendanceRecords.map((record, index) => (
              <div key={record.date} className={`grid grid-cols-12 text-sm ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b border-gray-200 hover:bg-blue-50 transition-colors`}>
                <div className="px-3 py-3 text-gray-900 border-r border-gray-200 font-medium">
                  {new Date(record.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    weekday: 'short'
                  })}
                </div>
                <div className="px-3 py-3 text-gray-900 border-r border-gray-200">
                  {record.login || '--:--'}
                </div>
                <div className="px-3 py-3 text-gray-900 border-r border-gray-200">
                  {record.logout || '--:--'}
                </div>
                <div className="px-3 py-3 text-gray-900 border-r border-gray-200 font-mono">
                  {calculateDuration(record.login, record.logout)}
                </div>
                <div className="px-3 py-3 text-gray-900 border-r border-gray-200 text-xs">
                  {record.break1Out && record.break1In ? (
                    <div>
                      <div>OUT: {record.break1Out}</div>
                      <div>IN: {record.break1In}</div>
                      <div className="font-mono">({calculateBreakDuration(record.break1Out, record.break1In)})</div>
                    </div>
                  ) : '--:--'}
                </div>
                <div className="px-3 py-3 text-gray-900 border-r border-gray-200 text-xs">
                  {record.break2Out && record.break2In ? (
                    <div>
                      <div>OUT: {record.break2Out}</div>
                      <div>IN: {record.break2In}</div>
                      <div className="font-mono">({calculateBreakDuration(record.break2Out, record.break2In)})</div>
                    </div>
                  ) : '--:--'}
                </div>
                <div className="px-3 py-3 text-gray-900 border-r border-gray-200 text-xs">
                  {record.lunchOut && record.lunchIn ? (
                    <div>
                      <div>OUT: {record.lunchOut}</div>
                      <div>IN: {record.lunchIn}</div>
                      <div className="font-mono">({calculateBreakDuration(record.lunchOut, record.lunchIn)})</div>
                    </div>
                  ) : '--:--'}
                </div>
                <div className="px-3 py-3 text-gray-900 border-r border-gray-200 text-xs">
                  {record.trainingOut && record.trainingIn ? (
                    <div>
                      <div>OUT: {record.trainingOut}</div>
                      <div>IN: {record.trainingIn}</div>
                      <div className="font-mono">({calculateBreakDuration(record.trainingOut, record.trainingIn)})</div>
                    </div>
                  ) : '--:--'}
                </div>
                <div className="px-3 py-3 text-gray-900 border-r border-gray-200 text-xs">
                  {record.technicalOut && record.technicalIn ? (
                    <div>
                      <div>OUT: {record.technicalOut}</div>
                      <div>IN: {record.technicalIn}</div>
                      <div className="font-mono">({calculateBreakDuration(record.technicalOut, record.technicalIn)})</div>
                    </div>
                  ) : '--:--'}
                </div>
                <div className={`px-3 py-3 border-r border-gray-200 ${getLateStatusColor(record)}`}>
                  {getLateStatus(record)}
                </div>
                <div className={`px-3 py-3 border-r border-gray-200 ${getAdherenceColor(record.adherence)}`}>
                  {record.adherence}%
                </div>
                <div className="px-3 py-3">
                  <button
                    className="p-1 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100 rounded transition-colors"
                    title="Edit Record"
                  >
                    <EditIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      {attendanceRecords.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-md font-semibold text-gray-800 mb-3">Summary Statistics</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{attendanceRecords.length}</div>
              <div className="text-gray-600">Total Days</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {attendanceRecords.filter(r => !r.late).length}
              </div>
              <div className="text-gray-600">On Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {attendanceRecords.filter(r => r.late).length}
              </div>
              <div className="text-gray-600">Late Days</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(attendanceRecords.reduce((sum, r) => sum + r.adherence, 0) / attendanceRecords.length)}%
              </div>
              <div className="text-gray-600">Avg Adherence</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}