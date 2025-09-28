import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const MiniPopup = () => {
    return (
        <div className="mini-popup add-complete">
            <span className="icon"><FontAwesomeIcon icon={faCheck} /></span>
            <p className="popup-text">티켓 저장이 완료되었습니다!</p>
        </div>
    )
}

export default MiniPopup;