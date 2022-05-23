const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { formatClassParams } = require("../util/helpers");

module.exports.getStudents = async function (req, res) {
  //gets class id from params
  const theClass = req.params.id;

  try {
    const newClass = await prisma.class.findUnique({
      where: {
        name: theClass,
      },
      include: {
        Students: true,
      },
    });
    return res.status(201).json(newClass);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
//join class based on klassekode
module.exports.join = async function (req, res) {
  const { code } = req.body;

  try {
    const newClass = await prisma.class.findUnique({
      where: {
        klasseKode: code,
      },
      include: {
        Students: true,
      },
    });
    return res.status(201).json(newClass);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

//add students to existing class
module.exports.createStudent = async function (req, res) {
  const { name } = req.body;

  const theClass = req.params.id;
  console.log(theClass);
  console.log(theClass);

  try {
    const newStudent = await prisma.student.create({
      data: {
        name: name,
        class: {
          connect: {
            name: theClass,
          },
        },
      },
    });
    return res.status(201).json(newStudent);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
module.exports.deleteStudent = async function (req, res) {
  const { name } = req.body;
  const userId = req.user.id;

  const theClass = req.params.id;
  console.log(name);
  try {
    const newClass = await prisma.class.findUnique({
      where: {
        name: theClass,
      },
    });
    console.log("-------");
    console.log(newClass);
    const studentToDelete = await prisma.student.findMany({
      where: {
        name: name,
        class: {
          connect: {
            name: theClass,
          },
        },
      },
    });

    console.log(studentToDelete);

    // const deletedStudent = await prisma.student.delete({
    //   data: {
    //     name: name,
    //     class: {
    //       connect: {
    //         name: theClass,
    //       },
    //     },
    //   },
    // });
    return res.status(201).json(studentToDelete);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
