const { PrismaClient } = require("@prisma/client");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

module.exports.register = async function (req, res) {
  const { username, password, confirmPassword, type } = req.body;
  console.log(type);
  //sjekk for tomt input
  if (!username || !password || !confirmPassword) {
    return res.status(400).json("All inputs are required");
  }

  //sjekk for passord og confirmPassword er samme
  if (password !== confirmPassword) {
    return res.status(400).json("Passwords do not match");
  }

  //Hash password
  const salt = await bycrypt.genSalt(10);
  const hash = await bycrypt.hash(password, salt);

  try {
    //lagre i databasen
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hash,
        type,
      },
      exclude: {
        password: true,
      },
    });
    console.log(newUser);
    res.send(newUser);
  } catch (erorr) {
    res.send(erorr.message);
  }
};

//login
module.exports.login = async function (req, res) {
  console.log(req.body);
  const { username, password } = req.body;
  console.log(username, password);
  //sjekk for tomt input
  if (!username || !password) {
    return res.status(400).json("All inputs are required");
  }
  try {
    //finn bruker
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    //sjekk om bruker finnes
    if (!user) {
      return res.status(400).json("User does not exist");
    }

    //sjekk om passord stemmer
    if (!(await bycrypt.compare(password, user.password))) {
      return res.status(400).json("Incorrect username or password");
    }

    //tildel token
    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "10s",
    });

    return res.json({ token });
  } catch (error) {
    res.send(error.message);
  }
};

module.exports.register = async function (req, res) {
  const { username, password, confirmPassword, type } = req.body;

  //sjekk for tomt input
  if (!username || !password || !confirmPassword) {
    return res.status(400).json("All inputs are required");
  }

  //sjekk for passord og confirmPassword er samme
  if (password !== confirmPassword) {
    return res.status(400).json("Passwords do not match");
  }

  //Hash password
  const salt = await bycrypt.genSalt(10);
  const hash = await bycrypt.hash(password, salt);

  try {
    //lagre i databasen
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hash,
        type,
      },
    });

    res.send(newUser);
  } catch (erorr) {
    res.send(erorr.message);
  }
};

module.exports.me = async function (req, res) {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.send(error.message);
  }
};
