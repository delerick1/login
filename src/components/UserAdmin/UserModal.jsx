import { useState, useEffect } from 'react'

const XIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

export default function UserModal({ user, campaigns, supervisors, roles, onSave, onClose }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userId: '',
    email: '',
    loginName: '',
    campaignName: '',
    hireDate: '',
    role: 'Agent',
    status: 'active',
    deactivateEndDate: '',
    supervisor: ''
  })

  const [emailDomain, setEmailDomain] = useState('@company.com')

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        userId: user.userId,
        email: user.email,
        loginName: user.loginName,
        campaignName: user.campaignName,
        hireDate: user.hireDate,
        role: user.role,
        status: user.status,
        deactivateEndDate: user.deactivateEndDate || '',
        supervisor: user.supervisor
      })
    } else {
      // Reset form for new user
      setFormData({
        firstName: '',
        lastName: '',
        userId: '',
        email: '',
        loginName: '',
        campaignName: campaigns[0] || '',
        hireDate: new Date().toISOString().split('T')[0],
        role: 'Agent',
        status: 'active',
        deactivateEndDate: '',
        supervisor: supervisors[0] || ''
      })
    }
  }, [user, campaigns, supervisors])

  // Auto-generate login name when first name or last name changes
  useEffect(() => {
    if (formData.firstName && formData.lastName && !user) {
      const firstLetter = formData.firstName.charAt(0).toLowerCase()
      const lastNamePart = formData.lastName.split(' ')[0].toLowerCase()
      setFormData(prev => ({
        ...prev,
        loginName: firstLetter + lastNamePart
      }))
    }
  }, [formData.firstName, formData.lastName, user])

  // Auto-generate email when login name changes
  useEffect(() => {
    if (formData.loginName && !user) {
      setFormData(prev => ({
        ...prev,
        email: formData.loginName + emailDomain
      }))
    }
  }, [formData.loginName, emailDomain, user])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.userId || !formData.email) {
      alert('Please fill in all required fields')
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address')
      return
    }

    onSave(formData)
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {user ? 'Edit User' : 'Add New User'}
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
            {/* Personal Information */}
            <div className="space-y-4">
              <h4 className="text-md font-medium text-gray-800 border-b pb-2">Personal Information</h4>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="First Name Second Name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Father Surname Mother Surname"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  User ID *
                </label>
                <input
                  type="text"
                  value={formData.userId}
                  onChange={(e) => handleChange('userId', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="EMP001"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hire Date *
                </label>
                <input
                  type="date"
                  value={formData.hireDate}
                  onChange={(e) => handleChange('hireDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Account Information */}
            <div className="space-y-4">
              <h4 className="text-md font-medium text-gray-800 border-b pb-2">Account Information</h4>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <div className="flex">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                  <select
                    value={emailDomain}
                    onChange={(e) => setEmailDomain(e.target.value)}
                    className="px-3 py-2 border-l-0 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50"
                  >
                    <option value="@company.com">@company.com</option>
                    <option value="@support.company.com">@support.company.com</option>
                    <option value="@sales.company.com">@sales.company.com</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Login Name *
                </label>
                <input
                  type="text"
                  value={formData.loginName}
                  onChange={(e) => handleChange('loginName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Auto-generated from name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Campaign *
                </label>
                <select
                  value={formData.campaignName}
                  onChange={(e) => handleChange('campaignName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                >
                  {campaigns.map(campaign => (
                    <option key={campaign} value={campaign}>{campaign}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role *
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => handleChange('role', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                >
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Status and Management */}
            <div className="space-y-4">
              <h4 className="text-md font-medium text-gray-800 border-b pb-2">Status & Management</h4>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Supervisor *
                </label>
                <select
                  value={formData.supervisor}
                  onChange={(e) => handleChange('supervisor', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                >
                  {supervisors.map(supervisor => (
                    <option key={supervisor} value={supervisor}>{supervisor}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status *
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                >
                  <option value="active">Active</option>
                  <option value="deactivated">Deactivated</option>
                </select>
              </div>

              {formData.status === 'deactivated' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Deactivate End Date
                  </label>
                  <input
                    type="date"
                    value={formData.deactivateEndDate}
                    onChange={(e) => handleChange('deactivateEndDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>

            {/* Password Information */}
            <div className="space-y-4">
              <h4 className="text-md font-medium text-gray-800 border-b pb-2">Password Requirements</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>• Minimum 8 characters</p>
                <p>• At least 1 uppercase letter</p>
                <p>• At least 1 number</p>
                <p>• At least 1 special character</p>
                <p className="text-blue-600 font-medium mt-2">
                  {user ? 'Use "Change Password" button to update password' : 'Default password will be sent to user email'}
                </p>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors"
            >
              {user ? 'Update User' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}