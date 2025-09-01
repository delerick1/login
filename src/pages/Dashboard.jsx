import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/authSlice'
import PunchIn from './PunchIn'
import ScheduleTracker from './ScheduleTracker'
import Attendance from './Attendance'
import AdminAttendance from './AdminAttendance'
import UserAdmin from './UserAdmin'
import CampaignAdmin from './CampaignAdmin'
import Sidebar from '../components/shared/Sidebar'


export default function Dashboard() {
  const [activeLink, setActiveLink] = useState('punch-in')
  const [sidebarMinimized, setSidebarMinimized] = useState(false)
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  const renderContent = () => {
    switch (activeLink) {
      case 'punch-in':
        return <PunchIn />
      case 'schedule-tracker':
        return <ScheduleTracker />
      case 'attendance':
        return <Attendance />
      case 'admin-attendance':
        return <AdminAttendance />
      case 'user-admin':
        return <UserAdmin />
      case 'campaign-admin':
        return <CampaignAdmin />
      default:
        return <PunchIn />
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f9fafb' }}>
      <Sidebar 
        activeLink={activeLink}
        setActiveLink={setActiveLink}
        minimized={sidebarMinimized}
        setMinimized={setSidebarMinimized}
        user={user}
        onLogout={handleLogout}
      />
      
      <main className={`flex-1 transition-all duration-300 ${
        sidebarMinimized ? 'ml-[70px]' : 'ml-[220px]'
      }`}>
        <div className="p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}