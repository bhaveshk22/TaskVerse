# TaskVerse - A Smart Task Management App

TaskVerse is a full-stack task management application built with NestJS, Next.js, and MongoDB. It allows users to create, view, update, and delete tasks with different statuses.

## Screenshots

![Screenshot (12)](https://github.com/user-attachments/assets/3cf93713-f6de-4efa-ba94-fdcb106d9ee2)


## Features

- Create tasks with title, description, due date, and status
- View all tasks with filtering by status
- Update task details
- Delete tasks
- Responsive design for various screen sizes

## Tech Stack

- **Backend**: NestJS (Node.js)
- **Frontend**: Next.js (React.js)
- **Database**: MongoDB
- **API Communication**: REST API

## Project Structure

```
taskverse/
├── taskverse-backend/   # NestJS backend
│   └── src/
│       ├── tasks/       # Tasks module
│       │   ├── dto/     # Data Transfer Objects
│       │   ├── schemas/ # MongoDB schemas
│       │   ├── tasks.controller.ts
│       │   ├── tasks.module.ts
│       │   └── tasks.service.ts
│       ├── app.module.ts
│       └── main.ts
└── taskverse-frontend/  # Next.js frontend
    ├── components/      # Reusable components
    ├── pages/           # Application pages
    ├── services/        # API services
    ├── styles/          # Global styles
    └── types/           # TypeScript type definitions
```

## Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/bhaveshk22/TaskVerse.git
cd TaskVerse
```

### 2. Set up the backend

```bash
# Navigate to the backend directory
cd taskverse-backend

# Install dependencies
npm install

# Create a .env file (optional, edit as needed)
echo "MONGODB_URI=mongodb://localhost:27017/taskverse" > .env

# Start the development server
npm run start:dev
```

### 3. Set up the frontend

```bash
# Open a new terminal and navigate to the frontend directory
cd taskverse-frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

## How to Run Locally

1. Make sure MongoDB is running on your local machine or update the connection string in `backend/src/app.module.ts` to point to your MongoDB instance.

2. Start the backend server:
   ```bash
   cd taskverse-backend
   npm run start:dev
   ```

3. Start the frontend development server:
   ```bash
   cd taskverse-frontend
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## API Documentation

### Task API Endpoints

| Endpoint         | Method | Description                    | Request Body                                              | Response                     |
|------------------|--------|--------------------------------|-----------------------------------------------------------|------------------------------|
| `/tasks`         | GET    | Get all tasks                  | -                                                         | Array of Task objects        |
| `/tasks?status=` | GET    | Get tasks filtered by status   | -                                                         | Array of filtered Tasks      |
| `/tasks/:id`     | GET    | Get a task by ID               | -                                                         | Task object                  |
| `/tasks`         | POST   | Create a new task              | `{ title, description, dueDate, status }`                 | Created Task object          |
| `/tasks/:id`     | PUT    | Update a task                  | `{ title?, description?, dueDate?, status? }`             | Updated Task object          |
| `/tasks/:id`     | DELETE | Delete a task                  | -                                                         | -                            |

### Task Object Structure

```typescript
{
  _id: string;           // Unique identifier
  title: string;         // Task title
  description: string;   // Task description
  dueDate: string;       // Due date in ISO format
  status: TaskStatus;    // 'To-Do', 'In Progress', or 'Done'
  createdAt: string;     // Creation timestamp
  updatedAt: string;     // Last update timestamp
}

enum TaskStatus {
  TODO = 'To-Do',
  IN_PROGRESS = 'In Progress',
  DONE = 'Done',
}
```
