import ControlPanel from "./ControlPanel";
import TicketList from "./TicketList";

const TicketGrid = ({ tickets, onAddTicket }) => {
    return (
        <div className="right-container">
            <ControlPanel onOpen={onAddTicket} />
            <TicketList tickets={tickets} />
        </div>
    )
}

export default TicketGrid;