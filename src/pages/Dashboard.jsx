import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/authSlice'
import Sidebar from '../components/shared/Sidebar'
import PunchIn from './PunchIn'
import ScheduleTracker from './ScheduleTracker'
import Attendance from './Attendance'
import UserAdmin from './UserAdmin'
import CampaignAdmin from './CampaignAdmin'
import Header from '../components/shared/Header'


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
      case 'user-admin':
        return <UserAdmin />
      case 'campaign-admin':
        return <CampaignAdmin />
      default:
        return <PunchIn />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={handleLogout} />
      
      <div className="flex">
        <Sidebar 
          activeLink={activeLink}
          setActiveLink={setActiveLink}
          minimized={sidebarMinimized}
          setMinimized={setSidebarMinimized}
        />
        
        <main className={`flex-1 transition-all duration-300 ${
          sidebarMinimized ? 'ml-16' : 'ml-64'
        }`}>
          <div className="p-6 pt-20">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  )
}