import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type Category = { name: string; foods: string[] };

const Categories: Category[] = [
  {
    name: 'Appetizers',
    foods: ['93', '94', '96', '106', '108', '112', '116', '123', '128', '132'],
  },
  {
    name: 'Breakfast',
    foods: [
      '99',
      '100',
      '107',
      '118',
      '132',
      '148',
      '147',
      '152',
      '157',
      '175',
    ],
  },
  {
    name: 'Desserts',
    foods: ['92', '96', '102', '104', '108', '122', '134', '138', '148', '158'],
  },
  {
    name: 'Main Courses',
    foods: ['93', '94', '107', '114', '115', '119', '130', '151', '152', '168'],
  },
  {
    name: 'Salads',
    foods: [
      '95',
      '101',
      '103',
      '124',
      '127',
      '133',
      '143',
      '163',
      '165',
      '169',
    ],
  },
  {
    name: 'Seafood',
    foods: [
      '114',
      '115',
      '130',
      '136',
      '137',
      '142',
      '144',
      '162',
      '164',
      '174',
    ],
  },
  {
    name: 'Snacks',
    foods: ['92', '96', '107', '108', '122', '123', '127', '128', '133', '140'],
  },
  {
    name: 'Soups',
    foods: [
      '107',
      '117',
      '130',
      '131',
      '136',
      '147',
      '154',
      '158',
      '161',
      '173',
    ],
  },
  {
    name: 'Sweets',
    foods: [
      '92',
      '102',
      '104',
      '108',
      '122',
      '134',
      '138',
      '148',
      '158',
      '173',
    ],
  },
  {
    name: 'World Cuisine',
    foods: [
      '97',
      '112',
      '114',
      '115',
      '121',
      '125',
      '129',
      '147',
      '150',
      '170',
    ],
  },
];
async function main() {
  // Seed foods
  await Promise.all(
    Categories.map(async (key) => {
      try {
        await prisma.category.create({
          data: {
            name: key.name,
            food: {
              connect: key.foods.map((food) => ({ id: parseInt(food) })),
            },
          },
        });
      } catch (error) {}
    }),
  );
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
