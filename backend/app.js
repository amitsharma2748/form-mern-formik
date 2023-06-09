const express = require("express");
const cors = require("cors");

const router = require("./routes/formRoutes");
const connectDatabase = require("./services/database");
const app = express();
app.use(cors());
app.use(express.json());

connectDatabase();

app.listen(8000, () => {
  console.log("server started at server 8000");
});
app.use(router);
