import { useState, useEffect } from 'react'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import Footer from './components/Footer'

const getInitialTasks = () => {
  try {
    const stored = localStorage.getItem('tasks')
    if (stored) return JSON.parse(stored)
  } catch (e) {
    console.error('Failed to parse tasks', e)
  }
  return []
}

function App() {
  const [tasks, setTasks] = useState(getInitialTasks)
  const [filter, setFilter] = useState('all') // 'all', 'active', 'completed'

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (text) => {
    const newTask = {
      id: crypto.randomUUID(),
      text,
      isCompleted: false
    }
    setTasks(prev => [newTask, ...prev])
  }

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t =>
      t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
    ))
  }

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  const editTask = (id, newText) => {
    setTasks(prev => prev.map(t =>
      t.id === id ? { ...t, text: newText } : t
    ))
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.isCompleted
    if (filter === 'completed') return task.isCompleted
    return true
  })

  const activeCount = tasks.filter(t => !t.isCompleted).length

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Task Manager
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Stay organized and focused
            </p>
          </div>

          <div className="space-y-6">
            <TaskInput onAddTask={addTask} />

            <TaskList
              tasks={filteredTasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onEdit={editTask}
            />

            {(tasks.length > 0 || filter !== 'all') && (
              <Footer
                activeCount={activeCount}
                currentFilter={filter}
                onSetFilter={setFilter}
              />
            )}
          </div>
        </div>

        {/* Simple decorative bottom bar */}
        <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
      </div>
    </div>
  )
}

export default App
