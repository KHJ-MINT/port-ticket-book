import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Popup = () => {
    return (
        <div className="popup-wrap">
            <div className="popup-container">
                <div className="pop-header">
                    <div className="close-btn-wrap">
                        <button className="close-btn"><FontAwesomeIcon icon={faXmark} /></button>
                    </div>
                </div>
                <div className="popup-content">
                    <form id="popup-form">
                        <div className="form-input-wrap">
                            <label htmlFor="pop-per-title" className="input-lable">공연 제목</label>
                            <input type="text" className="form-input" id="pop-per-title" />
                        </div>
                        <div className="form-input-wrap">
                            <label htmlFor="pop-per-date" className="input-lable"></label>
                            <input type="date" className="form-input" id="pop-per-date" />
                        </div>
                        <div className="form-input-wrap">
                            <label htmlFor="pop-per-location" className="input-lable"></label>
                            <input type="text" className="form-input" id="pop-per-location" />
                        </div>
                        <div className="form-input-wrap">
                            <label htmlFor="pop-per-memo" className="input-lable"></label>
                            <textarea className="form-input" id="pop-per-memo" />
                        </div>
                    </form>
                </div>
                <div className="popup-footer">
                    <div className="pop-btn-wrap">
                        <button className="delete-btn">삭제</button>
                        <button className="edit-btn">수정</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Popup;