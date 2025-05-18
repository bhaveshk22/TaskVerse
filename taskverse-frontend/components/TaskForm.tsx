
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { TaskStatus, CreateTaskDto, UpdateTaskDto } from '../types/task';
import { api } from '../services/api';
import { Calendar, Clock, AlertCircle, CheckCircle, X } from 'lucide-react';

interface TaskFormProps {
  taskId?: string;
  isEditMode?: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ taskId, isEditMode = false }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateTaskDto | UpdateTaskDto>({
    title: '',
    description: '',
    dueDate: new Date().toISOString().split('T')[0],
    status: TaskStatus.TODO,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      if (isEditMode && taskId) {
        try {
          setLoading(true);
          const task = await api.getTask(taskId);
          setFormData({
            title: task.title,
            description: task.description,
            dueDate: new Date(task.dueDate).toISOString().split('T')[0],
            status: task.status,
          });
        } catch (err) {
          console.error('Error fetching task:', err);
          setError('Failed to load task data');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTask();
  }, [isEditMode, taskId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isEditMode && taskId) {
        await api.updateTask(taskId, formData);
        setSuccess('Task updated successfully!');
      } else {
        await api.createTask(formData);
        setSuccess('Task created successfully!');
      }

      // Redirect after a brief delay to show success message
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to save task');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.TODO:
        return 'bg-blue-100 text-blue-700';
      case TaskStatus.IN_PROGRESS:
        return 'bg-yellow-100 text-yellow-700';
      case TaskStatus.DONE:
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading && isEditMode) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin mb-4"></div>
          <p className="text-blue-500 font-medium">Loading task data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {isEditMode ? 'Edit Task' : 'Create New Task'}
      </h2>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md flex items-start">
          <AlertCircle className="text-red-500 mr-3 mt-0.5 flex-shrink-0" size={18} />
          <p className="text-red-700">{error}</p>
          <button
            onClick={() => setError(null)}
            className="ml-auto text-red-500 hover:text-red-700"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-md flex items-start">
          <CheckCircle className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={18} />
          <p className="text-green-700">{success}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="Enter task title"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition h-32 resize-none"
            placeholder="Describe your task here..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Due Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute top-3.5 left-3 text-gray-400" size={18} />
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Status</label>
            <div className="relative">
              <Clock className="absolute top-3.5 left-3 text-gray-400" size={18} />
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none bg-white"
              >
                {Object.values(TaskStatus).map((status) => (
                  <option key={status} value={status}>
                    {status.replace('_', ' ')}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${formData.status ? getStatusColor(formData.status as TaskStatus) : ''}`}>
            {formData.status?.replace('_', ' ') || ''}
          </div>
        </div>

        <div className="flex space-x-4 pt-6">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 font-medium transition duration-200 flex-grow md:flex-grow-0 shadow-sm"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : (
              isEditMode ? 'Update Task' : 'Create Task'
            )}
          </button>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 font-medium transition duration-200 flex-grow md:flex-grow-0"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;