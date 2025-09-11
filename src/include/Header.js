import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons";


const Header = () => {
    return (
        <header className="header inner">
            <div className="header-left">
                <h1 className="title"><Link to={"/"}>시간, 그리고 기록</Link></h1>
            </div>
            <div className="header-right">
                <nav className="nav pc-nav">
                    <ul>
                        <li className="nav-item"><Link to={"/calender"} >관람 일정</Link></li>
                        <li className="nav-item"><Link to={"/"}>관람 후기</Link></li>
                    </ul>
                </nav>
                <button className="login-btn">로그인</button>
                <div className="m-nav-wrap">
                    <FontAwesomeIcon icon={faBars} />
                    <nav className="nav m-nav">
                    <ul>
                        <li className="nav-item"><Link to={"/"}>관람 일정</Link></li>
                        <li className="nav-item"><Link to={"/"}>관람 후기</Link></li>
                        <li className="nav-item"><Link to={"/"}>로그인</Link></li>
                    </ul>
                </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;