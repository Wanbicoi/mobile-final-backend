import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import jsonFood from './foods';
async function main() {
  // Seed foods
  await prisma.food.createMany({
    data: jsonFood.map((item) => ({
      title: item.name,
      nutrition_fact: item.nutrition_fact,
      ingredients: item.ingredients,
      authorId: 1,
      recipe: item.recipe,
      images: item.images,
      body: 'When you need more functionality, like requesting your own photos, or photos taken at a particular location, go pro!',
    })),
  });
  console.log('Seed data inserted successfully');
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
