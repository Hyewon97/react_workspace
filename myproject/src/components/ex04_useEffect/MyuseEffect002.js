import { useEffect, useState } from "react";

const MyuseEffect002 = () => {
  let data = 0; // 데이터는 일반 변수여서 리렌더링이 발생하지 않는다.
  const [num, setNum] = useState(0);

  const handleData = () => {
    console.log((data = data + 1));
  };

  const handleName = (e) => {
    console.log(e.target.value + 1);
    setNum(num + 1);
  };

  useEffect(() => {
    console.log("data:" + data);
  });

  return (
    <div>
      {/* data가 변경이 되었을때는 리렌더링이 안되서 useEffect가 수행되지 않는다. */}
      <input type="text" placeholder="data" onChange={handleData} />
      <input type="text" placeholder="num" onChange={handleName} />
    </div>
  );
};

export default MyuseEffect002;
