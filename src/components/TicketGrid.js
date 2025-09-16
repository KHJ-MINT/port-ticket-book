import ControlPanel from "./ControlPanel";
import TicketList from "./TicketList";

const TicketGrid = ({ onAddTicket }) => {
    return (
        <div className="right-container">
            <ControlPanel onOpen={onAddTicket} />
            <TicketList />
        </div>
    )
}

export default TicketGrid;