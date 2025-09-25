import { useEffect, useMemo, useState } from 'react'
import client from '../lib/api.js'
import Footer from '../components/Footer.jsx'
import ProfileModal from '../components/ProfileModal.jsx'
import { logout } from '../lib/auth.js'

export default function Dashboard() {
  const [profile, setProfile] = useState(null)
  const [tasks, setTasks] = useState([])
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [showProfileModal, setShowProfileModal] = useState(false)

  async function loadData() {
    setLoading(true)
    try {
      const [{ data: p }, { data: t }] = await Promise.all([
        client.get('/profile'),
        client.get('/tasks', { params: { q, status } })
      ])
      setProfile(p.user)
      setTasks(t.items)
      setIsVisible(true)
    } catch (err) {
      console.error('Failed to load data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { 
    loadData() 
  }, [])

  async function addTask(e) {
    e.preventDefault()
    if (!title.trim()) return
    
    setLoading(true)
    try {
      const { data } = await client.post('/tasks', { title, description })
      setTasks([data.task, ...tasks])
      setTitle('')
      setDescription('')
    } catch (err) {
      console.error('Failed to add task:', err)
    } finally {
      setLoading(false)
    }
  }

  async function updateTask(id, update) {
    try {
      const { data } = await client.put(`/tasks/${id}`, update)
      setTasks(tasks.map(t => t._id === id ? data.task : t))
      setEditingTask(null)
    } catch (err) {
      console.error('Failed to update task:', err)
    }
  }

  async function deleteTask(id) {
    if (!confirm('Are you sure you want to delete this task?')) return
    
    try {
      await client.delete(`/tasks/${id}`)
      setTasks(tasks.filter(t => t._id !== id))
    } catch (err) {
      console.error('Failed to delete task:', err)
    }
  }

  async function search(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await client.get('/tasks', { params: { q, status } })
      setTasks(data.items)
    } catch (err) {
      console.error('Failed to search tasks:', err)
    } finally {
      setLoading(false)
    }
  }

  function startEdit(task) {
    setEditingTask(task)
  }

  function cancelEdit() {
    setEditingTask(null)
  }

  function handleProfileUpdate(updatedProfile) {
    setProfile(updatedProfile)
  }

  function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
      logout()
    }
  }

  const stats = useMemo(() => ({
    total: tasks.length,
    todo: tasks.filter(t=>t.status==='todo').length,
    in_progress: tasks.filter(t=>t.status==='in_progress').length,
    done: tasks.filter(t=>t.status==='done').length,
  }), [tasks])

  if (loading && !isVisible) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <h1 className="text-xl sm:text-2xl font-bold gradient-text">LuminUI</h1>
              <span className="hidden sm:inline text-gray-400">|</span>
              <span className="hidden sm:inline text-gray-600">Dashboard</span>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Profile Button */}
              <button
                onClick={() => setShowProfileModal(true)}
                className="flex items-center space-x-2 sm:space-x-3 px-2 sm:px-4 py-2 bg-white/60 hover:bg-white/80 rounded-lg border border-white/20 transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {profile?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-medium text-gray-800">{profile?.name || 'User'}</div>
                  <div className="text-xs text-gray-500">View Profile</div>
                </div>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-600 hover:text-red-700 rounded-lg border border-red-200 hover:border-red-300 transition-all duration-300 hover:shadow-lg"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden sm:inline text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className={`space-y-8 p-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Quick Stats Overview */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Task Overview
              </h2>
              <p className="text-gray-600">Manage your tasks and stay productive</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Tasks</div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-2xl font-bold text-orange-500">{stats.todo}</div>
            <div className="text-sm text-gray-600">To Do</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-2xl font-bold text-blue-500">{stats.in_progress}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-2xl font-bold text-green-500">{stats.done}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-2xl font-bold text-purple-500">{Math.round((stats.done / Math.max(stats.total, 1)) * 100)}%</div>
            <div className="text-sm text-gray-600">Complete</div>
          </div>
        </div>

        {/* Search and Filter */}
        <form onSubmit={search} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Tasks</label>
              <input 
                value={q} 
                onChange={(e)=>setQ(e.target.value)} 
                placeholder="Search tasks..." 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            <div className="md:w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
              <select 
                value={status} 
                onChange={(e)=>setStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                <option value="">All Status</option>
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <button 
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {/* Add Task Form */}
        <form onSubmit={addTask} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Task</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Task Title</label>
              <input 
                value={title} 
                onChange={(e)=>setTitle(e.target.value)} 
                required 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter task title..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <input 
                value={description} 
                onChange={(e)=>setDescription(e.target.value)} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter description..."
              />
            </div>
            <div className="flex items-end">
              <button 
                className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                type="submit"
                disabled={loading || !title.trim()}
              >
                {loading ? 'Adding...' : 'Add Task'}
              </button>
            </div>
          </div>
        </form>

        {/* Tasks List */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Your Tasks</h3>
          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-600 text-lg">No tasks found. Create your first task above!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {tasks.map((task, index) => (
                <div 
                  key={task._id} 
                  className={`bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
                    task.status === 'done' ? 'opacity-75' : ''
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {editingTask?._id === task._id ? (
                    <div className="space-y-4">
                      <input 
                        value={editingTask.title}
                        onChange={(e) => setEditingTask({...editingTask, title: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      <input 
                        value={editingTask.description || ''}
                        onChange={(e) => setEditingTask({...editingTask, description: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Description..."
                      />
                      <div className="flex gap-2">
                        <button 
                          onClick={() => updateTask(task._id, { title: editingTask.title, description: editingTask.description })}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Save
                        </button>
                        <button 
                          onClick={cancelEdit}
                          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className={`font-semibold text-lg ${task.status === 'done' ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                          {task.title}
                        </h4>
                        {task.description && (
                          <p className={`text-gray-600 mt-1 ${task.status === 'done' ? 'line-through' : ''}`}>
                            {task.description}
                          </p>
                        )}
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
                          {task.updatedAt !== task.createdAt && (
                            <span>Updated: {new Date(task.updatedAt).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <select 
                          value={task.status} 
                          onChange={(e)=>updateTask(task._id, { status: e.target.value })}
                          className={`px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                            task.status === 'todo' ? 'bg-orange-100 text-orange-800' :
                            task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}
                        >
                          <option value="todo">To Do</option>
                          <option value="in_progress">In Progress</option>
                          <option value="done">Done</option>
                        </select>
                        <button 
                          onClick={() => startEdit(task)}
                          className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => deleteTask(task._id)}
                          className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
      
      {/* Profile Modal */}
      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        profile={profile}
        onProfileUpdate={handleProfileUpdate}
      />
    </div>
  )
}


