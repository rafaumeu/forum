import { PrismaClient } from '@prisma/client'

export class PrismaService extends PrismaClient {}

export const prisma = new PrismaService()
