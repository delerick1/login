const DownloadIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)

const UploadIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
)

const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
)

export default function AdminAttendanceExport({ onExportImport, selectedAgent, attendanceRecords }) {
  const handleFileImport = (e) => {
    const file = e.target.files[0]
    if (file) {
      onExportImport('import', { file, agent: selectedAgent })
    }
  }

  const handleExport = (scope) => {
    onExportImport('export', { 
      scope, 
      agent: selectedAgent, 
      records: attendanceRecords 
    })
  }

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Export / Import</h3>
      
      <div className="flex flex-wrap gap-3">
        {/* Export Options */}
        <button
          onClick={() => handleExport('selected')}
          disabled={!selectedAgent}
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-md transition-colors"
        >
          <DownloadIcon />
          <span>Export Selected Agent</span>
        </button>
        
        <button
          onClick={() => handleExport('all')}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
        >
          <UsersIcon />
          <span>Export All Agents</span>
        </button>

        {/* Import */}
        <label className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors cursor-pointer">
          <UploadIcon />
          <span>Import Data</span>
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileImport}
            className="hidden"
          />
        </label>
      </div>
    </div>
  )
}