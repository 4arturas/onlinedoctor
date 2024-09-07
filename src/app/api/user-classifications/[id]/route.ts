import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { Session } from 'next-auth';
import { withAuth } from '@/utils/withAuth';

const prisma = new PrismaClient();

function getHandler(req: NextRequest, session: Session, { params }: { params: { id: string } }): Promise<NextResponse> {
    const { id } = params;

    return prisma.userClassification.findUnique({
        where: { id: Number(id) },
    }).then(classification => {
        if (!classification) {
            return NextResponse.json({ error: 'User classification not found' }, { status: 404 });
        }

        return NextResponse.json(classification);
    });
}

function putHandler(req: NextRequest, session: Session, { params }: { params: { id: string } }): Promise<NextResponse> {
    const { id } = params;

    return req.json().then(async ({ type }) => {
        const updatedClassification = await prisma.userClassification.update({
            where: { id: Number(id) },
            data: { type },
        });

        return NextResponse.json(updatedClassification);
    });
}

function deleteHandler(req: NextRequest, session: Session, { params }: { params: { id: string } }): Promise<NextResponse> {
    const { id } = params;

    return prisma.userClassification.delete({
        where: { id: Number(id) },
    }).then(() => NextResponse.json(null, { status: 204 }));
}

export const GET = withAuth(getHandler);
export const PUT = withAuth(putHandler);
export const DELETE = withAuth(deleteHandler);