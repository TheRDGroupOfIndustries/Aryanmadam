const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const cats = await prisma.product.findMany({
      select: { category: true },
      distinct: ['category']
    });
    console.log(JSON.stringify(cats, null, 2));
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
