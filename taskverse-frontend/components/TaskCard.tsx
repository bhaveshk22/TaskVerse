import React from 'react';
import { Task, TaskStatus } from '../types/task';
import { useRouter } from 'next/router';
import { api } from '../services/api';

interface TaskCardProps {
  task: Task;
  onDelete: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete }) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/edit/${task._id}`);
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await api.deleteTask(task._id);
        onDelete();
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete task');
      }
    }
  };

  const getStatusColor = () => {
    switch (task.status) {
      case TaskStatus.TODO:
        return 'bg-yellow-100 text-yellow-800';
      case TaskStatus.IN_PROGRESS:
        return 'bg-blue-100 text-blue-800';
      case TaskStatus.DONE:
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="border rounded-lg p-4 mb-4 shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-medium">{task.title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor()}`}>
          {task.status}
        </span>
      </div>
      <p className="text-gray-700 mb-2">{task.description}</p>
      <p className="text-sm text-gray-500 mb-3">
        Due: {new Date(task.dueDate).toLocaleDateString()}
      </p>
      <div className="flex justify-end space-x-2">
        <button
          onClick={handleEdit}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;