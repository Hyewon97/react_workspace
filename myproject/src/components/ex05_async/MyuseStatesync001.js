import { useState } from "react";
/*
React은 state가 변경이 될때마다 렌더링이 발생한다.
React 렌더링이 발생하면 배치로 해서 처리한다.
배치 16ms 단위로 처리한다.
useSate()은 비동기화로 처리한다.
*/
const MyuseStatesync001 = () => {
  const [number, setNumber] = useState(0);

  const handleUpNumber = () => {
    // 연속적으로 처리가 되도록 설계가 되어 있으면

    // 배치로 처리가 됨. 0에 3을 더하고 0에 2를 더하고 0에 1을 더하고
    // 원래의 useState(0);의 0값에 더하는 것임.
    setNumber(number + 3);
    console.log(number);

    setNumber(number + 2);
    console.log(number);

    // 맨 마지막만 수행이 된다.
    setNumber(number + 1);
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

export default MyuseStatesync001;
