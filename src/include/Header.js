import '../scss/header.scss';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";


const Header = () => {
    return (
        <header className="header inner">
            <div className="go-home">
                <Link to={"/"}>
                    <FontAwesomeIcon icon={faHouse} />
                </Link>
            </div>
            <div className="search-wrap">
                <form action="get" className="search-form">
                    <div className="search-box">
                        <input id='search-input' type="text" placeholder="날짜 / 공연 제목 / 출연진 이름으로 검색할 수 있습니다." name='search' />
                    </div>
                    <button id='search-btn' type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                </form>
            </div>
        </header>
    );
}

export default Header;