const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bycrypt = require("bcryptjs");

const salt = bycrypt.genSaltSync(10);
const hash = bycrypt.hashSync("admin", salt);

//Runs at the start of database creation
// initializes admin user and populates database with data

const load = async () => {
  try {
    await prisma.user.create({
      data: {
        username: "admin",
        password: hash,
        type: "ADMIN",
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
