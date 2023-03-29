import { useContext } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import { UserContext } from "./contexts/UserContext";

const Left3 = () => {
  const { number } = useContext(ThemeContext);

  return (
    <div>
      <h1>Left3:</h1>
      <h1>Number:{number}</h1>
    </div>
  );
};

export default Left3;
