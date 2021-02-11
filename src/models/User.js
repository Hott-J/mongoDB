const mongose = require('mongoose');

const UserSchema = new mongose.Schema({ // 두번째 인자는 옵션. timestamp로 언제 만들었는지 알려줌
    username : {type : String, required: true, unique:true},
    name : {
        first:{type:String, required: true},
        last: {type:String, required: true}
    },
    age:Number,
    email:String
}, {timestamps: true})

const User = mongose.model('user',UserSchema) // 몽구스에 알려줌
module.exports={User} // 외부에 가져다가 쓸거다.