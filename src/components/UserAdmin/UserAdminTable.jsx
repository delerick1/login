const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
)

const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
)

const KeyIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
  </svg>
)

export default function UserAdminTable({ 
  users, 
  selectedUsers, 
  onUserSelect, 
  onEditUser, 
  onDeleteUser, 
  onChangePassword 
}) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-full">
        <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
          {/* Header Row */}
          <div className="grid grid-cols-13 bg-gray-100 border-b border-gray-300 text-xs">
            <div className="px-3 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">
              <input type="checkbox" className="w-4 h-4" disabled />
            </div>
            <div className="px-3 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">Name</div>
            <div className="px-3 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">Last Name</div>
            <div className="px-3 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">User ID</div>
            <div className="px-3 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">Email</div>
            <div className="px-3 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">Login Name</div>
            <div className="px-3 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">Campaign</div>
            <div className="px-3 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">Hire Date</div>
            <div className="px-3 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">Role</div>
            <div className="px-3 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">Status</div>
            <div className="px-3 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">Deactivate End</div>
            <div className="px-3 py-3 text-left font-medium text-gray-700 uppercase tracking-wider border-r border-gray-300">Supervisor</div>
            <div className="px-3 py-3 text-left font-medium text-gray-700 uppercase tracking-wider">Actions</div>
          </div>

          {/* Data Rows */}
          {users.map((user, index) => (
            <div key={user.id} className={`grid grid-cols-13 text-sm ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b border-gray-200 hover:bg-blue-50 transition-colors`}>
              <div className="px-3 py-3 border-r border-gray-200">
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => onUserSelect(user.id)}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
              </div>
              <div className="px-3 py-3 text-gray-900 border-r border-gray-200 font-medium">{user.firstName}</div>
              <div className="px-3 py-3 text-gray-900 border-r border-gray-200">{user.lastName}</div>
              <div className="px-3 py-3 text-gray-900 border-r border-gray-200 font-mono">{user.userId}</div>
              <div className="px-3 py-3 text-gray-900 border-r border-gray-200">{user.email}</div>
              <div className="px-3 py-3 text-gray-900 border-r border-gray-200 font-mono">{user.loginName}</div>
              <div className="px-3 py-3 text-gray-900 border-r border-gray-200">{user.campaignName}</div>
              <div className="px-3 py-3 text-gray-900 border-r border-gray-200">{user.hireDate}</div>
              <div className="px-3 py-3 border-r border-gray-200">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  user.role === 'Supervisor' ? 'bg-purple-100 text-purple-800' :
                  user.role === 'SME' ? 'bg-blue-100 text-blue-800' :
                  user.role === 'QA' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {user.role}
                </span>
              </div>
              <div className="px-3 py-3 border-r border-gray-200">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {user.status}
                </span>
              </div>
              <div className="px-3 py-3 text-gray-900 border-r border-gray-200">
                {user.deactivateEndDate || '-'}
              </div>
              <div className="px-3 py-3 text-gray-900 border-r border-gray-200">{user.supervisor}</div>
              <div className="px-3 py-3">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onEditUser(user)}
                    className="p-1 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100 rounded transition-colors"
                    title="Edit User"
                  >
                    <EditIcon />
                  </button>
                  <button
                    onClick={() => onChangePassword(user)}
                    className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded transition-colors"
                    title="Change Password"
                  >
                    <KeyIcon />
                  </button>
                  <button
                    onClick={() => onDeleteUser(user.id)}
                    className="p-1 text-red-600 hover:text-red-800 hover:bg-red-100 rounded transition-colors"
                    title="Delete User"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}