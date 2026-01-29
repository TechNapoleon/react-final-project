import { useState } from 'react'

export default function GroupTabs({ groups, activeGroupId, onSelectGroup, onAddGroup }) {
    const [isAdding, setIsAdding] = useState(false)
    const [newGroupName, setNewGroupName] = useState('')

    const handleAddSubmit = (e) => {
        e.preventDefault()
        if (newGroupName.trim()) {
            onAddGroup(newGroupName.trim())
            setNewGroupName('')
            setIsAdding(false)
        }
    }

    return (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 border-b border-gray-200 dark:border-gray-700 no-scrollbar">
            {groups.map(group => (
                <button
                    key={group.id}
                    onClick={() => onSelectGroup(group.id)}
                    className={`px-4 py-2 rounded-t-lg font-medium transition-all whitespace-nowrap ${activeGroupId === group.id
                            ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                        }`}
                >
                    {group.name}
                </button>
            ))}

            {isAdding ? (
                <form onSubmit={handleAddSubmit} className="flex items-center gap-2">
                    <input
                        type="text"
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                        placeholder="Name..."
                        autoFocus
                        className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        onBlur={() => !newGroupName && setIsAdding(false)}
                    />
                </form>
            ) : (
                <button
                    onClick={() => setIsAdding(true)}
                    className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    title="Add Group"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
            )}
        </div>
    )
}
