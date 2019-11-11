//packages
const dotenv = require("dotenv");
const express = require("express");
var morgan = require("morgan");
const sequelize = require("./db/db_connection");
const bodyParser = require("body-parser");
const cors = require("./Middlewares/cors");


//Models
// const User = require("./models/User").User;

//Routes
const routeUser=require("./routes/user");

dotenv.config();

const app = express();

//////Middlewares

//Cors
cors.cors(app);

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Logging requests to the logs
const accessLogStream = require("./Middlewares/morgan").accessLogStream;
app.use(morgan("combined", { stream: accessLogStream }));

//Routes
app.use("/user",routeUser);



//Error handling
app.use((req, res, next) => {
  const error = new Error("route not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message || "internal error"
  });
});


//express start
app.listen(process.env.EXPRESS_PORT, () => {
  console.log(
    "Express server has been started on port " + process.env.EXPRESS_PORT
  );
});
//db start
sequelize.connect();
