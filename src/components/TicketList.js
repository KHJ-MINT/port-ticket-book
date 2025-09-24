//import { useState, useEffect } from "react";
import TicketItem from "./TicketItem";

const TicketList = ({ tickets }) => {
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