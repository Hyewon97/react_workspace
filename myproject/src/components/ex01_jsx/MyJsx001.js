/*
리액트 17이전 버전에서는 JSX 구문이 있는 파일은 반드시  import React from "react"; 문을 사용해야 한다.
그러마 17 이후 버전부터는 JSX구문이 있어도 import React from 'react'개 상략 가능하다.
*/
//function MyJsx001(){

//}

const MyJsx001 = () => {
  return (
    <div>
      <div>Hello</div>
      <div>React</div>
    </div>
  );
};

// MyJsx001을 외부에서 사용하게 위해서 export를 해야한다.
// 파일? 함수가 하나인 경우에 default를 사용한다.
export default MyJsx001;
