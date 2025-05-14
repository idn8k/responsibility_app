import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';

export async function requireAuth(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: `/api/auth/signin?callbackUrl=${context.resolvedUrl}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
