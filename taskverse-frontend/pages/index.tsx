import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, CheckCircle, Clock, Plus, AlertCircle, Search, Filter, Trash2, Edit2, Moon, Sun } from 'lucide-react';
import { api } from '../services/api';
import { Task } from '../types/task';

// Animation helper function
const fadeIn = "transition-opacity duration-500 ease-in-out";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await api.getTasks(statusFilter || undefined);
      setTasks(data);
      setError(null);
      setTimeout(() => setShowAnimation(true), 100);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();

    // Check user's preferred color scheme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, [statusFilter]);

  useEffect(() => {
    // Reset animation when filter changes
    setShowAnimation(false);
    setTimeout(() => setShowAnimation(true), 100);
  }, [statusFilter]);

  const handleTaskDelete = () => {
    setShowAnimation(false);
    fetchTasks();
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'in-progress':
        return <Clock className="w-4 h-4" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const mainClass = darkMode
    ? "min-h-screen bg-gray-900 text-gray-100"
    : "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-800";

  const cardClass = darkMode
    ? "bg-gray-800 border-gray-700 shadow-lg hover:shadow-xl hover:border-indigo-500"
    : "bg-white border-gray-200 shadow-md hover:shadow-lg hover:border-blue-300";

  return (
    <div className={mainClass}>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="mb-12 relative">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                TaskVerse
              </h1>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} mb-4 text-lg`}>
                Organize your universe of tasks
              </p>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${darkMode ? "bg-gray-700 text-yellow-300" : "bg-blue-100 text-blue-800"}`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center">
            <Link
              href="/create"
              className={`inline-flex items-center px-6 py-3 ${darkMode ? "bg-indigo-600 hover:bg-indigo-700" : "bg-blue-600 hover:bg-blue-700"} text-white rounded-lg transform transition-transform duration-200 hover:scale-105 shadow-lg`}
            >
              <Plus className="w-5 h-5 mr-2" />
              <span>Create New Task</span>
            </Link>

            <div className={`flex-1 relative ${darkMode ? "text-white" : "text-gray-800"}`}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg ${darkMode
                  ? "bg-gray-800 border-gray-700 focus:border-indigo-500"
                  : "bg-white border-gray-200 focus:border-blue-500"
                  } border focus:ring-2 focus:ring-opacity-50 ${darkMode ? "focus:ring-indigo-500" : "focus:ring-blue-500"
                  } transition-colors duration-200`}
              />
            </div>
          </div>
        </header>

        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {['all', 'To-Do', 'In Progress', 'Done'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status === 'all' ? null : status)}
                className={`px-4 py-2 rounded-full border transition-all duration-200 flex items-center ${(status === 'all' && statusFilter === null) || status === statusFilter
                  ? darkMode
                    ? 'bg-indigo-600 text-white border-indigo-700'
                    : 'bg-blue-600 text-white border-blue-700'
                  : darkMode
                    ? 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
              >
                <Filter className="w-4 h-4 mr-2" />
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className={`${darkMode ? "bg-red-900 text-red-100" : "bg-red-100 text-red-700"} p-4 rounded-lg mb-6 flex items-center shadow-md`}>
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className={`text-center py-16 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
            <p className={`text-2xl ${darkMode ? "text-gray-400" : "text-gray-500"}`}>No tasks found</p>
            {statusFilter && (
              <p className={`text-sm mt-2 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                Try changing the status filter
              </p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task, index) => (
              <div
                key={task._id}
                className={`${cardClass} rounded-lg border p-6 transition-all duration-300 ${showAnimation ? `opacity-100 transform translate-y-0` : `opacity-0 transform translate-y-4`
                  }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold line-clamp-1">{task.title}</h2>
                  <div className={`px-3 py-1 rounded-full text-xs flex items-center ${getStatusColor(task.status)}`}>
                    {getStatusIcon(task.status)}
                    <span className="ml-1 capitalize">{task.status}</span>
                  </div>
                </div>

                <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} mb-4 line-clamp-3`}>
                  {task.description}
                </p>

                <div className={`flex items-center mb-4 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                </div>

                <div className="flex justify-between mt-4">
                  <Link
                    href={`/edit/${task._id}`}
                    className={`flex items-center px-3 py-2 rounded ${darkMode
                      ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                  >
                    <Edit2 className="w-4 h-4 mr-1" />
                    Edit
                  </Link>

                  <button
                    onClick={() => {
                      api.deleteTask(task._id).then(handleTaskDelete);
                    }}
                    className={`flex items-center px-3 py-2 rounded ${darkMode
                      ? "bg-red-900 hover:bg-red-800 text-red-100"
                      : "bg-red-100 hover:bg-red-200 text-red-700"
                      }`}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}