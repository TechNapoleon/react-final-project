import { useState, useEffect, useRef } from 'react'

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(task.text)
    const inputRef = useRef(null)

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isEditing])

    const handleEditSubmit = (e) => {
        e.preventDefault()
        if (editText.trim()) {
            onEdit(task.id, editText)
            setIsEditing(false)
        }
    }

    const handleBlur = () => {
        if (editText.trim()) {
            onEdit(task.id, editText)
        } else {
            setEditText(task.text)
        }
        setIsEditing(false)
    }

    return (
        <div className={`flex items-center justify-between p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all group ${task.isCompleted ? 'bg-gray-50 dark:bg-gray-800/60' : ''}`}>
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={() => onToggle(task.id)}
                    className="w-5 h-5 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 cursor-pointer accent-blue-600"
                />

                {isEditing ? (
                    <form onSubmit={handleEditSubmit} className="flex-1 mr-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onBlur={handleBlur}
                            className="w-full px-2 py-1 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-blue-300 dark:border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </form>
                ) : (
                    <span
                        className={`truncate flex-1 cursor-pointer select-none text-lg ${task.isCompleted ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-200'}`}
                        onResize={() => { }} // dummy prop to satisfy linter if needed, but not needed
                        onDoubleClick={() => setIsEditing(true)}
                    >
                        {task.text}
                    </span>
                )}
            </div>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors cursor-pointer"
                        title="Edit"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                    </button>
                )}
                <button
                    onClick={() => onDelete(task.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                    title="Delete"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
