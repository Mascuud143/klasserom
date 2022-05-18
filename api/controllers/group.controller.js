const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { formatClassParams } = require("../util/helpers");

module.exports.createGroup = async function (req, res) {
  console.log(req.user);

  //   try {
  //     const newClass = await prisma.class.findUnique({
  //       where: {
  //         name: theClass,
  //       },
  //       include: {
  //         Students: true,
  //       },
  //     });
  //     return res.status(201).json(newClass);
  //   } catch (error) {
  //     return res.status(400).json(error.message);
  //   }
};
