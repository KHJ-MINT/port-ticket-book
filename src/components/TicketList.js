//import { useState, useEffect } from "react";
import TicketItem from "./TicketItem";

const TicketList = ({ tickets }) => {
    //티켓 목록 데이터를 저장할 상태 변수.
    //const [ticketLists, seticketLists] = useState([]); //초기 값은 빈 배열.

    // useEffect(() => {
    //     //로컬 스토리지에서 데이터 가져오기
    //     const storedTickets = localStorage.getItem('tickets');

    //     //데이터가 있으면 json 문자열을 json 객체로 변환하여 저장.
    //     if (storedTickets) {
    //         seticketLists(JSON.parse(storedTickets));
    //     }
    // }, []);

    return (
        <div className="ticket-list-wrap">
            <div className="ticket-list-container">
                {
                    tickets.map((ticket) => (
                        <TicketItem key={ticket.id} ticketData={ticket} />
                    ))
                }
            </div>
        </div>
    )
}

export default TicketList;