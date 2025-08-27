import { useState, useEffect } from 'react'
import TimeClock from '../components/PunchIn/TimeClock'
import PunchSelector from '../components/PunchIn/PunchSelector'
import RecentPunches from '../components/PunchIn/RecentPunches'
import PunchSummary from '../components/PunchIn/PunchSummary'

export default function PunchIn() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedPunchType, setSelectedPunchType] = useState('IN')
  const [punchHistory, setPunchHistory] = useState([])
  const [adminHourLimit] = useState(8) // This will be configurable by admin later

  const punchTypes = [
    'IN',
    'OUT',
    'BREAK 1',
    'BREAK 2', 
    'LUNCH',
    'TRAINING',
    'TECHNICAL'
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handlePunch = () => {
    const now = new Date()
    const newPunch = {
      type: selectedPunchType,
      time: now,
      id: Date.now()
    }
    
    setPunchHistory(prev => [...prev, newPunch])
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Calculate summary data
  const getFirstPunchIn = () => {
    const inPunch = punchHistory.find(punch => punch.type === 'IN')
    return inPunch ? formatTime(inPunch.time) : '--:--'
  }

  const getLastPunchOut = () => {
    const outPunches = punchHistory.filter(punch => punch.type === 'OUT')
    const lastOut = outPunches[outPunches.length - 1]
    return lastOut ? formatTime(lastOut.time) : '--:--'
  }

  const getTotalHours = () => {
    const inPunches = punchHistory.filter(punch => punch.type === 'IN')
    const outPunches = punchHistory.filter(punch => punch.type === 'OUT')
    
    if (inPunches.length === 0) return '0:00'
    
    let totalMinutes = 0
    const firstIn = inPunches[0]
    const lastOut = outPunches[outPunches.length - 1]
    
    if (firstIn && lastOut) {
      totalMinutes = Math.floor((lastOut.time - firstIn.time) / (1000 * 60))
    } else if (firstIn) {
      totalMinutes = Math.floor((currentTime - firstIn.time) / (1000 * 60))
    }
    
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    return `${hours}:${minutes.toString().padStart(2, '0')}`
  }

  const getBreakTime = (breakType) => {
    const breakPunches = punchHistory.filter(punch => punch.type === breakType)
    if (breakPunches.length < 2) return '--:--'
    
    // Get pairs of break punches (OUT then IN)
    let totalBreakMinutes = 0
    for (let i = 0; i < breakPunches.length - 1; i += 2) {
      if (breakPunches[i + 1]) {
        const breakOut = breakPunches[i]
        const breakIn = breakPunches[i + 1]
        totalBreakMinutes += Math.floor((breakIn.time - breakOut.time) / (1000 * 60))
      }
    }
    
    const hours = Math.floor(totalBreakMinutes / 60)
    const minutes = totalBreakMinutes % 60
    return `${hours}:${minutes.toString().padStart(2, '0')}`
  }

  const getBreakStatus = (breakType) => {
    const breakPunches = punchHistory.filter(punch => punch.type === breakType)
    const count = breakPunches.length
    
    if (count === 0) return '--:--'
    if (count === 1) return `${formatTime(breakPunches[0].time)} (OUT)`
    
    return `OUT: ${formatTime(breakPunches[0].time)}, IN: ${formatTime(breakPunches[1].time)}`
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
       
        <TimeClock formatTime={formatTime}
         formatDate={formatDate} 
         currentTime={currentTime} />

        <PunchSelector 
          selectedPunchType={selectedPunchType} 
          punchTypes={punchTypes}
          handlePunch={handlePunch}
          setSelectedPunchType={setSelectedPunchType}
        />

        <RecentPunches punchHistory={punchHistory} formatTime={formatTime} />

        <PunchSummary
          punchHistory={punchHistory}
          currentTime={currentTime}
          adminHourLimit={adminHourLimit}
          formatTime={formatTime}
          getFirstPunchIn={getFirstPunchIn}
          getLastPunchOut={getLastPunchOut}
          getTotalHours={getTotalHours}
          getBreakStatus={getBreakStatus}
        />
      </div>
    </div>
  )
}
