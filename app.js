require("dotenv").config({ path: `${process.cwd()}/.env` });
const express = require("express");
const authRouter = require("./routes/authRoute");
const projectRouter = require("./routes/projectRoute");
const userRouter = require("./routes/userRoute");
const catchAsync = require("./utils/catchAsync");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "rest api working",
  });
});

//all routes will be here
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/users", userRouter);

app.use(
  "*",
  catchAsync(async (req, res, next) => {
    throw new AppError("This is error", 404);
  })
);

app.use(globalErrorHandler);
const PORT = process.env.APP_PORT || 4000;
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
