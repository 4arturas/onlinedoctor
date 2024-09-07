import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';
import { Session } from "next-auth";
import { withAuth } from '@/utils/withAuth';

const prisma = new PrismaClient();

function getHandler(req: NextRequest, session: Session, { params }: { params: { id: string } }): Promise<NextResponse> {
  const { id } = params;

  return prisma.user.findUnique({
    where: { id: Number(id) },
    include: {
      classification: true, // Include classification if needed
      images: true, // Include images if needed
    },
  }).then(user => {
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  });
}

function putHandler(req: NextRequest, session: Session, { params }: { params: { id: string } }): Promise<NextResponse> {
  const { id } = params;

  return req.json().then(async ({ classificationId, email, lastname, name }) => {
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        classificationId,
        email,
        lastname,
        name,
      },
    });

    return NextResponse.json(updatedUser);
  });
}

function deleteHandler(req: NextRequest, session: Session, { params }: { params: { id: string } }): Promise<NextResponse> {
  const { id } = params;

  return prisma.user.delete({
    where: { id: Number(id) },
  }).then(() => NextResponse.json(null, { status: 204 }));
}

export const GET = withAuth(getHandler);
export const PUT = withAuth(putHandler);
export const DELETE = withAuth(deleteHandler);