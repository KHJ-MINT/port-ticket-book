import ControlPanel from "./ControlPanel";
import TicketList from "./TicketList";

const TicketGrid = () => {
    return (
        <div className="right-container">
            <ControlPanel />
            <TicketList />
        </div>
    )
}

export default TicketGrid;