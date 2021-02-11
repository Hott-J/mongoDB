console.log('start')

setTimeout(function(){
    console.log('Your meal is ready')
}
,3000); // 3000ms 이후에 function을 실행해라. 요리가 끝나는 상황

console.log('end')

// start -> end -> 3초뒤에 Your mead is ready 가 출력됨. 비동기적. 