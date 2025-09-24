import { useEffect, useState } from 'react';

const getLocalData = () => {
    const storedData = localStorage.getItem('tickets');
    return storedData ? JSON.parse(storedData) : [];
}

const getRecentTicket = () => {
    const allData = getLocalData();

    if (!allData || allData.length === 0) {
        return null;
    }

    //관람 날짜를 기준으로 정렬
    const sortedData = [...allData].sort((a, b) => b.date.localeCompare(a.date));

    return sortedData[0];
}

const RecentRecode = ({ tickets }) => {
    const [latestTicket, setLastTicket] = useState(null);

    const getLatestTicket = getRecentTicket();
    const actorList = getLatestTicket ? getLatestTicket.cast.map(c => c.actor).join(', ') : '';

    useEffect(() => {
        const latestData = getRecentTicket(tickets);
        setLastTicket(latestData);
    }, [tickets]); //새로운 티켓이 추가될 때마다 실행하기

    return (
        <div className="left-center recently-view-wrap">
            {
                latestTicket ? (
                    <>
                        <div className="poster-wrap">
                            <div className="poster-img">
                                <img src={latestTicket.poster} alt="포스터 이미지" />
                            </div>
                        </div>
                        <div className="recently-view-info">
                            <h6 className="title">최근 관람한 작품</h6>
                            <div className="info-list-wrap">
                                <p className="title-info">{latestTicket.title}</p>
                                <p className="cast-info">{actorList}</p>
                                <p className="date-info">{latestTicket.date}</p>
                            </div>
                            <div className="edit-btn"><button type="button">티켓 수정</button></div>
                        </div>
                    </>
                ) : (
                    <p className="notice-text">최근 관람한 작품이 없습니다.</p>
                )
            }

        </div>
    )
}

export default RecentRecode;