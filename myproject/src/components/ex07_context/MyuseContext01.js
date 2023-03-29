import { useState } from "react";
import Left1 from "./Left1";
import Right1 from "./Right1";

import "./MyuseContext01.css"; // import시 js는 확장자를 안써도 되지만 다른 파일은 확장자까지 써줘야한다.
import { UserContext } from "./contexts/UserContext";
import { ThemeContext } from "./contexts/ThemeContext";

const MyuserContext01 = () => {
  const [number, setNumber] = useState(0);
  const [name, setName] = useState("홍길동");

  const onHandleIncrease = () => {
    setNumber(number + 1);
  };

  const onHandleName = () => {
    setName(name === "홍길동" ? "여진구" : "홍길동");
  };

  return (
    <div id="page">
      <h1>page</h1>
      <div className="grid">
        {/* UserContext와 ThemeContext는 어떤게 밖으로 가도 상관없다. 데이터를 제공하는 곳에서 감싸주기만 하면됨 */}
        {/* 이름에 관련된 것 하려고 만든것 */}
        <UserContext.Provider value={{ name, setName, onHandleName }}>
          {/* 숫자에 관련된 것 하려고 만든것 */}
          <ThemeContext.Provider
            value={{ number, setNumber, onHandleIncrease }}
          >
            <Left1 />
            <Right1 />
          </ThemeContext.Provider>
        </UserContext.Provider>
      </div>
    </div>
  );
};

export default MyuserContext01;
