import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Schedule = () => {
    return (
        <div className="schedule-wrap popup-wrap">
            <div className="popup-bg"></div>
            <div className="schedule-container-wrap popup-container">
                <div className="schedule-header-wrap">
                    <h4 className="title wrap">일정 추가</h4>
                    <div className="close-btn-wrap">
                        <button className="close-btn">
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                </div>
                <div className="schedule-content-wrap">
                    <div className="schedule-color-wrap">
                        <ul className="color-list">
                            <li className="color-item">
                                <div className="color-btn-wrap">
                                    <button className="color-btn red">빨간색</button>
                                </div>
                            </li>
                            <li className="color-item">
                                <div className="color-btn-wrap">
                                    <button className="color-btn yellow">노란색</button>
                                </div>
                            </li>
                            <li className="color-item">
                                <div className="color-btn-wrap">
                                    <button className="color-btn blue">파란색</button>
                                </div>
                                
                            </li>
                            <li className="color-item">
                                <div className="color-btn-wrap">
                                    <button className="color-btn pink">분홍색</button>
                                </div>
                            </li>
                            <li className="color-item">
                                <div className="color-btn-wrap">
                                    <button className="color-btn green">녹색</button>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="schedule-form-wrap">
                        <form id="schedule-form">
                            <div className="form-input-wrap">
                                <label htmlFor="sch-per-title" className="input-label">공연 제목</label>
                                <input type="text" className="form-input" id="sch-per-title" />
                            </div>
                            <div className="form-input-wrap">
                                <label htmlFor="sch-per-date" className="input-label">공연 일시</label>
                                <input type="date" className="form-input" id='sch-per-date' />
                            </div>
                            <div className="form-input-wrap">
                                <label htmlFor="sch-per-location" className="input-label">공연장 위치</label>
                                <input type="text" className="form-input" id="sch-per-location" />
                            </div>
                            <div className="form-input-wrap">
                                <label htmlFor="sch-per-memo" className="input-label">메모</label>
                                <textarea className="form-input" id="sch-per-memo" />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="schedule-footer-wrap">
                    <div className="schedule-btn-wrap"><button className="schedule-btn add-btn">추가</button></div>
                </div>
            </div>
        </div>
    )
}

export default Schedule;