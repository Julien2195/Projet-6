const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
mongoose.set("strictQuery", true);
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connection reussi !"))
  .catch(() => console.log("Connection échouée !"));
