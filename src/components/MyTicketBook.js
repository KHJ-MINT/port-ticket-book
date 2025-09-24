import { useEffect, useState } from "react";

//간단한 통계 표시하기
const getLocalData = () => {
    const storedData = localStorage.getItem('tickets');
    return storedData ? JSON.parse(storedData) : [];
}

const getStatistics = () => {
    const allData = getLocalData();
    const totalCount = allData.length; //총 관람 횟수(전체 데이터 숫자)

    //관람한 작품 수(중복 제외)
    //Set으로 순서가 없는 중복되지 않은 객체 생성.
    //중복 값을 허용하지 않으며, 순서 상관없이 어떤 값이 존재하는지만 다룸.
    //size 속성으로 크기 확인 가능.
    const ticketList = new Set(allData.map(ticket => ticket.title));
    const ticketCount = ticketList.size;

    //가장 많이 관람한 작품
    const titleCount = {};
    allData.forEach(ticket => {
        const title = ticket.title;
        titleCount[title] = (titleCount[title] || 0) + 1;
    });

    let mostLikeTitle = ''; //가장 많이 관람한 작품
    let maxCount = 0; //가장 많이 관람한 횟수

    for (const title in titleCount) {
        if (titleCount[title] > maxCount) {
            maxCount = titleCount[title];
            mostLikeTitle = title;
        }
    }

    return {
        totalCount, //총 관람 횟수
        ticketCount, //관람한 작품 수
        mostLikeTitle //가장 자주 관람한 작품 제목
    };
}

const MyTicketBook = ({ tickets }) => {
    const [stats, setStats] = useState({});

    useEffect(() => {
        const statsData = getStatistics();
        console.log("데이터 : ", statsData);
        setStats(statsData);
    }, [tickets]); //의존성 배열에 tickets 추가

    return (
        <div className="left-top my-ticketbook-wrap">
            <div className="my-ticketbook-container">
                <h6 className="title">마이 티켓북</h6>
                <div className="my-ticketbook-content-wrap">
                    <p className="total-view-count my-ticketbook-content">
                        <span className="total-text content-text">총 관람 횟수 :</span>
                        <span className="count">{stats.totalCount}</span>
                        <span className="total-text text">회</span>
                    </p>
                    <p className="total-theater-count my-ticketbook-content">
                        <span className="total-text content-text">관람한 작품 수 :</span>
                        <span className="count">{stats.ticketCount}</span>
                        <span className="total-text text">개</span>
                    </p>
                    <p className="favorite-show my-ticketbook-content">
                        <span className="favorite-text content-text">가장 많이 관람한 작품 :</span>
                        <span className="favorite-show text">{stats.mostLikeTitle}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default MyTicketBook;