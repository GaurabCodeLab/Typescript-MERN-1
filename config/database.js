const mongoose = require("mongoose");

const dbConnect = async () => {
  await mongoose.connect(
    "mongodb+srv://Gaurab1634:Raja1634@cluster0.atpacqj.mongodb.net/capgemini?retryWrites=true&w=majority&appName=Cluster0"
  );
};

module.exports = dbConnect;
