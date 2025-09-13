import MyTicketBook from "./MyTicketBook";
import Navigation from "./Navigation";
import RecentRecode from "./RecentRecode";

const SideBar = () => {
    return (
        <div className="left-container">
            <MyTicketBook />
            <RecentRecode />
            <Navigation />
        </div>
    )
}

export default SideBar;