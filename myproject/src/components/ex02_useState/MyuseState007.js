import { useRef, useState } from "react";

const MyuseState007 = () => {
  const inputRef = useRef(null);
  const [input, setInput] = useState(""); // 값을 저장하면 여기에 저장이 된다.(useState)
  const [userList, setUserList] = useState([
    // 배열 형태로 넣어준다
    { id: 1, name: "aaa" },
    { id: 2, name: "bbb" },
    { id: 3, name: "ccc" },
  ]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const pushNewUser = () => {
    console.log(input);
    // setUserList([...userList, { id: userList.length + 1, name: input }]);
    // setInput("");

    setUserList([
      ...userList, // 등록시킨 이름으로 바로 접근 가능하다.
      { id: userList.length + 1, name: inputRef.current.value }, // 요소의 속성값을 가지고 올 때 current 속성값을 지정해줘야 한다.
    ]);
    inputRef.current.value = "";
  };

  return (
    <div>
      {/* <input
        type="text"
        id="fname"
        value={input}
        onChange={handleChange}
      /> */}
      <input type="text" id="fname" ref={inputRef} />
      <button style={{ backgroundColor: "green" }} onClick={pushNewUser}>
        등록
      </button>
      {userList.map((element, idx) => {
        return (
          <p key={idx}>
            <span>{element.id}</span>
            <span>{element.name}</span>
          </p>
        );
      })}
    </div>
  );
};

export default MyuseState007;
