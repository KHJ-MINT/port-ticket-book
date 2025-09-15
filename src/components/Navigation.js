import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMasksTheater, faLandmark, faTicket, faImages } from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
    return (
        <div className="left-bottom menu-wrap">
            <nav className="menu-list">
                <ul className="menu-list-container">
                    <li className="menu-list-item">
                        <a href="#">
                            <span className="icon menu-wishlist"><FontAwesomeIcon icon={faHeart} /></span>
                            <span className="text">위시리스트</span>
                        </a>
                    </li>
                    <li className="menu-list-item">
                        <a href="#">
                            <span className="icon menu-record-actor"><FontAwesomeIcon icon={faMasksTheater} /></span>
                            <span className="text">배우별 기록</span>
                        </a>
                    </li>
                    <li className="menu-list-item">
                        <a href="#">
                            <span className="icon menu-record-theater"><FontAwesomeIcon icon={faLandmark} /></span>
                            <span className="text">극장별 기록</span>
                        </a>
                    </li>
                    <li className="menu-list-item">
                        <a href="#">
                            <span className="icon menu-record-performance"><FontAwesomeIcon icon={faTicket} /></span>
                            <span className="text">공연별 기록</span>
                        </a>
                    </li>
                    <li className="menu-list-item">
                        <a href="#">
                            <span className="icon menu-my-gallery"><FontAwesomeIcon icon={faImages} /></span>
                            <span className="text">마이 갤러리</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navigation;