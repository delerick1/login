export default function AttendanceTable({ 
  daysInMonth, 
  sampleAttendanceData, 
  scheduleData, 
  highlightsEnabled,
  calculateTimeDifference,
  formatTime,
  isLate,
  isBreakLate,
  calculateAdherence,
  getAdherenceColor
}) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-full">
        <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
          {/* Header Row */}
          <div className="grid grid-cols-16 bg-gray-100 border-b border-gray-300 text-xs">
            <div className="px-2 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">Day</div>
            <div className="px-2 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">Month Day#</div>
            <div className="px-2 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">LOGIN</div>
            <div className="px-2 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">LOG OUT</div>
            <div className="px-2 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">TIME</div>
            <div className="px-2 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">BREAK1 OUT</div>
            <div className="px-2 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">BREAK1 IN</div>
            <div className="px-2 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">TIME</div>
            <div className="px-2 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">BREAK2 OUT</div>
            <div className="px-2 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">BREAK2 IN</div>
            <div className="px-2 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">TIME</div>
            <div className="px-2 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">LUNCH OUT</div>
            <div className="px-2 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">LUNCH IN</div>
            <div className="px-2 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">TIME</div>
            <div className="px-2 py-3 text-left font-medium text-gray-700 uppercase tracking-wider">ADHERENCE</div>
          </div>

          {/* Data Rows */}
          {daysInMonth.map((dayInfo, index) => {
            const dayData = sampleAttendanceData[dayInfo.monthDay]
            const schedule = scheduleData[dayInfo.day]
            const isOff = schedule?.loginTime === 'OFF'
            const adherence = calculateAdherence(dayData, dayInfo.day)

            // Calculate times
            const totalTime = dayData?.login && dayData?.logout 
              ? formatTime(calculateTimeDifference(dayData.login, dayData.logout))
              : (isOff ? 'OFF' : 'NO SHOW')

            const break1Time = dayData?.break1Out && dayData?.break1In
              ? formatTime(calculateTimeDifference(dayData.break1Out, dayData.break1In))
              : (isOff ? 'OFF' : '-')

            const break2Time = dayData?.break2Out && dayData?.break2In
              ? formatTime(calculateTimeDifference(dayData.break2Out, dayData.break2In))
              : (isOff ? 'OFF' : '-')

            const lunchTime = dayData?.lunchOut && dayData?.lunchIn
              ? formatTime(calculateTimeDifference(dayData.lunchOut, dayData.lunchIn))
              : (isOff ? 'OFF' : '-')

            // Determine highlighting classes
            const getHighlightClass = (condition, colorClass) => {
              return highlightsEnabled && condition ? colorClass : ''
            }

            const loginHighlight = getHighlightClass(
              dayData?.login && isLate(dayData.login, schedule?.loginTime),
              'bg-red-100'
            )

            const break1Highlight = getHighlightClass(
              dayData?.break1Out && dayData?.break1In && isBreakLate(dayData.break1Out, dayData.break1In, schedule?.break1),
              'bg-yellow-100'
            )

            const break2Highlight = getHighlightClass(
              dayData?.break2Out && dayData?.break2In && isBreakLate(dayData.break2Out, dayData.break2In, schedule?.break2),
              'bg-yellow-100'
            )

            const lunchHighlight = getHighlightClass(
              dayData?.lunchOut && dayData?.lunchIn && isBreakLate(dayData.lunchOut, dayData.lunchIn, schedule?.lunch),
              'bg-yellow-100'
            )

            const adherenceHighlight = getHighlightClass(
              adherence !== 'OFF' && adherence !== 'NO SHOW' && parseInt(adherence) >= 95,
              'bg-green-100'
            )

            return (
              <div key={dayInfo.monthDay} className={`grid grid-cols-16 text-xs ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b border-gray-200 hover:bg-blue-50 transition-colors`}>
                <div className="px-2 py-3 font-medium text-gray-900 border-r border-gray-200">{dayInfo.day}</div>
                <div className="px-2 py-3 text-gray-900 border-r border-gray-200">{dayInfo.monthDay}</div>
                <div className={`px-2 py-3 text-gray-900 border-r border-gray-200 ${loginHighlight}`}>
                  {dayData?.login || (isOff ? 'OFF' : 'NO SHOW')}
                </div>
                <div className="px-2 py-3 text-gray-900 border-r border-gray-200">
                  {dayData?.logout || (isOff ? 'OFF' : 'NO SHOW')}
                </div>
                <div className="px-2 py-3 text-gray-900 border-r border-gray-200">{totalTime}</div>
                <div className={`px-2 py-3 text-gray-900 border-r border-gray-200 ${break1Highlight}`}>
                  {dayData?.break1Out || (isOff ? 'OFF' : '-')}
                </div>
                <div className={`px-2 py-3 text-gray-900 border-r border-gray-200 ${break1Highlight}`}>
                  {dayData?.break1In || (isOff ? 'OFF' : '-')}
                </div>
                <div className={`px-2 py-3 text-gray-900 border-r border-gray-200 ${break1Highlight}`}>{break1Time}</div>
                <div className={`px-2 py-3 text-gray-900 border-r border-gray-200 ${break2Highlight}`}>
                  {dayData?.break2Out || (isOff ? 'OFF' : '-')}
                </div>
                <div className={`px-2 py-3 text-gray-900 border-r border-gray-200 ${break2Highlight}`}>
                  {dayData?.break2In || (isOff ? 'OFF' : '-')}
                </div>
                <div className={`px-2 py-3 text-gray-900 border-r border-gray-200 ${break2Highlight}`}>{break2Time}</div>
                <div className={`px-2 py-3 text-gray-900 border-r border-gray-200 ${lunchHighlight}`}>
                  {dayData?.lunchOut || (isOff ? 'OFF' : '-')}
                </div>
                <div className={`px-2 py-3 text-gray-900 border-r border-gray-200 ${lunchHighlight}`}>
                  {dayData?.lunchIn || (isOff ? 'OFF' : '-')}
                </div>
                <div className={`px-2 py-3 text-gray-900 border-r border-gray-200 ${lunchHighlight}`}>{lunchTime}</div>
                <div className={`px-2 py-3 border-r border-gray-200 ${adherenceHighlight} ${getAdherenceColor(adherence)}`}>
                  {adherence}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}