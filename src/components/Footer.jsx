export default function Footer({ activeCount, currentFilter, onSetFilter }) {
    const filters = [
        { key: 'all', label: 'All' },
        { key: 'active', label: 'Active' },
        { key: 'completed', label: 'Completed' },
    ]

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-gray-100 text-sm text-gray-600">
            <p>{activeCount} {activeCount === 1 ? 'task' : 'tasks'} remaining</p>

            <div className="flex gap-2 bg-gray-50 p-1 rounded-lg">
                {filters.map(({ key, label }) => (
                    <button
                        key={key}
                        onClick={() => onSetFilter(key)}
                        className={`px-3 py-1 rounded-md transition-all ${currentFilter === key
                                ? 'bg-white text-blue-600 shadow-sm font-medium'
                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/50'
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    )
}
