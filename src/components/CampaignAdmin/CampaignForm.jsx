import { useState } from 'react'

export default function CampaignForm({ onSubmit, editingCampaign, onCancel }) {
  const [formData, setFormData] = useState({
    name: editingCampaign?.name || '',
    type: editingCampaign?.type || '',
    totalAgents: editingCampaign?.totalAgents || 0,
    totalStaff: editingCampaign?.totalStaff || 0,
    agentHours: editingCampaign?.agentHours || 8,
    daysOff: editingCampaign?.daysOff || [],
    workMode: editingCampaign?.workMode || 'Office'
  })

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const workModes = ['Office', 'Home Office', 'Hybrid']

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.type) {
      alert('Please fill in campaign name and type')
      return
    }
    onSubmit(formData)
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
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        {editingCampaign ? 'Edit Campaign' : 'Add Campaign Name'}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Campaign Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name of Campaign Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter campaign name"
              required
            />
          </div>

          {/* Campaign Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type Campaign
            </label>
            <input
              type="text"
              value={formData.type}
              onChange={(e) => handleChange('type', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter campaign type"
              required
            />
          </div>

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
        <div>
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

        {/* Submit Button */}
        <div className="flex items-center justify-end space-x-3 pt-4">
          {editingCampaign && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            {editingCampaign ? 'Update Campaign' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}