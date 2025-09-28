import { useState } from "react";
import TicketItem from "./TicketItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const TicketList = ({ tickets, onSelect, searchTerm }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    //현재 페이지에 보여줄 티켓만 추출하기
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentTickets = tickets.slice(startIndex, endIndex);

    //전체 페이지 수
    const totalPages = Math.ceil(tickets.length / itemsPerPage);

    //이전 페이지, 다음 페이지 이동 버튼
    const handlePrevBtn = () => {
        setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));
    }
    const handelNextBtn = () => {
        setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
    }

    return (
        <div className="ticket-list-wrap">
            <div className="ticket-list-container">
                {
                    currentTickets.map((ticket) => (
                        <TicketItem key={ticket.id} ticketData={ticket} onClick={() => onSelect(ticket.id)} />
                    ))
                }
            </div>
            <div className="pagination">
                <button
                    className="prev-btn pagination-btn"
                    onClick={handlePrevBtn}
                    disabled={currentPage === 1}
                >
                    <FontAwesomeIcon icon={faAngleLeft} />
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        className={currentPage === index + 1 ? "active" : ""}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    className="next-btn pagination-btn"
                    onClick={handelNextBtn}
                    disabled={currentPage === totalPages}
                >
                    <FontAwesomeIcon icon={faAngleRight} />
                </button>
            </div>
        </div>
    )
}

export default TicketList;