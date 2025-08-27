
export default function TimeClock({formatTime,currentTime,formatDate}) {
  return (
    <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Time Clock
        </h2>

        {/* Current Time Display */}
        <div className="text-center mb-8">
          <div className="text-4xl font-mono font-bold text-gray-800 mb-2">
            {formatTime(currentTime)}
          </div>
          <div className="text-lg text-gray-600">
            {formatDate(currentTime)}
          </div>
        </div>
    </div>
  )
}

