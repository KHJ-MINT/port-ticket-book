// import posterImg from '../img/poster.jpg'; 임시로 사용한 이미지
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from "@fortawesome/free-solid-svg-icons";

const TicketItem = ({ ticketData, onClick }) => {
    //출연진 배열을 문자열로 전환
    const actorLists = ticketData.cast.map(c => c.actor).join(', ');

    //별점을 별 아이콘 갯수만큼 나오게 변경
    const ratingStars = () => {
        const stars = [];
        for (let i = 0; i < ticketData.rating; i++) {
            stars.push(<FontAwesomeIcon icon={faStar} key={i} />);
        }
        //console.log(stars);
        return stars;
    };

    return (
        <div className="ticket-list-item" onClick={onClick}>
            <div className="ticket-info-wrap">
                <h6 className="ticket-title">{ticketData.title}</h6>
                <p className="ticket-date">{ticketData.date}</p>
                <p className="ticket-place">{ticketData.location}</p>
                <div className="ticket-actors">
                    <p className="actors-name">{actorLists}</p>
                </div>
                <p className="star">{ratingStars()}</p>
            </div>
            <div className="poster-wrap">
                <div className="poster-box">
                    <img src={ticketData.poster} alt={`${ticketData.title} 포스터`} />
                </div>
            </div>
        </div>
    )
}

export default TicketItem;