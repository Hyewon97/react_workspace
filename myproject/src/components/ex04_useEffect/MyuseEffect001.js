/*
    useEffect : 컴포넌트가 렌더링될 때마다 특정 작업을 수행하도록 설정한다.
    특정작업(side effect) : Time(SetTimeout), Ajax
    useEffect : useEffect는 side effect라는 뜻이다.

    useEffect 4가지 종류 :
    1. useEffect(callback) : 마운트 후, 리렌더링 될때마다
    2. useEffect(callback,[]) : 마운트 후
    3. useEffect(callback,[state]) : 마운트 후, state
    4. useEffect(callback, {return ();}, []) : 마운트 후, 언마운트 전
*/

import { useState, useEffect } from "react";

const MyuseEffect001 = () => {
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeNickName = (e) => {
    setNickName(e.target.value);
  };

  //   useEffect(() => {
  //     // 두번 나오는 이유는 index.js에 스트레이트로 설정되었기 때문에!
  //     console.log("렌더링이 되었습니다.");
  //     // });
  //   }, []); // 이름이 변경이 되어도 실행이 안됨.. 한번만 수행된다.

  //
  //
  // 이름이 변경될때마다 렌더링이 되도록 설정
  //   useEffect(() => {
  //     // 두번 나오는 이유는 index.js에 스트레이트로 설정되었기 때문에!
  //     console.log("name 렌더링이 되었습니다.");
  //   }, [name]);
  //
  //
  // 닉네임이 변경될때마다 렌더링이 되도록 설정
  //   useEffect(() => {
  //     // 두번 나오는 이유는 index.js에 스트레이트로 설정되었기 때문에!
  //     console.log("nickName 렌더링이 되었습니다.");
  //   }, [nickName]);
  //
  //
  //

  // 누구든 상관없이 렌더링을 시행시킴
  //   useEffect(() => {
  //     console.log("렌더링 return :" + name);
  //     console.log("렌더링 return :" + nickName);
  //   }, [name, nickName]); // 이름과 닉네임이 변경될때도 렌더링이 되도록 한다.

  useEffect(() => {
    console.log("렌더링 return :__1" + name);
    return () => {
      console.log("__2");
      console.log("clean up");
    };
  }, [name]);

  return (
    <div>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={onChangeName}
      />
      <input
        type="text"
        placeholder="nickName"
        value={nickName}
        onChange={onChangeNickName}
      />
      <br />
      <span>이름:</span>
      <br />
      <span>닉네임:</span>
    </div>
  );
};

export default MyuseEffect001;
