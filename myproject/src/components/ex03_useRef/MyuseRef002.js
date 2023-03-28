import { useEffect, useRef } from "react";

const MyuseRef002 = () => {
  const nameRef = useRef("");

  const handleBtn = () => {
    // console.log(nameRef.current);
    // console.log(nameRef.current.value);

    // 값 초기화
    // document.querySelector("#ndata").value = "";
    nameRef.current.value = "";
  };

  // 컴포넌트가 다 실행되고 나서 맨 마지막에 실행됨 (useEffect 기능)
  useEffect(() => {
    // let ndata = document.querySelector("#ndata");
    // ndata.focus(); // null값이여서 focus 사용 못함. 위의 ndata가 null임
    nameRef.current.focus(); // 새로 고침하면 포커스가 된다.
  }); //  리렌더링이 될 때마다 수행을 하라.
  // },[]); // 딱 한번만 수행이 된다.
  return (
    <div>
      {/* useEffect 코드 적고 실행하면 렌더링이 적용 됨 */}
      <input type="text" placeholder="이름입력" ref={nameRef} id="ndata" />
      <button onClick={handleBtn}>Click</button>
    </div>
  );
};

export default MyuseRef002;
