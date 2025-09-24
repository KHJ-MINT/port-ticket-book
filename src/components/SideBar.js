import MyTicketBook from "./MyTicketBook";
//import Navigation from "./Navigation";
import RecentRecode from "./RecentRecode";

const SideBar = ({ tickets }) => {
    return (
        <div className="left-container">
            <MyTicketBook tickets={tickets} />
            <RecentRecode tickets={tickets} />
            {/* <Navigation /> */}
            <p className="notice">공연 정보 출처: (재)예술경영지원센터 공연예술통합전산망(www.kopis.or.kr)</p>
        </div>
    )
}

export default SideBar;