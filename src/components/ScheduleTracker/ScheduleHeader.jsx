export default function ScheduleHeader({ userData }) {
  return (
    <div className="bg-blue-50 rounded-lg p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <span className="text-blue-600 font-medium">Full Name:</span>
          <p className="text-gray-800 font-semibold">{userData.fullName}</p>
        </div>
        <div>
          <span className="text-blue-600 font-medium">ID Number:</span>
          <p className="text-gray-800 font-semibold">{userData.idNumber}</p>
        </div>
        <div>
          <span className="text-blue-600 font-medium">Campaign Name:</span>
          <p className="text-gray-800 font-semibold">{userData.campaignName}</p>
        </div>
      </div>
    </div>
  )
}