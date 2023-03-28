import { useState } from "react";

const MyuseState003 = () => {
  const [names, setNames] = useState(["고수", "여진구", "송중기"]); //setNames 라는 setter 함수를 이용해서 불러와야함
  const [input, setInput] = useState("");

  const handleChangeName = (e) => {
    setInput(e.target.value); // inputState에 저장이 되도록 함, 마지막에 입력한 값이 저장됨
    console.log(e.target.value);
  };

  const handleClick = () => {
    //console.log(document.getElementById("fname").value);
    //setNames([...names, document.getElementById("fname").value]);
    //spread 연산자에서 기존의 것 복사해서 가져오기 [...names,] 추가해주기 / 구조 맞춰줘야함 []배열이면 똑같이 []배열로 해줘야함
    //순서 바꿔주고 싶으면 setNames([document.getElementById("fname").value, ...names]); 이렇게 해주면 됨
    //document.getElementById("fname").value = ""; // 빈칸 사용 후에 초기화 시켜줌

    setNames([...names, input]); // 기존의 것 복사해오고, input의 것 가져오기 /기존의 것을 앞에 두는 방법
    setInput("");
  };

  return (
    <div>
      <input type="text" id="fname" onChange={handleChangeName} value={input} />
      {/*입력할 수 있는 칸 나옴 ,  value={input} 이렇게 하고  useState("") 이렇게 해두면 ADD 버튼 누른 후 빈칸이 됨*/}
      <button onClick={handleClick}>ADD</button>
      {names.map((value, index) => {
        return <p key={index}>{value}</p>; //value 값 출력 , 여기처럼 반복해서 할 때는 return 해서 넘겨줘야함
        // 새로운 정보를 맨 앞의 index에 두고 싶으면 index 말고 변경되지 않는 고유값을 저장하는 변수를 새로 설정해주어야함
      })}
      ;
      {/* 하나일때는 이렇게 return., ; 생략하고 {} 아니라 ()소괄호로(안써도 자동으로 만들어줌) 사용할 수 있다. */}
      {/* {names.map((value, index) => (
        <p key={index}>{value}</p>
      ))} */}
    </div>
  );
};

export default MyuseState003;
