import '../scss/header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";


const Header = ({ setSelectedTicketId, searchTerm, onSearchChange }) => {
    //입력 이벤트 발생 시 부모의 onSearchChange 함수 호출
    const handleInputChange = (e) => {
        onSearchChange(e.target.value);
    };

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
                            autoComplete='off'
                            value={searchTerm} //검색어
                            onChange={handleInputChange}  //입력 이벤트 핸들러
                        />
                    </div>
                    <button id='search-btn' type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                </form>
            </div>
        </header>
    );
}

export default Header;