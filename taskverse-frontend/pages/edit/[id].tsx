import { useRouter } from 'next/router';
import Head from 'next/head';
import TaskForm from '../../components/TaskForm';

export default function EditTask() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="container mx-auto px-4 max-w-2xl my-4">
      <Head>
        <title>Edit Task - TaskVerse</title>
      </Head>
      {id ? (
        <TaskForm taskId={id as string} isEditMode={true} />
      ) : (
        <div className="text-center py-8">Loading...</div>
      )}
    </div>
  );
}