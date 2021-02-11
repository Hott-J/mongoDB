// 숫자를 더했을때 실행되는 함수가 콜백.

const { addListener } = require("process");

const addSum = (a,b,callback)=>{ // '=>' 은 앞에 function이 생략됬다는 뜻
    setTimeout(()=>{
        if(typeof a !=='number' || typeof b !=='number') return callback('a,b must be numbers');
        callback(undefined,a+b) // 결과값 리턴
    },3000);
}

let callback = (error,sum)=>{
    if(error) console.log({error});
    console.log({sum})
}

addSum(10,20,(error,sum)=>{
    if(error) return console.log({error});
    console.log({sum})
    addSum(sum,15,(error,sum)=>{
        if(error) return console.log({error});
        console.log({sum})
    })
})

addSum(10,'hi',callback)