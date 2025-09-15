const MyTicketBook = () => {
    return (
        <div className="left-top my-ticketbook-wrap">
            <div className="my-ticketbook-container">
                <h6 className="title">마이 티켓북</h6>
                <div className="my-ticketbook-content-wrap">
                    <p className="total-view-count my-ticketbook-content">
                        <span className="total-text content-text">총 관람 횟수 :</span>
                        <span className="count">10</span>
                        <span className="total-text text">회</span>
                    </p>
                    <p className="total-theater-count my-ticketbook-content">
                        <span className="total-text content-text">관람하러 간 극장 수 :</span>
                        <span className="count">3</span>
                        <span className="total-text text">개</span>
                    </p>
                    <p className="favorite-show my-ticketbook-content">
                        <span className="favorite-text content-text">가장 좋아하는 공연 :</span>
                        <span className="favorite-show text">지킬앤하이드 - 20주년 기념 공연</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default MyTicketBook;