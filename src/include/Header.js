import '../scss/header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";


const Header = ({ setSelectedTicketId }) => {
    return (
        <header className="header inner">
            <div className="go-home">
                <button type='button' onClick={() => setSelectedTicketId(null)}>
                    <FontAwesomeIcon icon={faHouse} />
                </button>
            </div>
            <div className="search-wrap">
                <form action="get" className="search-form">
                    <div className="search-box">
                        <input id='search-input'
                            type="text"
                            placeholder="날짜 / 공연 제목 / 출연진 이름으로 검색할 수 있습니다."
                            name='search'
                            autoComplete='off' />
                    </div>
                    <button id='search-btn' type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                </form>
            </div>
        </header>
    );
}

export default Header;