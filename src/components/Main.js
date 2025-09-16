import { useState } from 'react';
import '../scss/main.scss';
import SideBar from './SideBar';
import TicketGrid from './TicketGrid';
import Popup from './Popup';

const Main = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpenPopup = () => {
        setIsOpen(true);
    };
    const handleClosePopup = () => {
        setIsOpen(false);
    };

    return (
        <main className="main-wrap inner">
            <SideBar />
            <TicketGrid onAddTicket={handleOpenPopup} />
            {isOpen && <Popup onClose={handleClosePopup} />}
        </main>
    )
}

export default Main;