const {Router} = require('express')
const userRouter = Router();
const {User}=require('../models/User')
const mongoose = require('mongoose');

userRouter.get('/',async(req,res)=>{ // req 에는 클라이언트의 정보가 모두 담김
    try{
        const users = await User.find({});
        return res.send({users})
    } catch(err){
        console.log(err)
        return res.status(500).send({err: err.message});
    }
})

userRouter.get('/:userId', async(req,res)=>{ // :userId 하면 이를 변수로 받음. 
    try{
        const {userId} = req.params;
        if(!mongoose.isValidObjectId(userId))return res.status(400).send({err:"invalid userId"})
        const user = await User.findOne({_id:userId});
        return res.send({user});
    }catch(err){
        console.log(err)
        return res.status(500).send({err: err.message});
    }
})

userRouter.post('/',async (req,res)=>{
    try{
        let {username, name} = req.body;
        // 아래 두개는 위와 똑같다.
        // let username=req.body.username; 
        // let name=req.body.name;
        if (!username) return res.status(400).send({err:"username is required"});
        if (!name || !name.first || !name.last) return res.status(400).send({err:"Both first and last names are required"})
        const user = new User(req.body); // User안에 user의 key,value를 넣어주면 된다. 근데 req 형태가 User와 형태가 똑같다고 가정한다.
        await user.save(); // user를 저장. User에서 디비에 저장되는 건 await로 해야한다.
        return res.send({user})
    }catch(err){
        console.log(err)
        return res.status(500).send({err: err.message});
    }
})

userRouter.delete('/:userId',async(req,res)=>{
    try{
        const {userId} = req.params;
        if(!mongoose.isValidObjectId(userId))return res.status(400).send({err:"invalid userId"})
        const user = await User.findOneAndDelete({_id:userId}); // 찾고 삭제. 이렇게 하면 유저를 받을 수 있다.
        return res.send({user});
    }catch(err){
        console.log(err)
        return res.status(500).send({err: err.message});
    }
})

userRouter.put('/:userId',async(req,res)=>{
    try{
        const {userId} = req.params;
        if(!mongoose.isValidObjectId(userId))return res.status(400).send({err:"invalid userId"})
        const {age,name}=req.body;
        if (!age && !name) return res.status(400).send({err:"age or name is required"});
        if( age && typeof age!='number') return res.status(400).send({err:"age must be a number"})
        if(name && typeof name.first!=='string' && typeof name.last!=='string') return res.status(400).send({err:"first and last name are strings"})
        // let updateBody={}; // age 나 name이 null이 되는 걸 방지. 만약 requestBody에 age나 name 이 없을 경우 이 부분이 없으면 null로 저장됨!!!
        // if(age) updateBody.age=age;
        // if(name) updateBody.name=name;
        
        // const user = await User.findByIdAndUpdate(userId,updateBody,{new:true}) // 첫번째 필터조건, 두번째가 뭘 바꿀지 키:값, 세번째가 업데이트가 된 거 리턴
        let user = await User.findById(userId);
        console.log({userBeforeEdit:user})
        if(age)user.age = age;
        if(name)user.name=name;
        await user.save();
        console.log({userAfterEdit:user})

        return res.send({user})
    }catch(err){
        console.log(err)
        return res.status(500).send({err: err.message});
    }
})

module.exports = {
    userRouter
}