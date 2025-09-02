
export default function TimeClock({ formatTime, currentTime, formatDate }) {
  return (
    <div className="punch-header">
      <div className="punch-clock">
        <div className="time">
          {formatTime(currentTime)}
        </div>
        <div className="date">
          {formatDate(currentTime)}
        </div>
      </div>
    </div>
  )
}