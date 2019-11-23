
const pusher=require("../Middlewares/pusher").pusher;
const twillio=require("../Middlewares/twillio");



module.exports.videochatinit=function(req,res){
    var data={
        from:req.body.from,
        name:req.userFirstName+" "+req.userLastName,
        to:req.to
    }
       pusher.trigger('sdp-client-'+req.body.to, 'video-chat-init',data);
       res.status(200).json({
           message:"video init sent"
       });
}
module.exports.sendicecandidate=function(req,res){
    var data={
        from:req.body.from,
        payload:req.body.payload
    }
       pusher.trigger('sdp-client-'+req.body.to, 'get-ice-candidate',data);
       res.status(200).json({
           message:"ice-candidate sent"
       });
}

module.exports.videocallgotdisconnected=function(req,res){
       pusher.trigger('sdp-client-'+req.body.with, 'video-call-distrupted',req.body.state);
       res.status(200).json({
           message:" video call distrupted sent"
       });
}
module.exports.getinitoffer=function(req,res){
 
    twillio.create.then(t=>{
        var data={
            requestFrom:req.body.requestFrom,
            name:req.userFirstName+" "+req.userLastName,
            ICE_SERVERS:t.iceServers
        }
    
        pusher.trigger('sdp-client-'+req.body.requestTo, 'get-init-offer',data);
        res.status(200).json({
            message:"init offer request init sent"
        });
    })

}

module.exports.sendinitoffer=function(req,res){

    twillio.create.then(t=>{
        var data={
            offer:req.body.sdp,
            fromName:req.userFirstName+" "+req.userLastName,
            fromId:req.userId,
            ICE_SERVERS:t.iceServers
        }
      
        pusher.trigger('sdp-client-'+req.body.sendTo, 'offer-sdp',data);
        res.status(200).json({
            message:"sdp sent"
        });
    })
  
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

module.exports.sendAnswerSDP=function(req,res){

    var data={
        answerSDP:req.body.answerSDP,
        answerSDPFrom:req.body.answerSDPFrom
    }
       pusher.trigger('sdp-client-'+req.body.answerSDPTo, 'get-answer-sdp',data);
       res.status(200).json({
           message:"answer sdp has been sent"
       });
}