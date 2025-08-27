
export default function PunchSelector({selectedPunchType,setSelectedPunchType,punchTypes,handlePunch}) {
    return (
        /* Punch Type Selector */
        <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Punch Type:
            </label>
            <select
                value={selectedPunchType}
                onChange={(e) => setSelectedPunchType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
                {punchTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>
             {/* Punch Button */}
        <div className="text-center mb-8">
          <button
            onClick={handlePunch}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg rounded-lg transition-colors"
          >
            Punch {selectedPunchType}
          </button>
        </div>
        </div>
    )
}

