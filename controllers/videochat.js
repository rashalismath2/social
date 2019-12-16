
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

module.exports.videochatinitwithcons=function(req,res){
    console.log("3")
    var data={
        from:req.body.from,
        name:req.userFirstName+" "+req.userLastName,
        to:req.to
    }
       pusher.trigger('private-sdp-client-cons-'+req.body.to, 'video-chat-init-cons',data);
       res.status(200).json({
           message:"video init sent"
       });
}

module.exports.videochatinitwithuser=function(req,res){
    var data={
        from:req.body.from,
        name:req.userFirstName+" "+req.userLastName,
        to:req.to
    }
       pusher.trigger('private-sdp-client-user-'+req.body.to, 'video-chat-init-user',data);
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
module.exports.sendicecandidatetocons=function(req,res){
    var data={
        from:req.body.from,
        payload:req.body.payload
    }
       pusher.trigger('private-sdp-client-cons-'+req.body.to, 'get-ice-candidate-cons',data);
       res.status(200).json({
           message:"ice-candidate sent"
       });
}
module.exports.sendicecandidatetouser=function(req,res){
    var data={
        from:req.body.from,
        payload:req.body.payload
    }
       pusher.trigger('private-sdp-client-user-'+req.body.to, 'get-ice-candidate-user',data);
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
module.exports.videocallgotdisconnectedwithcons=function(req,res){
       pusher.trigger('private-cons-sdp-client-'+req.body.with, 'video-call-distrupted-cons',req.body.state);
       res.status(200).json({
           message:" video call distrupted sent"
       });
}
module.exports.videocallgotdisconnectedwithuser=function(req,res){
       pusher.trigger('private-user-sdp-client-'+req.body.with, 'video-call-distrupted-user',req.body.state);
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
module.exports.getinitofferfromuser=function(req,res){
    twillio.create.then(t=>{
        var data={
            requestFrom:req.body.requestFrom,
            name:req.userFirstName+" "+req.userLastName,
            ICE_SERVERS:t.iceServers
        }
        pusher.trigger('private-sdp-client-user-'+req.body.requestTo, 'get-init-offer-user',data);
        res.status(200).json({
            message:"init offer request init sent"
        });
    })
}
module.exports.getinitofferfromcons=function(req,res){
    twillio.create.then(t=>{
        var data={
            requestFrom:req.body.requestFrom,
            name:req.userFirstName+" "+req.userLastName,
            ICE_SERVERS:t.iceServers
        }
        pusher.trigger('private-sdp-client-cons-'+req.body.requestTo, 'get-init-offer-cons',data);
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

module.exports.sendinitofferforcons=function(req,res){  
    twillio.create.then(t=>{
        var data={
            offer:req.body.sdp,
            fromName:req.userFirstName+" "+req.userLastName,
            fromId:req.userId,
            ICE_SERVERS:t.iceServers
        }
      
        pusher.trigger('private-sdp-client-cons-'+req.body.sendTo, 'offer-sdp-cons',data);
        res.status(200).json({
            message:"sdp sent"
        });
    })
  
}
module.exports.sendinitofferforuser=function(req,res){  
    twillio.create.then(t=>{
        var data={
            offer:req.body.sdp,
            fromName:req.userFirstName+" "+req.userLastName,
            fromId:req.userId,
            ICE_SERVERS:t.iceServers
        }
      
        pusher.trigger('private-sdp-client-user-'+req.body.sendTo, 'offer-sdp-user',data);
        res.status(200).json({
            message:"sdp sent"
        });
    })
  
}
// module.exports.videochatinitwithcons=function(req,res){

//     twillio.create.then(t=>{
//         var data={
//             offer:req.body.sdp,
//             fromName:req.userFirstName+" "+req.userLastName,
//             fromId:req.userId,
//             ICE_SERVERS:t.iceServers
//         }
      
//         pusher.trigger('private-sdp-client-cons-'+req.body.sendTo, 'offer-sdp-cons',data);
//         res.status(200).json({
//             message:"sdp sent"
//         });
//     })
  
// }

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

module.exports.sendAnswerSDPForUser=function(req,res){
    var data={
        answerSDP:req.body.answerSDP,
        answerSDPFrom:req.body.answerSDPFrom
    }
       pusher.trigger('private-sdp-client-user-'+req.body.answerSDPTo, 'get-answer-sdp-user',data);
       res.status(200).json({
           message:"answer sdp has been sent"
       });
}
module.exports.sendAnswerSDPForCons=function(req,res){
    var data={
        answerSDP:req.body.answerSDP,
        answerSDPFrom:req.body.answerSDPFrom
    }
       pusher.trigger('private-sdp-client-cons-'+req.body.answerSDPTo, 'get-answer-sdp-cons',data);
       res.status(200).json({
           message:"answer sdp has been sent"
       });
}