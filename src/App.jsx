import { useState, useEffect } from 'react'
import TaskGroup from './components/TaskGroup'
import GroupTabs from './components/GroupTabs'
import Footer from './components/Footer'
import ThemeToggle from './components/ThemeToggle'
import BackgroundLayer from './components/BackgroundLayer'
import DigitalHelper from './components/DigitalHelper'

const getInitialTasks = () => {
  try {
    const stored = localStorage.getItem('tasks')
    if (stored) {
      const parsed = JSON.parse(stored)
      // Migration: Ensure all tasks have a groupId
      return parsed.map(t => ({ ...t, groupId: t.groupId || 'default' }))
    }
  } catch (e) {
    console.error('Failed to parse tasks', e)
  }
  return []
}

const getInitialGroups = () => {
  try {
    const stored = localStorage.getItem('groups')
    if (stored) return JSON.parse(stored)
  } catch (e) {
    console.error('Failed to parse groups', e)
  }
  return [{ id: 'default', name: 'My Tasks' }]
}

const getInitialTheme = () => {
  if (typeof window !== 'undefined' && localStorage.getItem('theme')) {
    return localStorage.getItem('theme')
  }
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}

function App() {
  const [tasks, setTasks] = useState(getInitialTasks)
  const [groups, setGroups] = useState(getInitialGroups)
  const [filter, setFilter] = useState('all') // 'all', 'active', 'completed'
  const [theme, setTheme] = useState(getInitialTheme)
  const [activeGroupId, setActiveGroupId] = useState('')
  const [helperMood, setHelperMood] = useState('idle')

  const triggerMood = (mood) => {
    setHelperMood(mood)
    setTimeout(() => setHelperMood('idle'), 3000)
  }

  // Set initial active group
  useEffect(() => {
    if (!activeGroupId && groups.length > 0) {
      setActiveGroupId(groups[0].id)
    }
  }, [groups])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem('groups', JSON.stringify(groups))
  }, [groups])

  useEffect(() => {
    localStorage.setItem('theme', theme)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  const addTask = (text, groupId) => {
    triggerMood('success')
    const newTask = {
      id: crypto.randomUUID(),
      text,
      isCompleted: false,
      groupId
    }
    setTasks(prev => [newTask, ...prev])
  }

  const addGroup = (name) => {
    const newGroup = {
      id: crypto.randomUUID(),
      name: name
    }
    setGroups(prev => [...prev, newGroup])
    setActiveGroupId(newGroup.id) // Switch to new group
  }

  const deleteGroup = (groupId) => {
    const groupTasks = tasks.filter(t => t.groupId === groupId)
    const hasUncompleted = groupTasks.some(t => !t.isCompleted)

    if (hasUncompleted) {
      alert('Cannot delete group with uncompleted tasks!')
      return
    }

    if (confirm('Are you sure you want to delete this group? All completed tasks in it will be removed.')) {
      // Find next group to switch to
      const groupIndex = groups.findIndex(g => g.id === groupId)
      const nextGroup = groups[groupIndex + 1] || groups[groupIndex - 1] || null

      setGroups(prev => prev.filter(g => g.id !== groupId))
      setTasks(prev => prev.filter(t => t.groupId !== groupId))

      if (nextGroup) {
        setActiveGroupId(nextGroup.id)
      } else {
        setActiveGroupId('')
      }
    }
  }

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        if (!t.isCompleted) triggerMood('celebrate')
        return { ...t, isCompleted: !t.isCompleted }
      }
      return t
    }))
  }

  const deleteTask = (id) => {
    triggerMood('delete')
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  const editTask = (id, newText) => {
    setTasks(prev => prev.map(t =>
      t.id === id ? { ...t, text: newText } : t
    ))
  }

  const clearCompleted = () => {
    // Only clear completed in the current group? Or all? 
    // Usually "Clear Completed" implies the current view.
    // Let's clear completed tasks appearing in the current filtered view (which is the active group).

    // Actually, user expectation for "Clear Completed" often implies "clear all completed tasks I can see".
    // So let's filter purely based on activeGroupId
    setTasks(prev => prev.filter(t => !(t.isCompleted && t.groupId === activeGroupId)))
  }

  // Derived state
  const activeGroup = groups.find(g => g.id === activeGroupId)

  // Filter tasks for current group and filter status
  const currentGroupTasks = tasks.filter(t => t.groupId === activeGroupId)
  const displayedTasks = currentGroupTasks.filter(task => {
    if (filter === 'active') return !task.isCompleted
    if (filter === 'completed') return task.isCompleted
    return true
  })

  // Count active tasks in this group
  const activeCount = currentGroupTasks.filter(t => !t.isCompleted).length

  return (
    <div className="min-h-screen flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300 relative z-0">
      <BackgroundLayer />
      <div className="max-w-xl w-full bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden transition-colors duration-300 flex flex-col min-h-[500px]">
        <div className="p-8 flex-1 flex flex-col">
          <div className="mb-6 flex items-center justify-between">
            <div className="text-left">
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Task Manager
              </h1>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Managed by Groups
              </p>
            </div>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>

          <GroupTabs
            groups={groups}
            activeGroupId={activeGroupId}
            onSelectGroup={setActiveGroupId}
            onAddGroup={addGroup}
          />

          <div className="space-y-6 flex-1 flex flex-col">
            {activeGroup ? (
              <TaskGroup
                key={activeGroup.id}
                group={activeGroup}
                tasks={displayedTasks}
                onDeleteGroup={deleteGroup}
                onAddTask={addTask}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onEdit={editTask}
              />
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                <p>No groups found.</p>
                <p className="text-sm">Add a group to get started!</p>
              </div>
            )}

            {activeGroup && (
              <Footer
                activeCount={activeCount}
                currentFilter={filter}
                onSetFilter={setFilter}
                onClearCompleted={clearCompleted}
              />
            )}
          </div>
        </div>

        <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
      </div>
      <DigitalHelper mood={helperMood} />
    </div>
  )
}

export default App
