const express = require('express'); // express 모듈 사용
const app = express();
const {userRouter} = require('./routes/userRoute')
const mongoose = require('mongoose');


const MONGO_URL = 'mongodb+srv://admin:x8Owcr5hfM8Rm9fL@mongodbtutorial.g9m59.mongodb.net/BlogService?retryWrites=true&w=majority'

const server = async()=>{
    try{
        await mongoose.connect(MONGO_URL,{useNewUrlParser : true, useUnifiedTopology:true,useCreateIndex:true, useFindAndModify:false});
        mongoose.set('debug',true) // 쿼리들을 볼 수 있다.
        console.log('MongoDB connected'); // 먼저 연결되고 아랫부분 실행된다.
        
        app.use(express.json()) // JSON.parse 로 JSON을 js가 사용할 수 있게끔 가져온다.

        app.use('/user',userRouter); // endPoint가 user로 시작하면 useRouter로 연결

        app.listen(3000,()=>{
            console.log('server listening on port 3000');
        })
    } catch(err){
        console.log(err)
    }

}

server()