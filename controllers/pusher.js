
const pusher=require("../Middlewares/pusher").pusher;


module.exports.auth=(req,res)=>{
    var socketId = req.body.socket_id;
    var channel = req.body.channel_name;
    var auth = pusher.authenticate(socketId, channel);
    res.send(auth);
}
