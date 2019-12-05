const express=require('express');
const router=express.Router();
const friendsController=require("../controllers/friends");

router.get("/",friendsController.getAllFriends)
router.post("/sendfriendrequest",friendsController.sendFriendRequest)
router.post("/cancelfriendrequest",friendsController.cancelFriendRequest)
router.get("/pendingfriendrequests",friendsController.pendingFriendRequests)
router.put("/acceptfriendrequest",friendsController.acceptFriendRequest)
router.put("/declinependingfriendrequest",friendsController.declinePendingFriendRequest)




module.exports=router;
