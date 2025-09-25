import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPencil, faTrashCan, faBars, faCalendar, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const TicketDetail = ({ ticket, onBack }) => {
    if (!ticket) return null;
    console.log(ticket.id);
    return (
        <div className="ticket-detail-wrap">
            <div className="ticket-detail-container">
                <div className="ticket-detail-content">
                    <h1 className="title">지킬앤하이드</h1>
                    <div className="ticket-info-wrap">
                        <div className="poster-img-wrap">포스터 이미지가 없습니다.</div>
                        <div className="ticket-info">
                            <div className="date-location-info">
                                <p className="date-info info-text">
                                    <span className="icon"><FontAwesomeIcon icon={faCalendar} /></span>
                                    <span className="text">2025.05.10 오후 02:00</span>
                                </p>
                                <p className="location-info info-text">
                                    <span className="icon"><FontAwesomeIcon icon={faLocationDot} /></span>
                                    <span className="text">블루스퀘어</span>
                                </p>
                            </div>
                            <div className="actor-info">
                                <h6 className="sub-title">출연진 정보</h6>
                                <div className="actor-list">
                                    <p className="actor-info">
                                        <span className="actor-name">홍광호</span>
                                        <span className="actor-role">지킬/하이드</span>
                                    </p>
                                    <p className="actor-info">
                                        <span className="actor-name">린아</span>
                                        <span className="actor-role">루시</span>
                                    </p>
                                    <p className="actor-info">
                                        <span className="actor-name">손지수</span>
                                        <span className="actor-role">엠마</span>
                                    </p>
                                    <p className="actor-info">
                                        <span className="actor-name">김용수</span>
                                        <span className="actor-role">댄버스 경</span>
                                    </p>
                                    <p className="actor-info">
                                        <span className="actor-name">이희정</span>
                                        <span className="actor-role">어터슨</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ticket-review-info-wrap">
                        <div className="sub-title-rating-wrap">
                            <h6 className="sub-title">관람 후기</h6>
                            <div className="star-rating"><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /></div>
                        </div>
                        <div className="review-content">
                            <p className="review-text">이번 시즌 마지막으로 관람하러 간 홍지킬. 벌써부터 다음 시즌이 기다려진다.</p>
                            <div className="ticket-add-info">
                                <h6 className="sub-title">관람 추가 정보</h6>
                                <p className="seat-class-info">
                                    <span className="title">좌석 등급</span>
                                    <span className="class">S</span>
                                    <span className="text">석</span>
                                </p>
                                <p className="seat-price-info">
                                    <span className="title">좌석 가격</span>
                                    <span className="info price">11</span>
                                    <span className="text">만원</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ticket-detail-btns">
                    <div className="left-btns">
                        <div className="go-list-btn">
                            <button type="button">
                                <span className="icon"><FontAwesomeIcon icon={faBars} /></span>
                                <span className="text">티켓 목록으로</span>
                            </button>
                        </div>
                    </div>
                    <div className="right-btns">
                        <div className="delete-btn">
                            <span className="icon"><FontAwesomeIcon icon={faTrashCan} /></span>
                            <span className="text">티켓 삭제하기</span>
                        </div>
                        <div className="edit-btn">
                            <span className="icon"><FontAwesomeIcon icon={faPencil} /></span>
                            <span className="text">티켓 수정하기</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TicketDetail;