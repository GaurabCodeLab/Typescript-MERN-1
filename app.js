const express = require("express");
const dbConnect = require("./config/database");
const { userRouter } = require("./routes/userRouter");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", userRouter);

dbConnect()
  .then(() => {
    console.log("Database Connected");
    app.listen(8080, () => {
      console.log("Server is running on port 8080");
    });
  })
  .catch((error) => {
    console.log("Error in connecting Database :" + error);
  });
