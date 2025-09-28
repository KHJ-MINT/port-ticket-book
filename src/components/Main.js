import { useState } from 'react';
import '../scss/main.scss';
import SideBar from './SideBar';
import TicketGrid from './TicketGrid';
import Popup from './Popup';
import MiniPopup from './MiniPopup';

const Main = ({ tickets, setTickets, selectedTicketId, setSelectedTicketId, searchTerm, isMiniPopupVisible, onMiniPopupOpen }) => {
    const [isOpen, setIsOpen] = useState(false); //팝업 열고 닫기
    const handleOpenPopup = () => {
        setIsOpen(true);
    };
    const handleClosePopup = () => {
        setIsOpen(false);
    };

    console.log(onMiniPopupOpen);

    return (
        <main className="main-wrap inner">
            <SideBar tickets={tickets} />
            <TicketGrid
                onAddTicket={handleOpenPopup}
                tickets={tickets}
                setTickets={setTickets}
                selectedTicketId={selectedTicketId}
                setSelectedTicketId={setSelectedTicketId}
                searchTerm={searchTerm}
            />
            {isOpen && <Popup onClose={handleClosePopup} setTickets={setTickets} onMiniPopupOpen={onMiniPopupOpen} />}
            {isMiniPopupVisible && <MiniPopup />}
        </main>
    )
}

export default Main;