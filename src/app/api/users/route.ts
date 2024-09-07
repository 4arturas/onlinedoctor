import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { withAuth } from '@/utils/withAuth';

const prisma = new PrismaClient();

function getHandler(): Promise<NextResponse> {
  return prisma.user.findMany({
    include: {
      classification: true,
      images: true,
    },
  }).then(users => NextResponse.json(users));
}

function postHandler(req: Request): Promise<NextResponse> {
  return req.json().then(async ({ classificationId, email, lastname, name }) => {
    const newUser = await prisma.user.create({
      data: {
        classificationId,
        email,
        lastname,
        name,
      },
    });
    return NextResponse.json(newUser, { status: 201 });
  });
}

export const GET = withAuth(getHandler);
export const POST = withAuth(postHandler);