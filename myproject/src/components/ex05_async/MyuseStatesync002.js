import { useState } from "react";
/*
React은 state가 변경이 될때마다 렌더링이 발생한다.
React 렌더링이 발생하면 배치로 해서 처리한다.
배치 16ms 단위로 처리한다.
useSate()은 비동기화로 처리한다.
*/
const MyuseStatesync002 = () => {
  const [number, setNumber] = useState(0);

  const handleUpNumber = () => {
    // state의 값을 순차적으로 변경할때 콜백함수를 사용한다.
    // 기존에 있는 데이터 값을 가지고 와서 일괄적으로 처리한다.
    // 순차적으로 진행하고 싶으면 콜백함수를 이용하면 된다.
    setNumber((number) => number + 3);
    console.log(number);

    setNumber((number) => number + 2);
    console.log(number);

    setNumber((number) => number + 1);
    console.log(number);
  };

  const handleDownNumber = () => {
    setNumber(number - 1);
  };

  return (
    <div>
      <p>{number}</p>
      <button onClick={handleUpNumber}>UP</button>
      <button>Down</button>
    </div>
  );
};

export default MyuseStatesync002;
