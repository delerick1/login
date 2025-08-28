import { useState } from 'react'

const XIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const MailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

export default function PasswordModal({ user, onSave, onClose }) {
  const [method, setMethod] = useState('admin') // 'admin' or 'email'
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [emailSent, setEmailSent] = useState(false)

  const validatePassword = (pwd) => {
    const hasUpperCase = /[A-Z]/.test(pwd)
    const hasNumber = /\d/.test(pwd)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pwd)
    const isLongEnough = pwd.length >= 8

    return {
      hasUpperCase,
      hasNumber,
      hasSpecialChar,
      isLongEnough,
      isValid: hasUpperCase && hasNumber && hasSpecialChar && isLongEnough
    }
  }

  const validation = validatePassword(password)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (method === 'admin') {
      if (!validation.isValid) {
        alert('Password does not meet requirements')
        return
      }

      if (password !== confirmPassword) {
        alert('Passwords do not match')
        return
      }

      onSave({ method: 'admin', password })
    } else {
      // Send email link
      setEmailSent(true)
      setTimeout(() => {
        onSave({ method: 'email', email: user.email })
      }, 2000)
    }
  }

  const handleSendEmail = () => {
    setEmailSent(true)
    // Simulate email sending
    setTimeout(() => {
      alert(`Password reset link sent to ${user.email}`)
      onClose()
    }, 2000)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Change Password - {user.firstName} {user.lastName}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XIcon />
          </button>
        </div>

        <div className="p-6">
          {/* Method Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Password Change Method
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="admin"
                  checked={method === 'admin'}
                  onChange={(e) => setMethod(e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm">Set password directly (Admin)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="email"
                  checked={method === 'email'}
                  onChange={(e) => setMethod(e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm">Send reset link to user email</span>
              </label>
            </div>
          </div>

          {method === 'admin' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Password Requirements */}
              <div className="text-xs space-y-1">
                <div className={`flex items-center ${validation.isLongEnough ? 'text-green-600' : 'text-red-600'}`}>
                  <span className="mr-2">{validation.isLongEnough ? '✓' : '✗'}</span>
                  Minimum 8 characters
                </div>
                <div className={`flex items-center ${validation.hasUpperCase ? 'text-green-600' : 'text-red-600'}`}>
                  <span className="mr-2">{validation.hasUpperCase ? '✓' : '✗'}</span>
                  At least 1 uppercase letter
                </div>
                <div className={`flex items-center ${validation.hasNumber ? 'text-green-600' : 'text-red-600'}`}>
                  <span className="mr-2">{validation.hasNumber ? '✓' : '✗'}</span>
                  At least 1 number
                </div>
                <div className={`flex items-center ${validation.hasSpecialChar ? 'text-green-600' : 'text-red-600'}`}>
                  <span className="mr-2">{validation.hasSpecialChar ? '✓' : '✗'}</span>
                  At least 1 special character
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!validation.isValid || password !== confirmPassword}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-medium rounded-md transition-colors"
                >
                  Change Password
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 text-blue-800">
                  <MailIcon />
                  <span className="font-medium">Email Reset Link</span>
                </div>
                <p className="text-sm text-blue-700 mt-2">
                  A password reset link will be sent to: <strong>{user.email}</strong>
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  The user will receive a secure link to reset their password with User ID verification.
                </p>
              </div>

              {emailSent ? (
                <div className="text-center py-4">
                  <div className="text-green-600 font-medium mb-2">Email Sent Successfully!</div>
                  <div className="text-sm text-gray-600">
                    The user will receive the reset link shortly.
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendEmail}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
                  >
                    Send Reset Link
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}