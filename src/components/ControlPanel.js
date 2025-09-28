import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';

const ControlPanel = ({ onOpen, tickets, displayTickets, setDisplayTickets, sortKey, sortOrder, setSortKey, setSortOrder }) => {
    const [filterOpen, setFilterOpen] = useState(false); //정렬 버튼 상태 관리

    //정렬 버튼 클릭 시 옵션 보이기/숨기기
    const handeleToggleFilter = () => {
        setFilterOpen(open => !open);
    };

    //정렬 옵션 변경 핸들러
    const handleSortChange = (key, order) => {
        setSortKey(key);
        setSortOrder(order);
    };

    return (
        <div className="control-panel-wrap">
            <div className="control-panel-container">
                <div className="control-btn order-filter">
                    <button type="button"
                        className="order-filter-btn"
                        onClick={handeleToggleFilter}
                    >
                        <span className="btn-icon"><FontAwesomeIcon icon={faSort} /></span>
                        <span className="btn-txt">티켓 정렬 변경</span>
                    </button>
                    <ul className={`order-filter-lists ${filterOpen ? 'open' : ''}`}>
                        <li className="order-filter-item selected">
                            <button type="button" className="order-filter-btn date-desc" onClick={() => handleSortChange('date', 'asc')}>관람일 오름차순</button>
                        </li>
                        <li className="order-filter-item">
                            <button type="button" className="order-filter-btn date-asc" onClick={() => handleSortChange('date', 'desc')}>관람일 내림차순</button>
                        </li>
                        <li className="order-filter-item">
                            <button type="button" className="order-filter-btn title-desc" onClick={() => handleSortChange('title', 'asc')}>제목 오름차순</button>
                        </li>
                        <li className="order-filter-item">
                            <button type="button" className="order-filter-btn title-asc" onClick={() => handleSortChange('title', 'desc')}>제목 내림차순</button>
                        </li>
                    </ul>
                </div>
                <div className="control-btn add-ticket">
                    <button type="button" className="add-ticket-btn" onClick={onOpen}>
                        <span className="btn-icon"><FontAwesomeIcon icon={faPlus} /></span>
                        <span className="btn-txt">티켓 추가하기</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ControlPanel;