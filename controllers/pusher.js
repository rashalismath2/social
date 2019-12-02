
const pusher=require("../Middlewares/pusher").pusher;


module.exports.auth=(req,res)=>{
    var socketId = req.body.socket_id;
    var channel = req.body.channel_name;

    var presenceData = {
        user_id: req.userId,
        user_info: {
          name: req.userFirstName+" "+req.userLastName,
          email:req.email
        }
      };
      var auth = pusher.authenticate(socketId, channel, presenceData);
      res.send(auth);

}
