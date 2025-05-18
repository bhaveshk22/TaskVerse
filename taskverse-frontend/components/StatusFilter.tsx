import React from 'react';
import { TaskStatus } from '../types/task';

interface StatusFilterProps {
  currentStatus: string | null;
  onStatusChange: (status: string | null) => void;
}

const StatusFilter: React.FC<StatusFilterProps> = ({
  currentStatus,
  onStatusChange,
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-2">Filter by Status</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onStatusChange(null)}
          className={`px-3 py-1 rounded ${
            currentStatus === null
              ? 'bg-gray-800 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          All
        </button>
        {Object.values(TaskStatus).map((status) => (
          <button
            key={status}
            onClick={() => onStatusChange(status)}
            className={`px-3 py-1 rounded ${
              currentStatus === status
                ? 'bg-gray-800 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StatusFilter;
