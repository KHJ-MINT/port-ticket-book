import { useState } from 'react';
import '../scss/main.scss';
import SideBar from './SideBar';
import TicketGrid from './TicketGrid';
import Popup from './Popup';

const Main = ({ tickets, setTickets }) => {
    const [isOpen, setIsOpen] = useState(false); //팝업 열고 닫기
    const handleOpenPopup = () => {
        setIsOpen(true);
    };
    const handleClosePopup = () => {
        setIsOpen(false);
    };

    return (
        <main className="main-wrap inner">
            <SideBar tickets={tickets} />
            <TicketGrid onAddTicket={handleOpenPopup} tickets={tickets} />
            {isOpen && <Popup onClose={handleClosePopup} setTickets={setTickets} />}
        </main>
    )
}

export default Main;