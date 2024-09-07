import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import auth from "@/auth";


export async function GET() {
    const session = await getServerSession(auth);
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ message: 'This is protected data', user: session.user });
}