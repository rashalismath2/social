
const pusher=require("../Middlewares/pusher").pusher;

module.exports.initoffer=function(req,res){
    var data={
        offer:req.body.sdp,
        fromName:req.userFirstName+" "+req.userLastName,
        fromId:req.userId
    }
       pusher.trigger('sdp-client-'+req.body.sendTo, 'offer-sdp',data);
       res.status(200).json({
           message:"sdp sent"
       });
}

module.exports.declinedinitoffer=function(req,res){
    var data={
        fromName:req.body.declinedBy,
        fromId:req.userId
    }
       pusher.trigger('sdp-client-'+req.body.declinedTo, 'declined-offer',data);
       res.status(200).json({
           message:"declined message sent"
       });
}