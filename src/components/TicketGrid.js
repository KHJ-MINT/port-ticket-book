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

//티켓 검색하기
const searchTickets = (tickets, searchTerm) => {
    if (!searchTerm || searchTerm.trim() === '') {
        return tickets; //검색어가 없으면 원본 배열 반환
    }

    //검색어의 공백을 제거하고 소문자로 변환해 비교할 준비
    const lowerSearchTerm = searchTerm.trim().toLowerCase();

    //filter() 메서드를 이용해 조건에 맞는 티켓만 추출
    const filterdTickets = tickets.filter(ticket => {
        //날짜
        const dateMatch = ticket.date.toLowerCase().includes(lowerSearchTerm);
        //공연 제목
        const titleMatch = ticket.title.toLowerCase().includes(lowerSearchTerm);
        //출연진
        const actorList = ticket.cast.map(c => c.actor).join(" ");
        const castMatch = actorList.toLowerCase().includes(lowerSearchTerm);

        //세 가지 중 하나라도 일치할 경우 반환
        return dateMatch || titleMatch || castMatch;
    });
    return filterdTickets;
}

const TicketGrid = ({ tickets, onAddTicket, setTickets, selectedTicketId, setSelectedTicketId, searchTerm }) => {

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
        //검색어가 있을 경우 검색된 티켓을 정렬
        const searched = searchTickets(tickets, searchTerm);

        //티켓 정렬 적용
        const finalDisplayTickets = sortTickets(searched, sortKey, sortOrder);

        setDisplayTickets(finalDisplayTickets);
    }, [tickets, sortKey, sortOrder, searchTerm]); // tickets가 바뀔 때만 오름차순으로 초기화

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
                    <TicketList tickets={displayTickets} onSelect={setSelectedTicketId} searchTerm={searchTerm} />
                </>
            }

        </div>
    )
}

export default TicketGrid;