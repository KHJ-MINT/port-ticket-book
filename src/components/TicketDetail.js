import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPencil, faTrashCan, faChevronLeft, faCalendar, faLocationDot } from "@fortawesome/free-solid-svg-icons";

//티켓 삭제하기
const deleteTicket = (deleteId, setTickets) => {
    //전체 티켓 데이터 가져오기
    const storedData = localStorage.getItem('tickets');
    const allTickets = storedData ? JSON.parse(storedData) : [];

    //삭제할 티켓을 제외하고 필터링하기
    const updatedTickets = allTickets.filter(ticket => ticket.id !== deleteId);

    //로컬 스토리지에 업데이트된 티켓 데이터 저장하기
    localStorage.setItem('tickets', JSON.stringify(updatedTickets));

    //상위 컴포넌트에 업데이트된 티켓 데이터 전달하기
    if (setTickets) {
        setTickets(updatedTickets);
    }
}

const TicketDetail = ({ ticket, onBack, setTickets }) => {
    if (!ticket) return null;
    //console.log(ticket.id);

    //별점을 별 아이콘 갯수만큼 나오게 변경
    const ratingStars = () => {
        const stars = [];
        for (let i = 0; i < ticket.rating; i++) {
            stars.push(<FontAwesomeIcon icon={faStar} key={i} />);
        }
        return stars;
    };

    //가격을 출력할 때 천 단위 콤마 추가
    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    //티켓 삭제하기 핸들러
    const handelTicketDelete = () => {
        if (window.confirm("정말 티켓을 삭제하시겠습니까? 삭제한 티켓은 복구할 수 없습니다.")) {
            deleteTicket(ticket.id, setTickets);
            onBack(); //목록으로 돌아가기
        } else {
            return false;
        }
    }

    return (
        <div className="ticket-detail-wrap">
            <div className="ticket-detail-container">
                <div className="ticket-detail-content">
                    <h1 className="title">{ticket.title}</h1>
                    <div className="ticket-info-wrap">
                        <div className="poster-img-wrap">
                            {ticket.poster && <img src={ticket.poster} alt={ticket.title} />}
                            {!ticket.poster && "포스터가 없습니다."}
                        </div>
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
                            <div className="actor-info-wrap">
                                <h6 className="sub-title">출연진 정보</h6>
                                <div className="actor-list">
                                    {
                                        ticket.cast.map((c, index) => (
                                            <p className='actor-info' key={index}>
                                                <span className="actor-name">{c.actor}</span>
                                                <span className="actor-role">{c.role}</span>
                                            </p>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ticket-review-info-wrap">
                        <div className="sub-title-rating-wrap">
                            <h6 className="sub-title">관람 후기</h6>
                            <div className="star-rating">{ratingStars()}</div>
                        </div>
                        <div className="review-content">
                            <p className="review-text">{ticket.review}</p>
                            <div className="ticket-add-info">
                                <h6 className="sub-title">관람 추가 정보</h6>
                                <p className="seat-class-info add-info">
                                    <span className="sub-title">좌석 등급</span>
                                    <span className="info class">{ticket.seatClass}</span>
                                    <span className="text">석</span>
                                </p>
                                <p className="seat-price-info add-info">
                                    <span className="sub-title">좌석 가격</span>
                                    <span className="info price">{formatPrice(ticket.seatPrice)}</span>
                                    <span className="text">원</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ticket-detail-btns">
                    <div className="left-btns">
                        <button className="go-list-btn" type="button" onClick={onBack}>
                            <span className="icon"><FontAwesomeIcon icon={faChevronLeft} /></span>
                            <span className="text">티켓 목록으로</span>
                        </button>
                    </div>
                    <div className="right-btns">
                        <button className="delete-btn" onClick={handelTicketDelete}>
                            <span className="icon"><FontAwesomeIcon icon={faTrashCan} /></span>
                            <span className="text">티켓 삭제하기</span>
                        </button>
                        <button className="edit-btn">
                            <span className="icon"><FontAwesomeIcon icon={faPencil} /></span>
                            <span className="text">티켓 수정하기</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TicketDetail;