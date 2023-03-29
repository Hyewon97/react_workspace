import { useContext } from "react";
import { ThemeContext } from "./contexts/ThemeContext";

const Right3 = () => {
  // number 증가 시키는 것
  const { number, onHandleIncrease } = useContext(ThemeContext);

  return (
    <div>
      <h1>Right</h1>
      <h1>Number:{number}</h1>

      <input type="button" value="+" onClick={() => onHandleIncrease()} />
    </div>
  );
};

export default Right3;
