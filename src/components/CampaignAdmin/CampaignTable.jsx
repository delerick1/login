const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
)

const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
)

export default function CampaignTable({ campaigns, onEditCampaign, onDeleteCampaign }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-full">
        <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
          {/* Header Row */}
          <div className="grid grid-cols-10 bg-gray-100 border-b border-gray-300 text-xs">
            <div className="px-3 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">Name</div>
            <div className="px-3 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">Description</div>
            <div className="px-3 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">Start Date</div>
            <div className="px-3 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">End Date</div>
            <div className="px-3 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">Status</div>
            <div className="px-3 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">Team Size</div>
            <div className="px-3 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">Supervisor</div>
            <div className="px-3 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">Department</div>
            <div className="px-3 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">Budget</div>
            <div className="px-3 py-3 text-left font-medium text-gray-700 uppercase tracking-wider">Actions</div>
          </div>

          {/* Data Rows */}
          {campaigns.map((campaign, index) => (
            <div key={campaign.id} className={`grid grid-cols-10 text-sm ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b border-gray-200 hover:bg-blue-50 transition-colors`}>
              <div className="px-3 py-3 text-gray-900 border-r border-gray-200 font-medium">{campaign.name}</div>
              <div className="px-3 py-3 text-gray-900 border-r border-gray-200">
                <div className="max-w-32 truncate" title={campaign.description}>
                  {campaign.description}
                </div>
              </div>
              <div className="px-3 py-3 text-gray-900 border-r border-gray-200">{campaign.startDate}</div>
              <div className="px-3 py-3 text-gray-900 border-r border-gray-200">{campaign.endDate}</div>
              <div className="px-3 py-3 border-r border-gray-200">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                  campaign.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {campaign.status}
                </span>
              </div>
              <div className="px-3 py-3 text-gray-900 border-r border-gray-200 text-center">{campaign.teamSize}</div>
              <div className="px-3 py-3 text-gray-900 border-r border-gray-200">{campaign.supervisor}</div>
              <div className="px-3 py-3 text-gray-900 border-r border-gray-200">{campaign.department}</div>
              <div className="px-3 py-3 text-gray-900 border-r border-gray-200 font-mono">
                {formatCurrency(campaign.budget)}
              </div>
              <div className="px-3 py-3">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onEditCampaign(campaign)}
                    className="p-1 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100 rounded transition-colors"
                    title="Edit Campaign"
                  >
                    <EditIcon />
                  </button>
                  <button
                    onClick={() => onDeleteCampaign(campaign.id)}
                    className="p-1 text-red-600 hover:text-red-800 hover:bg-red-100 rounded transition-colors"
                    title="Delete Campaign"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}