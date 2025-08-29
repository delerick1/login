const PlusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
)

const MinusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
  </svg>
)

export default function AdminAttendanceFilters({ 
  activeFilters, 
  onFilterChange,
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  selectedDate,
  setSelectedDate
}) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i)

  const filterCategories = {
    categories: [
      { id: 'name', label: 'Name' },
      { id: 'id', label: 'ID' },
      { id: 'email', label: 'Email' },
      { id: 'campaign', label: 'Campaign' },
      { id: 'supervisor', label: 'Supervisor' }
    ],
    punchTypes: [
      { id: 'in-out', label: 'IN/OUT' },
      { id: 'break1', label: 'BREAK 1' },
      { id: 'break2', label: 'BREAK 2' },
      { id: 'lunch', label: 'LUNCH' },
      { id: 'training', label: 'TRAINING' },
      { id: 'technical', label: 'TECHNICAL' }
    ],
    duration: [
      { id: 'short', label: '< 8 hours' },
      { id: 'normal', label: '8 hours' },
      { id: 'overtime', label: '> 8 hours' }
    ],
    late: [
      { id: 'on-time', label: 'On Time' },
      { id: 'late', label: 'Late' },
      { id: 'very-late', label: 'Very Late (>15min)' }
    ],
    adherence: [
      { id: 'excellent', label: 'Excellent (95%+)' },
      { id: 'good', label: 'Good (85-94%)' },
      { id: 'poor', label: 'Poor (<85%)' }
    ]
  }

  const handleFilterToggle = (filterType, filterId) => {
    const isActive = activeFilters[filterType].includes(filterId)
    onFilterChange(filterType, filterId, isActive ? 'remove' : 'add')
  }

  const FilterSection = ({ title, filterType, items }) => (
    <div className="mb-4">
      <h4 className="text-sm font-semibold text-gray-700 mb-2">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {items.map(item => {
          const isActive = activeFilters[filterType].includes(item.id)
          return (
            <button
              key={item.id}
              onClick={() => handleFilterToggle(filterType, item.id)}
              className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {isActive ? <MinusIcon /> : <PlusIcon />}
              <span>{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Filters & Date Selection</h3>
      
      {/* Date Controls */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-white rounded-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {months.map((month, index) => (
              <option key={index} value={index}>{month}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Specific Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        
        <div className="flex items-end">
          <button
            onClick={() => setSelectedDate('')}
            className="w-full px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
          >
            Clear Date
          </button>
        </div>
      </div>

      {/* Filter Categories */}
      <div className="space-y-4">
        <FilterSection 
          title="Display Categories" 
          filterType="categories" 
          items={filterCategories.categories} 
        />
        
        <FilterSection 
          title="Punch Types" 
          filterType="punchTypes" 
          items={filterCategories.punchTypes} 
        />
        
        <FilterSection 
          title="Duration" 
          filterType="duration" 
          items={filterCategories.duration} 
        />
        
        <FilterSection 
          title="Late Status" 
          filterType="late" 
          items={filterCategories.late} 
        />
        
        <FilterSection 
          title="Adherence" 
          filterType="adherence" 
          items={filterCategories.adherence} 
        />
      </div>

      {/* Active Filters Summary */}
      {Object.values(activeFilters).some(filters => filters.length > 0) && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800 mb-2">Active Filters:</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(activeFilters).map(([filterType, filters]) =>
              filters.map(filterId => {
                const category = filterCategories[filterType]
                const item = category?.find(item => item.id === filterId)
                return item ? (
                  <span
                    key={`${filterType}-${filterId}`}
                    className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full"
                  >
                    {item.label}
                  </span>
                ) : null
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}