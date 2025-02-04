// prisma/seed.js

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('1234', 10);
  
  const user = await prisma.user.create({
    data: {
      email: 'moises@example.com',
      name:  'Moises Alejando',
      lastname:  'Gonzales',
      password: hashedPassword,
    },
  });

  console.log('Usuario creado:', user);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });