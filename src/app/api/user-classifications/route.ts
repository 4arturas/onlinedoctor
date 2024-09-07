import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { withAuth } from "@/utils/withAuth";

const prisma = new PrismaClient();

function getHandler(): Promise<NextResponse> {
  return prisma.userClassification.findMany().then(classifications => NextResponse.json(classifications));
}

function postHandler(req: Request): Promise<NextResponse> {
  return req.json().then(async ({ type }) => {
    const newClassification = await prisma.userClassification.create({
      data: { type },
    });
    return NextResponse.json(newClassification, { status: 201 });
  });
}

export const GET = withAuth(getHandler);
export const POST = withAuth(postHandler);