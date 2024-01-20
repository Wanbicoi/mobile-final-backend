import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  // await Promise.all([
  //   prisma.category.create({ data: { name: 'Vegetarian' } }),
  //   prisma.category.create({ data: { name: 'Vegan' } }),
  //   prisma.category.create({ data: { name: 'Dessert' } }),
  //   // Add more categories as needed
  // ]);

  // Seed users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        uid: ';lkasjdfa;kj',
        name: 'John Doe',
        bio: 'A food lover',
        imageUrl: 'john_image_url',
      },
    }),
    prisma.user.create({
      data: {
        uid: 'asldkfj',
        name: 'Jane Doe',
        bio: 'An adventurous eater',
        imageUrl: 'jane_image_url',
      },
    }),
    // Add more users as needed
  ]);

  // Seed foods
  const foods = await Promise.all([
    prisma.food.create({
      data: {
        title: 'Delicious Dish',
        body: 'This is a tasty dish!',
        images: [
          'https://loremflickr.com/320/240/food',
          'https://loremflickr.com/320/240/food',
          'https://loremflickr.com/320/240/food',
        ],
        authorId: users[0].id,
      },
    }),
    prisma.food.create({
      data: {
        title: 'Vegan Delight',
        body: 'Amazing vegan recipe!',
        images: [
          'https://loremflickr.com/320/240/food',
          'https://loremflickr.com/320/240/food',
          'https://loremflickr.com/320/240/food',
        ],

        authorId: users[1].id,
      },
    }),
    // Add more foods as needed
  ]);

  // Seed comments
  await Promise.all([
    prisma.comment.create({
      data: { body: 'Great dish!', authorId: users[1].id, foodId: foods[0].id },
    }),
    prisma.comment.create({
      data: { body: 'Excellent!', authorId: users[1].id, foodId: foods[0].id },
    }),
    prisma.comment.create({
      data: { body: 'Yummy!', authorId: users[0].id, foodId: foods[1].id },
    }),
    // Add more comments as needed
  ]);

  await Promise.all([
    prisma.foodList.create({
      data: {
        title: 'Popular foods',
        description: 'Popular foods',
        foods: { connect: [{ id: 1 }, { id: 2 }] },
      },
    }),
    prisma.foodList.create({
      data: {
        title: 'Most views foods',
        description: 'Most views foods',
        foods: { connect: [{ id: 1 }, { id: 2 }] },
      },
    }),
  ]);

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
