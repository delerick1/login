import { useState, useMemo } from 'react'
import UserAdminHeader from '../components/UserAdmin/UserAdminHeader'
import UserAdminControls from '../components/UserAdmin/UserAdminControls'
import UserAdminTable from '../components/UserAdmin/UserAdminTable'
import UserModal from '../components/UserAdmin/UserModal'
import PasswordModal from '../components/UserAdmin/PasswordModal'
import BulkActionsModal from '../components/UserAdmin/BulkActionsModal'

export default function UserAdmin() {
  const [users, setUsers] = useState([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Smith Rodriguez',
      userId: 'EMP001',
      email: 'john.smith@company.com',
      loginName: 'jsmith',
      campaignName: 'Customer Support Q1',
      hireDate: '2024-01-15',
      role: 'Agent',
      status: 'active',
      deactivateEndDate: null,
      supervisor: 'Sarah Johnson'
    },
    {
      id: 2,
      firstName: 'Maria Elena',
      lastName: 'Garcia Martinez',
      userId: 'EMP002',
      email: 'maria.garcia@company.com',
      loginName: 'mgarcia',
      campaignName: 'Sales Team Alpha',
      hireDate: '2024-02-01',
      role: 'Agent',
      status: 'active',
      deactivateEndDate: null,
      supervisor: 'Michael Brown'
    },
    {
      id: 3,
      firstName: 'Sarah',
      lastName: 'Johnson Wilson',
      userId: 'SUP001',
      email: 'sarah.johnson@company.com',
      loginName: 'sjohnson',
      campaignName: 'Customer Support Q1',
      hireDate: '2023-06-10',
      role: 'Supervisor',
      status: 'active',
      deactivateEndDate: null,
      supervisor: 'Admin'
    },
    {
      id: 4,
      firstName: 'David',
      lastName: 'Chen Liu',
      userId: 'EMP003',
      email: 'david.chen@company.com',
      loginName: 'dchen',
      campaignName: 'Technical Support',
      hireDate: '2024-03-01',
      role: 'SME',
      status: 'deactivated',
      deactivateEndDate: '2024-12-31',
      supervisor: 'Sarah Johnson'
    }
  ])

  const [campaigns] = useState([
    'Customer Support Q1',
    'Sales Team Alpha',
    'Technical Support',
    'Quality Assurance',
    'Training Department'
  ])

  const [supervisors] = useState([
    'Admin',
    'Sarah Johnson',
    'Michael Brown',
    'Jennifer Davis',
    'Robert Wilson'
  ])

  const [roles] = useState(['Supervisor', 'Agent', 'SME', 'QA'])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUsers, setSelectedUsers] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showBulkModal, setShowBulkModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [passwordUser, setPasswordUser] = useState(null)

  // Filter users based on search term
  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users
    
    const term = searchTerm.toLowerCase()
    return users.filter(user => 
      user.firstName.toLowerCase().includes(term) ||
      user.lastName.toLowerCase().includes(term) ||
      user.userId.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.loginName.toLowerCase().includes(term)
    )
  }, [users, searchTerm])

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id))
    }
    setSelectAll(!selectAll)
  }

  // Handle individual user selection
  const handleUserSelect = (userId) => {
    setSelectedUsers(prev => {
      const newSelection = prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
      
      setSelectAll(newSelection.length === filteredUsers.length)
      return newSelection
    })
  }

  // Add new user
  const handleAddUser = () => {
    setEditingUser(null)
    setShowUserModal(true)
  }

  // Edit existing user
  const handleEditUser = (user) => {
    setEditingUser(user)
    setShowUserModal(true)
  }

  // Save user (add or edit)
  const handleSaveUser = (userData) => {
    if (editingUser) {
      setUsers(prev => prev.map(user => 
        user.id === editingUser.id ? { ...userData, id: editingUser.id } : user
      ))
    } else {
      const newUser = {
        ...userData,
        id: Math.max(...users.map(u => u.id)) + 1
      }
      setUsers(prev => [...prev, newUser])
    }
    setShowUserModal(false)
    setEditingUser(null)
  }

  // Delete user
  const handleDeleteUser = (userId) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(user => user.id !== userId))
      setSelectedUsers(prev => prev.filter(id => id !== userId))
    }
  }

  // Change password
  const handleChangePassword = (user) => {
    setPasswordUser(user)
    setShowPasswordModal(true)
  }

  // Handle password change
  const handlePasswordChange = (passwordData) => {
    // In a real app, this would make an API call
    console.log('Password changed for user:', passwordUser.userId, passwordData)
    setShowPasswordModal(false)
    setPasswordUser(null)
  }

  // Handle bulk actions
  const handleBulkAction = (action, data) => {
    const selectedUserObjects = users.filter(user => selectedUsers.includes(user.id))
    
    switch (action) {
      case 'export':
        // Export to Excel functionality would go here
        console.log('Exporting users:', selectedUserObjects)
        break
      case 'deactivate':
        setUsers(prev => prev.map(user => 
          selectedUsers.includes(user.id) 
            ? { ...user, status: 'deactivated', deactivateEndDate: data.endDate }
            : user
        ))
        break
      case 'activate':
        setUsers(prev => prev.map(user => 
          selectedUsers.includes(user.id) 
            ? { ...user, status: 'active', deactivateEndDate: null }
            : user
        ))
        break
      case 'changeCampaign':
        setUsers(prev => prev.map(user => 
          selectedUsers.includes(user.id) 
            ? { ...user, campaignName: data.campaign }
            : user
        ))
        break
    }
    
    setSelectedUsers([])
    setSelectAll(false)
    setShowBulkModal(false)
  }

  return (
    <div className="max-w-full mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <UserAdminHeader />

        <UserAdminControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedUsers={selectedUsers}
          onAddUser={handleAddUser}
          onBulkActions={() => setShowBulkModal(true)}
          onSelectAll={handleSelectAll}
          selectAll={selectAll}
          filteredUsersCount={filteredUsers.length}
        />

        <UserAdminTable
          users={filteredUsers}
          selectedUsers={selectedUsers}
          onUserSelect={handleUserSelect}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
          onChangePassword={handleChangePassword}
        />

        {/* User Modal */}
        {showUserModal && (
          <UserModal
            user={editingUser}
            campaigns={campaigns}
            supervisors={supervisors}
            roles={roles}
            onSave={handleSaveUser}
            onClose={() => {
              setShowUserModal(false)
              setEditingUser(null)
            }}
          />
        )}

        {/* Password Modal */}
        {showPasswordModal && (
          <PasswordModal
            user={passwordUser}
            onSave={handlePasswordChange}
            onClose={() => {
              setShowPasswordModal(false)
              setPasswordUser(null)
            }}
          />
        )}

        {/* Bulk Actions Modal */}
        {showBulkModal && (
          <BulkActionsModal
            selectedCount={selectedUsers.length}
            campaigns={campaigns}
            onAction={handleBulkAction}
            onClose={() => setShowBulkModal(false)}
          />
        )}
      </div>
    </div>
  )
}