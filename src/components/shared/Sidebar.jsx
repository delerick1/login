import { useState } from 'react'
import {
  FiClock,
  FiCalendar,
  FiUsers,
  FiClipboard,
  FiUserCheck,
  FiBriefcase,
  FiChevronLeft,
  FiChevronRight,
  FiUser,
  FiLogOut
} from 'react-icons/fi'
import './Sidebar.css'

export default function Sidebar({ activeLink, setActiveLink, minimized, setMinimized, user, onLogout }) {
  const links = [
    { id: 'punch-in', name: 'Punch In', icon: FiClock },
    { id: 'schedule-tracker', name: 'Schedule Tracker', icon: FiCalendar },
    { id: 'attendance', name: 'Attendance', icon: FiUsers },
    { id: 'admin-attendance', name: 'Admin Attendance', icon: FiClipboard },
    { id: 'user-admin', name: 'User Admin', icon: FiUserCheck },
    { id: 'campaign-admin', name: 'Campaign Admin', icon: FiBriefcase }
  ]

  return (
    <div className={`sidebar ${minimized ? 'collapsed' : 'open'}`}>
      <div className="top-section">
        <div className="logo">{minimized ? 'EP' : 'Employee Portal'}</div>
        <button className="toggle-btn" onClick={() => setMinimized(!minimized)}>
          {minimized ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
      </div>

      <ul className="menu">
        {links.map((link) => {
          const IconComponent = link.icon
          const isActive = activeLink === link.id
          
          return (
            <li
              key={link.id}
              onClick={() => setActiveLink(link.id)}
              className={isActive ? 'active' : ''}
              title={minimized ? link.name : ''}
            >
              <IconComponent />
              {!minimized && <span>{link.name}</span>}
            </li>
          )
        })}
      </ul>

      <div className="bottom-section">
        <li title={minimized ? 'Profile' : ''}>
          <FiUser />
          {!minimized && <span>Profile</span>}
        </li>
        <li onClick={onLogout} title={minimized ? 'Logout' : ''}>
          <FiLogOut />
          {!minimized && <span>Logout</span>}
        </li>
      </div>
    </div>
  )
}