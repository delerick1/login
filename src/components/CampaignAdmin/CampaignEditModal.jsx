import { useState, useEffect } from 'react'

const XIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

export default function CampaignEditModal({ campaign, onSave, onClose }) {
  const [formData, setFormData] = useState({
    totalAgents: 0,
    totalStaff: 0,
    agentHours: 8,
    daysOff: [],
    workMode: 'Office'
  })

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const workModes = ['Office', 'Home Office', 'Hybrid']

  useEffect(() => {
    if (campaign) {
      setFormData({
        totalAgents: campaign.totalAgents,
        totalStaff: campaign.totalStaff,
        agentHours: campaign.agentHours,
        daysOff: campaign.daysOff,
        workMode: campaign.workMode
      })
    }
  }, [campaign])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleDayToggle = (day) => {
    setFormData(prev => ({
      ...prev,
      daysOff: prev.daysOff.includes(day)
        ? prev.daysOff.filter(d => d !== day)
        : [...prev.daysOff, day]
    }))
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Edit Campaign: {campaign?.name}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Total Agents */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Agents
              </label>
              <input
                type="number"
                value={formData.totalAgents}
                onChange={(e) => handleChange('totalAgents', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Number of Agents"
                min="0"
              />
            </div>

            {/* Total Staff */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Staff
              </label>
              <input
                type="number"
                value={formData.totalStaff}
                onChange={(e) => handleChange('totalStaff', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Number staff"
                min="0"
              />
            </div>

            {/* Agent Hours */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Agents Hours
              </label>
              <input
                type="number"
                value={formData.agentHours}
                onChange={(e) => handleChange('agentHours', parseInt(e.target.value) || 8)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Number hours per day"
                min="1"
                max="24"
              />
            </div>

            {/* Work Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Office, Home Office, Hybrid
              </label>
              <select
                value={formData.workMode}
                onChange={(e) => handleChange('workMode', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {workModes.map(mode => (
                  <option key={mode} value={mode}>{mode}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Days Off */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Days Off
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {daysOfWeek.map(day => (
                <label key={day} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.daysOff.includes(day)}
                    onChange={() => handleDayToggle(day)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{day}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Update Campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}