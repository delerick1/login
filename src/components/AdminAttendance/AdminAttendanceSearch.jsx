const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const XIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)

export default function AdminAttendanceSearch({ 
  searchTerm, 
  setSearchTerm, 
  filteredUsers, 
  selectedAgent, 
  setSelectedAgent 
}) {
  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Search Employees</h3>
      
      {/* Search Box */}
      <div className="mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Search by User ID, Name, or Email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <XIcon />
            </button>
          )}
        </div>
      </div>

      {/* User Selection */}
      {searchTerm && filteredUsers.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Select Employee:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredUsers.map(user => (
              <button
                key={user.id}
                onClick={() => setSelectedAgent(user)}
                className={`p-3 border rounded-lg text-left transition-colors ${
                  selectedAgent?.id === user.id
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <UserIcon />
                  <span className="font-medium text-gray-900">{user.name}</span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>ID: {user.userId}</div>
                  <div>Email: {user.email}</div>
                  <div>Campaign: {user.campaign}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selected Agent Display */}
      {selectedAgent && (
        <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-indigo-800">Selected Employee:</h4>
              <p className="text-indigo-700">{selectedAgent.name} ({selectedAgent.userId})</p>
            </div>
            <button
              onClick={() => setSelectedAgent(null)}
              className="text-indigo-600 hover:text-indigo-800"
            >
              <XIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}