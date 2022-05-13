const { PrismaClient } = require("@prisma/client");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const prisma = new PrismaClient();

module.exports.protect = async function (req, res, next) {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json("Unauthorized");
  }
  try {
    token = token.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
      if (err) {
        return res.status(401).json("Unauthorized");
      }
      const user = await prisma.user.findUnique({
        where: {
          id: decoded.id,
        },

        select: {
          id: true,
          username: true,
          type: true,
        },
      });
      if (!user) {
        return res.status(401).json("Unauthorized");
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports.restrictTo = (...roles) => {
  return function (req, res, next) {
    console.log(roles);
    console.log(req.user);
    if (!roles.includes(req.user.type)) {
      return res.status(403).json({
        status: "fail",
        message: "You dont have permisions to perform this action",
      });
    }

    next();
  };
};
