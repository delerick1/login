import { useState } from 'react'

const XIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const DownloadIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)

const UploadIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
)

export default function BulkActionsModal({ selectedCount, campaigns, onAction, onClose }) {
  const [actionType, setActionType] = useState('export')
  const [campaignName, setCampaignName] = useState('')
  const [deactivateEndDate, setDeactivateEndDate] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    switch (actionType) {
      case 'export':
        onAction('export')
        break
      case 'import':
        // Handle file import
        document.getElementById('importFile').click()
        break
      case 'deactivate':
        if (!deactivateEndDate) {
          alert('Please select an end date for deactivation')
          return
        }
        onAction('deactivate', { endDate: deactivateEndDate })
        break
      case 'activate':
        onAction('activate')
        break
      case 'changeCampaign':
        if (!campaignName) {
          alert('Please select a campaign')
          return
        }
        onAction('changeCampaign', { campaign: campaignName })
        break
    }
  }

  const handleFileImport = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Handle Excel file import
      console.log('Importing file:', file.name)
      onAction('import', { file })
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Bulk Actions ({selectedCount} users)
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Action
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="export"
                    checked={actionType === 'export'}
                    onChange={(e) => setActionType(e.target.value)}
                    className="mr-2"
                  />
                  <DownloadIcon />
                  <span className="ml-2 text-sm">Export to Excel (.xlsx)</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="import"
                    checked={actionType === 'import'}
                    onChange={(e) => setActionType(e.target.value)}
                    className="mr-2"
                  />
                  <UploadIcon />
                  <span className="ml-2 text-sm">Import from Excel (.xlsx)</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="radio"
                    value="activate"
                    checked={actionType === 'activate'}
                    onChange={(e) => setActionType(e.target.value)}
                    className="mr-2"
                  />
                  <span className="ml-2 text-sm text-green-600">Activate Users</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="radio"
                    value="deactivate"
                    checked={actionType === 'deactivate'}
                    onChange={(e) => setActionType(e.target.value)}
                    className="mr-2"
                  />
                  <span className="ml-2 text-sm text-red-600">Deactivate Users</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="radio"
                    value="changeCampaign"
                    checked={actionType === 'changeCampaign'}
                    onChange={(e) => setActionType(e.target.value)}
                    className="mr-2"
                  />
                  <span className="ml-2 text-sm text-blue-600">Change Campaign</span>
                </label>
              </div>
            </div>

            {/* Conditional Fields */}
            {actionType === 'deactivate' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deactivation End Date
                </label>
                <input
                  type="date"
                  value={deactivateEndDate}
                  onChange={(e) => setDeactivateEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>
            )}

            {actionType === 'changeCampaign' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Campaign
                </label>
                <select
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Campaign</option>
                  {campaigns.map(campaign => (
                    <option key={campaign} value={campaign}>{campaign}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Hidden file input for import */}
          <input
            type="file"
            id="importFile"
            accept=".xlsx,.xls"
            onChange={handleFileImport}
            className="hidden"
          />

          <div className="flex items-center justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 font-medium rounded-md transition-colors ${
                actionType === 'export' ? 'bg-green-600 hover:bg-green-700 text-white' :
                actionType === 'import' ? 'bg-blue-600 hover:bg-blue-700 text-white' :
                actionType === 'activate' ? 'bg-green-600 hover:bg-green-700 text-white' :
                actionType === 'deactivate' ? 'bg-red-600 hover:bg-red-700 text-white' :
                'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {actionType === 'export' ? 'Export to Excel' :
               actionType === 'import' ? 'Import from Excel' :
               actionType === 'activate' ? 'Activate Users' :
               actionType === 'deactivate' ? 'Deactivate Users' :
               'Change Campaign'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}