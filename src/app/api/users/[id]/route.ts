import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';
import { Session } from "next-auth";
import { withAuth } from '@/utils/withAuth';
import bcrypt from 'bcryptjs'; // Import bcryptjs

const prisma = new PrismaClient();

async function getHandler(req: NextRequest, session: Session, { params }: { params: { id: string } }): Promise<NextResponse> {
  const { id } = params;

  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
    include: {
      classification: true, // Include classification if needed
      images: true, // Include images if needed
    },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Exclude password from the response
  const { password, ...userWithoutPassword } = user;
  return NextResponse.json(userWithoutPassword);
}

async function putHandler(req: NextRequest, session: Session, { params }: { params: { id: string } }): Promise<NextResponse> {
  const { id } = params;

  return req.json().then(async ({ classificationId, email, lastname, name, password }) => {
    const dataToUpdate: any = {
      classificationId,
      email,
      lastname,
      name,
    };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      dataToUpdate.password = hashedPassword;
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: dataToUpdate,
    });

    // Exclude password from the updated response
    const { password: _, ...updatedUserWithoutPassword } = updatedUser;
    return NextResponse.json(updatedUserWithoutPassword);
  });
}

async function deleteHandler(req: NextRequest, session: Session, { params }: { params: { id: string } }): Promise<NextResponse> {
  const { id } = params;

  await prisma.user.delete({
    where: { id: Number(id) },
  });
  return NextResponse.json(null, { status: 204 });
}

export const GET = withAuth(getHandler);
export const PUT = withAuth(putHandler);
export const DELETE = withAuth(deleteHandler);