import Head from 'next/head';
import TaskForm from '../components/TaskForm';

export default function CreateTask() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Head>
        <title>Create New Task - TaskVerse</title>
      </Head>
      <TaskForm />
    </div>
  );
}