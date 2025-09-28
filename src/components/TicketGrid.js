import { useEffect, useState } from "react";
import ControlPanel from "./ControlPanel";
import TicketList from "./TicketList";
import TicketDetail from "./TicketDetail";

const sortTickets = (tickets, key, order = 'asc') => {
    const sortedTickets = [...tickets]; //원본 배열 훼손 방지

    sortedTickets.sort((a, b) => {
        //정렬 기준
        const valA = a[key];
        const valB = b[key];

        let comparison = 0;

        if (key === 'date') {
            //날짜 정렬
            comparison = valA.localeCompare(valB);
        } else if (key === 'title') {
            //문자열 정렬
            comparison = valA.localeCompare(valB, 'ko', { sensitivity: 'base' });
        }

        return order === 'desc' ? comparison * -1 : comparison;
    });

    return sortedTickets;
}

const TicketGrid = ({ tickets, onAddTicket, setTickets }) => {
    const [selectedTicketId, setSelectedTicketId] = useState(null); //선택한 티켓 아이디
    const [sortKey, setSortKey] = useState('date'); //정렬 기준. 기본은 날짜.
    const [sortOrder, setSortOrder] = useState('asc'); //정렬 순서. 기본은 오름차순.
    const [displayTickets, setDisplayTickets] = useState(() => sortTickets(tickets, sortKey, sortOrder)); //정렬된 결과를 저장

    //날짜 오름차순 정렬 함수
    // const sortTicketAsc = (tickets) => {
    //     return [...tickets].sort((a, b) => a.date.localeCompare(b.date));
    // }

    //선택한 티켓 아이디
    const selectedTicket = tickets.find(ticket => ticket.id === selectedTicketId);

    //티켓 변경 시에도 날짜 오름차순 정렬
    useEffect(() => {
        setDisplayTickets(sortTickets(tickets, sortKey, sortOrder));
    }, [tickets, sortKey, sortOrder]); // tickets가 바뀔 때만 오름차순으로 초기화

    return (
        <div className="right-container">

            {selectedTicketId
                ? <TicketDetail
                    ticket={selectedTicket}
                    onBack={() => setSelectedTicketId(null)}
                    setTickets={setTickets}
                />
                :
                <>
                    <ControlPanel
                        onOpen={onAddTicket}
                        sortKey={sortKey}
                        sortOrder={sortOrder}
                        setSortKey={setSortKey}
                        setSortOrder={setSortOrder}
                        tickets={tickets}
                        displayTickets={displayTickets}
                        setDisplayTickets={setDisplayTickets}
                    />
                    <TicketList tickets={displayTickets} onSelect={setSelectedTicketId} />
                </>
            }

        </div>
    )
}

export default TicketGrid;