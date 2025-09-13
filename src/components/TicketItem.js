import posterImg from '../img/poster.jpg';

const TicketItem = () => {
    return (
        <div className="ticket-list-item">
            <div className="ticket-info-wrap">
                <h6 className="ticket-title">지킬앤하이드 - 20주년 기념 공연</h6>
                <p className="ticket-date">2025.05 14:00</p>
                <p className="ticket-place">블루스퀘어 신한카드홀</p>
                <div className="ticket-actors">
                    <p className="actors-title">출연진</p>
                    <p className="actors-name">홍광호, 린아, 김용수, 손지수, 이희정</p>
                </div>
            </div>
            <div className="poster-wrap">
                <div className="poster-box">
                    <img src={posterImg} alt="포스터 이미지" />
                </div>
            </div>
        </div>
    )
}

export default TicketItem;