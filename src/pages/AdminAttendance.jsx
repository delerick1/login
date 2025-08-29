import { useState, useMemo } from 'react'
import AdminAttendanceHeader from '../components/AdminAttendance/AdminAttendanceHeader'
import AdminAttendanceSearch from '../components/AdminAttendance/AdminAttendanceSearch'
import AdminAttendanceFilters from '../components/AdminAttendance/AdminAttendanceFilters'
import AdminAttendanceDisplay from '../components/AdminAttendance/AdminAttendanceDisplay'
import AdminAttendanceExport from '../components/AdminAttendance/AdminAttendanceExport'

export default function AdminAttendance() {
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAgent, setSelectedAgent] = useState(null)
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedDate, setSelectedDate] = useState('')
  
  // Filter states
  const [activeFilters, setActiveFilters] = useState({
    categories: [],
    punchTypes: [],
    duration: [],
    late: [],
    adherence: []
  })

  // Sample users data
  const [users] = useState([
    {
      id: 1,
      name: 'John Smith Rodriguez',
      userId: 'EMP001',
      email: 'john.smith@company.com',
      campaign: 'Customer Support Q1',
      supervisor: 'Sarah Johnson'
    },
    {
      id: 2,
      name: 'Maria Elena Garcia Martinez',
      userId: 'EMP002',
      email: 'maria.garcia@company.com',
      campaign: 'Sales Team Alpha',
      supervisor: 'Michael Brown'
    },
    {
      id: 3,
      name: 'David Chen Liu',
      userId: 'EMP003',
      email: 'david.chen@company.com',
      campaign: 'Technical Support',
      supervisor: 'Jennifer Davis'
    },
    {
      id: 4,
      name: 'Lisa Anderson',
      userId: 'EMP004',
      email: 'lisa.anderson@company.com',
      campaign: 'Quality Assurance',
      supervisor: 'Robert Wilson'
    }
  ])

  // Sample attendance data for selected agent
  const [attendanceData] = useState({
    1: { // User ID 1
      '2024-12-01': {
        login: '09:05', logout: '17:30',
        break1Out: '10:35', break1In: '10:50',
        break2Out: '14:35', break2In: '14:50',
        lunchOut: '12:05', lunchIn: '13:05',
        trainingOut: '15:00', trainingIn: '15:30',
        technicalOut: '16:00', technicalIn: '16:15',
        late: true, adherence: 92
      },
      '2024-12-02': {
        login: '08:55', logout: '17:25',
        break1Out: '10:30', break1In: '10:45',
        break2Out: '14:30', break2In: '14:45',
        lunchOut: '12:00', lunchIn: '13:00',
        trainingOut: null, trainingIn: null,
        technicalOut: null, technicalIn: null,
        late: false, adherence: 98
      }
    },
    2: { // User ID 2
      '2024-12-01': {
        login: '09:00', logout: '17:30',
        break1Out: '10:30', break1In: '10:45',
        break2Out: '14:30', break2In: '14:45',
        lunchOut: '12:00', lunchIn: '13:00',
        trainingOut: '15:30', trainingIn: '16:00',
        technicalOut: null, technicalIn: null,
        late: false, adherence: 96
      }
    }
  })

  // Filter users based on search
  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users
    
    const term = searchTerm.toLowerCase()
    return users.filter(user => 
      user.name.toLowerCase().includes(term) ||
      user.userId.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    )
  }, [users, searchTerm])

  // Get attendance records for selected agent and date range
  const getAttendanceRecords = () => {
    if (!selectedAgent) return []
    
    const agentData = attendanceData[selectedAgent.id] || {}
    const records = []
    
    // Generate date range based on filters
    let dates = []
    if (selectedDate) {
      dates = [selectedDate]
    } else {
      // Get all dates in selected month/year
      const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate()
      for (let day = 1; day <= daysInMonth; day++) {
        const date = `${selectedYear}-${(selectedMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
        dates.push(date)
      }
    }
    
    dates.forEach(date => {
      const dayData = agentData[date]
      if (dayData) {
        records.push({
          date,
          ...dayData
        })
      }
    })
    
    return records
  }

  const attendanceRecords = getAttendanceRecords()

  // Handle filter changes
  const handleFilterChange = (filterType, value, action) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: action === 'add' 
        ? [...prev[filterType], value]
        : prev[filterType].filter(item => item !== value)
    }))
  }

  // Handle export/import
  const handleExportImport = (action, data) => {
    switch (action) {
      case 'export':
        console.log('Exporting attendance data:', data)
        // Export functionality would go here
        break
      case 'import':
        console.log('Importing attendance data:', data)
        // Import functionality would go here
        break
    }
  }

  return (
    <div className="max-w-full mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <AdminAttendanceHeader />

        <AdminAttendanceSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredUsers={filteredUsers}
          selectedAgent={selectedAgent}
          setSelectedAgent={setSelectedAgent}
        />

        <AdminAttendanceFilters
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        <AdminAttendanceExport
          onExportImport={handleExportImport}
          selectedAgent={selectedAgent}
          attendanceRecords={attendanceRecords}
        />

        <AdminAttendanceDisplay
          selectedAgent={selectedAgent}
          attendanceRecords={attendanceRecords}
          activeFilters={activeFilters}
        />
      </div>
    </div>
  )
}