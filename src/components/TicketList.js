import TicketItem from "./TicketItem";

const TicketList = () => {
    return (
        <div className="ticket-list-wrap">
            <div className="ticket-list-container">
                <TicketItem />
                <TicketItem />
                <TicketItem />
                <TicketItem />
                <TicketItem />
                <TicketItem />
                <TicketItem />
                <TicketItem />
            </div>
        </div>
    )
}

export default TicketList;