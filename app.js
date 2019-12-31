//packages
const dotenv = require("dotenv");
const express = require("express");
var morgan = require("morgan");
const sequelize = require("./db/db_connection");
const bodyParser = require("body-parser");
const cors = require("./Middlewares/cors");

const auth=require("./Middlewares/jwt");


//Models
// const User = require("./models/User").User;

//Routes
const routeUser=require("./routes/user");
const routeAuth=require("./routes/auth");
const routeMessage=require("./routes/message");
const routeVideoChat=require("./routes/videochat");
const routeFriends=require("./routes/friends");
const routeconsdmmessages=require("./routes/consdmmessages");
const routePusher=require("./routes/pusher");
const routeConsultant=require("./routes/consultant");
const routeConsQuestions=require("./routes/consquestions");
const routePayments=require("./routes/payment");

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


//TODO - route protection for differnt user levels

//Routes
app.use("/auth",routeAuth);
app.use("/user",auth,routeUser);
app.use("/messages",auth,routeMessage);
app.use("/videochat",auth,routeVideoChat);
app.use("/friends",auth,routeFriends);
app.use("/pusher",auth,routePusher);
app.use("/consmessages",auth,routeconsdmmessages);
app.use("/consultants",auth,routeConsultant);
app.use("/consultants/start",auth,routeConsQuestions);
app.use("/payments",auth,routePayments);



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
