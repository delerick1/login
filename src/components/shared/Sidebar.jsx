import { useState } from 'react'

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
)

export default function Sidebar({ activeLink, setActiveLink, minimized, setMinimized }) {
  const links = [
    { id: 'punch-in', name: 'Punch In', icon: ClockIcon },
    { id: 'schedule-tracker', name: 'Schedule Tracker', icon: CalendarIcon },
    { id: 'attendance', name: 'Attendance', icon: UsersIcon }
  ]

  return (
    <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white shadow-lg transition-all duration-300 z-40 ${
      minimized ? 'w-16' : 'w-64'
    }`}>
      <div className="p-4">
        <button
          onClick={() => setMinimized(!minimized)}
          className="w-full flex items-center justify-center p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
        >
          <MenuIcon />
        </button>
      </div>

      <nav className="px-4 space-y-2">
        {links.map((link) => {
          const IconComponent = link.icon
          const isActive = activeLink === link.id
          
          return (
            <button
              key={link.id}
              onClick={() => setActiveLink(link.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                isActive 
                  ? 'bg-indigo-100 text-indigo-700' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
              title={minimized ? link.name : ''}
            >
              <IconComponent />
              {!minimized && (
                <span className="font-medium">{link.name}</span>
              )}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}