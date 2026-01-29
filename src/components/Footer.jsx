export default function Footer({ activeCount, currentFilter, onSetFilter, onClearCompleted }) {
    const filters = [
        { key: 'all', label: 'All' },
        { key: 'active', label: 'Active' },
        { key: 'completed', label: 'Completed' },
    ]

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-4">
                <p>{activeCount} {activeCount === 1 ? 'task' : 'tasks'} remaining</p>
                <button
                    onClick={onClearCompleted}
                    className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                    Clear Completed
                </button>
            </div>

            <div className="flex gap-2 bg-gray-50 dark:bg-gray-800 p-1 rounded-lg">
                {filters.map(({ key, label }) => (
                    <button
                        key={key}
                        onClick={() => onSetFilter(key)}
                        className={`px-3 py-1 rounded-md transition-all ${currentFilter === key
                            ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm font-medium'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-700/50'
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    )
}
