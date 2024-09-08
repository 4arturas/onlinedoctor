import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';
import { Session } from "next-auth";
import { withAuth } from '@/utils/withAuth';

const prisma = new PrismaClient();

function getHandler(req: NextRequest, session: Session, { params }: { params: { id: string } }): Promise<NextResponse> {
  const { id } = params;

  return prisma.assignment.findUnique({
    where: { id: Number(id) },
    include: {
      patient: true,
      doctor: true,
      AssignmentComments: true,
      relations: true, // Include related images if needed
    },
  }).then(assignment => {
    if (!assignment) {
      return NextResponse.json({ error: 'Assignment not found' }, { status: 404 });
    }

    return NextResponse.json(assignment);
  });
}

function putHandler(req: NextRequest, session: Session, { params }: { params: { id: string } }): Promise<NextResponse> {
  const { id } = params;

  return req.json().then(async ({ doctorId, patientId }) => {
    const updatedAssignment = await prisma.assignment.update({
      where: { id: Number(id) },
      data: {
        patientId,
        doctorId,
      },
    });

    return NextResponse.json(updatedAssignment);
  });
}

function deleteHandler(req: NextRequest, session: Session, { params }: { params: { id: string } }): Promise<NextResponse> {
  const { id } = params;

  return prisma.assignment.delete({
    where: { id: Number(id) },
  }).then(() => NextResponse.json(null, { status: 204 }));
}

export const GET = withAuth(getHandler);
export const PUT = withAuth(putHandler);
export const DELETE = withAuth(deleteHandler);