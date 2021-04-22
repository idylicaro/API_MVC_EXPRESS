  
import { PrismaClient } from "@prisma/client";

const globalAny:any = global;

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more: 
// https://pris.ly/d/help/next-js-best-practices

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!globalAny.prisma) {
    globalAny.prisma = new PrismaClient()
  }
  prisma = globalAny.prisma
}
export default prisma