export default function AttendanceStats({ stats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-6">
      <div className="bg-blue-100 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-blue-600">{stats.totalWorkDays}</div>
        <div className="text-sm text-blue-800">Work Days</div>
      </div>
      <div className="bg-green-100 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-green-600">{stats.attendedDays}</div>
        <div className="text-sm text-green-800">Attended</div>
      </div>
      <div className="bg-red-100 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-red-600">{stats.absentDays}</div>
        <div className="text-sm text-red-800">Absent</div>
      </div>
      <div className="bg-yellow-100 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-yellow-600">{stats.lateDays}</div>
        <div className="text-sm text-yellow-800">Late Days</div>
      </div>
      <div className="bg-purple-100 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-purple-600">{stats.attendanceRate}%</div>
        <div className="text-sm text-purple-800">Attendance</div>
      </div>
      <div className="bg-indigo-100 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-indigo-600">{stats.punctualityRate}%</div>
        <div className="text-sm text-indigo-800">Punctuality</div>
      </div>
      <div className="bg-teal-100 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-teal-600">{stats.totalWorkedHours}</div>
        <div className="text-sm text-teal-800">Hours Worked</div>
      </div>
      <div className="bg-orange-100 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-orange-600">{stats.hoursAdherence}%</div>
        <div className="text-sm text-orange-800">Hours Adherence</div>
      </div>
    </div>
  )
}