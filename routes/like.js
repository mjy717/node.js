const express = require('express');
const router = express.Router();
const {exitsLike, addLike, deleteLike} = require('../models/like');

router.post('/setLike',async(req,res) =>{
    console.log('route:setLike',req.body);
    let {user_id,post_id} =req.body;
    try{
        const result =await exitsLike(post_id,user_id);
        console.log("exitsLike result:",result);
        if(result){
            await deleteLike(post_id,user_id);
            res.json({
                code:201,
                message:'取消点赞成功',
                data:result
            })
        }else{
            await addLike(post_id,user_id);
            res.json({
                code:200,
                message:'点赞成功',
                data:result
            })
        }
    }catch(error){
        res.json({
            code:500,
            message:'点赞失败',
            data:error
        })
    }
})

module.exports = router;