import { useState } from 'react'

export default function Header({ user, onLogout }) {
  const [logoUrl, setLogoUrl] = useState('https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop')

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 h-16">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center space-x-4">
          <img 
            src={logoUrl} 
            alt="Company Logo" 
            className="w-10 h-10 rounded-lg object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/40x40/4F46E5/white?text=Logo'
            }}
          />
          <h1 className="text-xl font-semibold text-gray-800">
            Employee Portal
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <span className="text-gray-700 font-medium">{user?.name}</span>
          </div>
          
          <button
            onClick={onLogout}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}