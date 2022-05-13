const { PrismaClient } = require("@prisma/client");
const { categories, products } = require("./data.js");
const prisma = new PrismaClient();

//Runs at the start of database creation
// initializes admin user and populates database with data

const load = async () => {
  try {
    await prisma.user.create({
      data: {
        username: "admin",
        password: "admin",
        type: "admin",
      },
    });
    console.log("Initialized admin user");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
