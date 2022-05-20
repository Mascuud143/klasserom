const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bycrypt = require("bcryptjs");

const { formatClassParams } = require("../util/helpers");

//Create class
module.exports.createClass = async function (req, res) {
  //creates random klassekode
  function generateRandomString(length) {
    let randomString = "";
    const possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let i = 0; i < length; i++) {
      randomString += possible.charAt(
        Math.floor(Math.random() * possible.length)
      );
    }

    return randomString;
  }

  function generateKlassekode() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  const classCode = generateKlassekode();

  //checks for existing classkode
  const classCodeExists = await prisma.class.find({
    where: {
      klasseKode: classCode,
    },
  });

  if (classCodeExists) {
    res.status(400).json({
      message: "Klassekode er allerede i bruk",
    });
    return;
  }

  const userId = req.user.id;
  console.log(userId);
  try {
    const { name, school, room } = req.body;

    const newClass = await prisma.class.create({
      data: {
        name,
        room,
        school,
        klasseKode: classCode,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return res.status(201).json(newClass);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
module.exports.getClass = async function (req, res) {
  const theClass = req.params.id;

  try {
    const newClass = await prisma.class.findUnique({
      where: {
        name: theClass,
      },
    });
    return res.status(201).json(newClass);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports.getClasses = async function (req, res) {
  const userId = req.user.id;

  try {
    const classes = await prisma.class.findMany({
      where: {
        userId,
      },
      include: {
        Students: true,
      },
    });
    if (!classes) {
      return res.status(404).json("No classes found");
    }

    return res.status(201).json(classes);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports.getClass = async function (req, res) {
  const theClass = req.params.id;
  console.log(theClass);

  try {
    const newClass = await prisma.class.findUnique({
      where: {
        name: theClass,
      },
    });
    return res.status(201).json(newClass);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports.generateKlassekode = async function (req, res) {
  const theClass = formatClassParams(req.params.id);
  console.log(theClass);

  try {
    const newClass = await prisma.class.findUnique({
      where: {
        name: theClass,
      },
    });

    //function that generate a random klassekode
    function generateKlassekode() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
      for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
    }

    const code = generateKlassekode();
    const newKlassekode = await prisma.class.update({
      where: {
        id: newClass.id,
      },
      data: {
        klasseKode: code,
      },
    });

    return res.status(201).json({ klasseKode: code });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
