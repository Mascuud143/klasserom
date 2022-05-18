const express = require("express");
const userRouter = require("./routes/user.router");
const classesRouter = require("./routes/classes.router");
const groupsRouter = require("./routes/group.router");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 8080;

//middleware
app.use(express.json());
app.use(cors());

app.use("/api/v1/", userRouter);
app.use("/api/v1/classes", classesRouter);
app.use("/api/v1/groups", groupsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
