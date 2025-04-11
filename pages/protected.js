import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin?callbackUrl=/protected',
        permanent: false,
      },
    };
  }

  console.log('********************');
  console.log('SESSION:', session);
  console.log('********************');

  return {
    props: {
      session,
    },
  };
}

export default function ProtectedPage({ session }) {
  return (
    <div>
      <h1>Protected Page</h1>
      <p>You can only see this if you're signed in.</p>
      <p>Welcome, {session}!</p>
    </div>
  );
}
