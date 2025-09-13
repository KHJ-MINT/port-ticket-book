import '../scss/main.scss';
import SideBar from './SideBar';
import TicketGrid from './TicketGrid';

const Main = () => {
    return (
        <main className="main-wrap inner">
            <SideBar />
            <TicketGrid />
        </main>
    )
}

export default Main;