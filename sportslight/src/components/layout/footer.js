import { NavLink } from "react-router-dom";
import "./footer.css";

const Footer = () => {
    return (
        <footer>
          {/*<hr style={{border:"0", height:"1px", backgroundColor: "rgb(33, 33, 33)"}}/>*/}
            <div className="footer" style={{backgroundColor : "black"}}>
              <nav className="footer-util">
                <ul className="footer-nq" style={{marginBlockStart : "unset", paddingInlineStart:"0"}}>
                  <li style={{paddingRight:"20px"}}>
                  <NavLink className="nav-link" to="/notice">공지사항</NavLink>
                  </li>
                  <li>
                  <NavLink className="nav-link" to="/qna">자주묻는질문</NavLink>
                  </li>
                </ul>
              </nav>

              <div className="copyright-box" style={{color : "white"}}>              
                  <div> 
                    <span> 회사명 : SPORTSLIGHT</span>
                    <span> 사업자등록번호 : 0000-000-11-1111</span>
                  </div>               
                <p>
                  <span>
                  고객센터 : 1670-1525 (평일/주말 09시~18시, 공휴일 휴무)
                  </span>
                </p>
                <p>
                <span>
                  사업장 : 서울특별시 강남구 강남대로 34, 이젠컴퓨터아카데미 14층(서초동)
                  </span>
                </p>
                <p className="copyright">Copyright © 주식회사 스포츠라이트 All right reserved.</p>
              </div>
            </div>
        </footer>
    )
}
export default Footer;