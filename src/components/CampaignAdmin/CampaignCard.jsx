const EditIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
)

export default function CampaignCard({ campaign, onEdit, onStatusChange }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'not_active':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'in_revision':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active':
        return 'Active'
      case 'not_active':
        return 'Not Active'
      case 'in_revision':
        return 'In Revision'
      default:
        return status
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <h4 className="text-lg font-semibold text-gray-800">{campaign.name}</h4>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(campaign)}
            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors"
            title="Edit Campaign"
          >
            <EditIcon />
          </button>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-gray-600">Campaign Type:</span>
            <p className="font-medium text-gray-800">{campaign.type}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600">Work Mode:</span>
            <p className="font-medium text-gray-800">{campaign.workMode}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <span className="text-sm text-gray-600">Total Agents:</span>
            <p className="font-medium text-gray-800">{campaign.totalAgents}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600">Total Staff:</span>
            <p className="font-medium text-gray-800">{campaign.totalStaff}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600">Agent Hours:</span>
            <p className="font-medium text-gray-800">{campaign.agentHours}h/day</p>
          </div>
        </div>

        <div>
          <span className="text-sm text-gray-600">Days Off:</span>
          <p className="font-medium text-gray-800">
            {campaign.daysOff.length > 0 ? campaign.daysOff.join(', ') : 'None'}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div>
          <span className="text-sm text-gray-600">Status:</span>
          <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(campaign.status)}`}>
            {getStatusLabel(campaign.status)}
          </span>
        </div>
        
        <select
          value={campaign.status}
          onChange={(e) => onStatusChange(campaign.id, e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        >
          <option value="not_active">Not Active</option>
          <option value="active">Active</option>
          <option value="in_revision">In Revision</option>
        </select>
      </div>
    </div>
  )
}