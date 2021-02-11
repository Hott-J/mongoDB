const addSum = (a,b) => {
    return new Promise((resolve,reject)=>{  // 성공시 resolve, 실패시 reject
        setTimeout(()=>{
            if(typeof a !=='number' || typeof b !=='number'){ 
                reject('a,b must be numers');
            }
            resolve(a+b);
        }, 3000);
    }) 
}

// addSum(10,20)
//     .then((sum)=>{
//         console.log({sum})
//         return addSum(sum,15)  
//     })
//     .then((sum)=>addSum(sum,1))
//     .then((sum)=>addSum(sum,2))
//     .then((sum)=>console.log({sum}))
//     .catch((error)=>console.log({error}))

const totalSum = async()=>{
    try{
        let sum = await addSum(10,10)
        let sum2 = await addSum(sum,10)
        console.log({sum,sum2})
    }catch(err){
        if(err) console.log({err})
    }
}

totalSum();