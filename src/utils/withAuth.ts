import { NextRequest, NextResponse } from 'next/server';
import { getServerSession, Session } from 'next-auth';
import auth from '@/auth';

type Handler<T> = (req: NextRequest, session: Session, context: T) => Promise<NextResponse>;

export function withAuth<T>(handler: Handler<T>) {
  return async function withAuthHandler(req: NextRequest, context: T): Promise<NextResponse> {
    const session = await getServerSession(auth);

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return handler(req, session, context);
  };
}