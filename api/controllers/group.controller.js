const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { formatClassParams } = require("../util/helpers");

module.exports.createGroup = async function (req, res) {
  const theClass = req.params.id;
  console.log(theClass);
  console.log("the classs");
  const { members, title } = req.body;

  try {
    //find class
    const newClass = await prisma.class.findUnique({
      where: {
        name: theClass,
      },
    });

    //Create new project
    const newProject = await prisma.project.create({
      data: {
        title: title,
        class: {
          connect: {
            id: newClass.id,
          },
        },
      },
    });

    const newGroup = await prisma.group.create({
      data: {
        project: {
          connect: {
            id: newProject.id,
          },
        },
      },
    });

    //Create new group
    const groupMembers = await members.map(async (member) => {
      console.log("member list");
      console.log(member);
      //create group members on group
      return await prisma.groupMembers.create({
        data: {
          memeberList: member.join(" "),
          group: {
            connect: {
              id: newGroup.id,
            },
          },
        },
      });
    });
    return res.status(201).json(groupMembers);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
module.exports.getGroups = async function (req, res) {
  const theClass = req.params.id;

  try {
    //find class
    const newClass = await prisma.class.findUnique({
      where: {
        name: theClass,
      },
    });

    const groups = await prisma.group.findMany({
      where: {
        project: {
          class: {
            id: newClass.id,
          },
        },
      },

      include: {
        project: true,
        Group_members: true,
      },
    });

    return res.status(201).json(groups);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
