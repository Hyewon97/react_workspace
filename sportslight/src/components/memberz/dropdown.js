import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const DropDown = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = (e) => {
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  };

  const selectClick = (e) => {
    console.log(e);
  }


  return (
    <div className="member-info">
      <button className="member-info__avatar" onClick={toggleMenu}>
        <p>리그선택</p>
      </button>

    
      {isMenuOpen && (
        <div className="member-info__menu" style={{ position: "absolute" }}>
          <select  className="dropMenu" style={{  width:'100%', border:'1px solid red'}}>
            <option value='1' >프리미어리그</option> 
            <option value='2'>라리가</option>
            <option value='3'>분데스리가</option>   {/*submit 했을 때 value값이 넘어간다. */}
            <option value='4'>세리에A</option>
            <option value='5'>리그1</option>
            <option value='6'>챔피언스리그</option>
            <option value='7'>유로파리그</option>
            <option value='8'>k리그1</option>
            <option value='9'>k리그2</option>
        </select>
         
        <select   className="dropMenu" style={{  width:'100%', border:'1px solid red'}}>
        <option value='1' >프리미어리그</option> 
            <option value='2'>라리가</option>
            <option value='3'>분데스리가</option>   
            <option value='4'>세리에A</option>
            <option value='5'>리그1</option>
            <option value='6'>챔피언스리그</option>
            <option value='7'>유로파리그</option>
            <option value='8'>k리그1</option>
            <option value='9'>k리그2</option>
        </select>

        <select  className="dropMenu" style={{  width:'100%', border:'1px solid red'}}>
        <option value='1' >프리미어리그</option> 
            <option value='2'>라리가</option>
            <option value='3'>분데스리가</option>   
            <option value='4'>세리에A</option>
            <option value='5'>리그1</option>
            <option value='6'>챔피언스리그</option>
            <option value='7'>유로파리그</option>
            <option value='8'>k리그1</option>
            <option value='9'>k리그2</option>
        </select>
         
        </div>

        
      )}
    </div> 
  );
};

export default DropDown;
