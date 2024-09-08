import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { withAuth } from '@/utils/withAuth';

const prisma = new PrismaClient();

function getHandler(): Promise<NextResponse> {
  return prisma.assignment.findMany({
    include: {
      patient: true,
      doctor: true,
      AssignmentComments: true,
      relations: true, // Include related images if needed
    },
  }).then(assignments => NextResponse.json(assignments));
}

function postHandler(req: Request): Promise<NextResponse> {
  return req.json().then(async ({ patientId, doctorId }) => {
    const newAssignment = await prisma.assignment.create({
      data: {
        patientId,
        doctorId,
      },
    });
    return NextResponse.json(newAssignment, { status: 201 });
  });
}

export const GET = withAuth(getHandler);
export const POST = withAuth(postHandler);