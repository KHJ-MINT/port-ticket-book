import { useState } from "react";
import ControlPanel from "./ControlPanel";
import TicketList from "./TicketList";
import TicketDetail from "./TicketDetail";

const TicketGrid = ({ tickets, onAddTicket }) => {
    const [selectedTicketId, setSelectedTicketId] = useState(null);

    //선택한 티켓 아이디
    const selectedTicket = tickets.find(ticket => ticket.id === selectedTicketId);

    return (
        <div className="right-container">
            <ControlPanel onOpen={onAddTicket} />
            {selectedTicketId
                ? <TicketDetail ticket={selectedTicket} onBack={() => setSelectedTicketId(null)} />
                : <TicketList tickets={tickets} onSelect={setSelectedTicketId} />
            }

        </div>
    )
}

export default TicketGrid;