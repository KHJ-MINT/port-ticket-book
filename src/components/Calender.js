import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faAnglesLeft, faAnglesRight, faCalendarPlus, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { addDays, addMonths, addYears, endOfMonth, endOfWeek, format, isSaturday, isSunday, startOfMonth, startOfWeek, subMonths, subYears } from 'date-fns';
import { useState } from 'react';

const Calender = () => {
    //현재 달 설정
    const [curDate, setCurDate] = useState(new Date()); //오늘
    const monthStart = startOfMonth(curDate); //현재 달의 시작 날짜
    const monthEnd = endOfMonth(monthStart); //현재 달의 마지막 날짜
    const startDate = startOfWeek(monthStart); //현재 달의 첫 주 시작 날짜
    const endDate = endOfWeek(monthEnd); //현재 달의 마지막 주 마지막 날짜

    //요일 만들기
    const weekArr = ["일", "월", "화", "수", "목", "금", "토"];
    const week = weekArr.map((item, idx) => {
        return <div className="cal-week-item" key={idx}>{item}</div>;
    });

    //날짜 만들기
    const monthDays = []; //한 달 전체
    let startDay = startDate; //현재 달의 시작 날짜
    let weekDays = []; //한 주 전체
    let formatDate = ""; //하루 날짜의 데이터

    //현재 달의 첫 주 시작 날짜부터 하나씩 더하다
    //현재 달의 마지막 주 마지막 날짜보다 커지면 종료
    while (startDay <= endDate) {
        for (let i = 0; i < 7; i++) { //한 주만큼 반복
            formatDate = format(startDay, "d"); //날짜 데이터를 숫자로 format
            weekDays.push(
                <div className="cal-date-item">
                    <span
                        style={{
                            color:
                            format(curDate, "M") !== format(startDay, "M") //이번 달이 아니면 회색
                            ? "#ddd"
                            : isSunday(startDay) //일요일은 빨간색
                            ? "red"
                            : isSaturday(startDay) //토요일은 파란색
                            ? "blue"
                            : "#111", //그 외는 검은색
                        }}
                    >
                        {formatDate}
                    </span>
                    <p className="schedule">공연 일정</p>
                </div>
            );
            startDay = addDays(startDay, 1); //하루를 삽입하고 날짜를 하루 더하기
        }
        //for문 종료 시 한 주의 날짜가 한 주 데이터에 모두 삽입된 것임.
        //한 주 데이터를 한 달 전체 데이터에 삽입
        monthDays.push(
            <div className="cal-week-wrap" key={startDay}>{weekDays}</div>
        );
        //다음 주 데이터를 위해 한 주의 데이터 추가가 완료되면 초기화
        weekDays = []; 
    }

    // < 화살표를 눌렀을 때 달 바꾸기
    const prevMonth = () => {
        setCurDate(subMonths(curDate, 1));
    };
    const nextMonth = () => {
        setCurDate(addMonths(curDate, 1));
    }

    // << 화살표를 눌렀을 때 연도 바꾸기
    const prevYear = () => {
        setCurDate(subYears(curDate, 1));
    }
    const nextYear = () => {
        setCurDate(addYears(curDate, 1));
    }

    return (
        <div className="calender-schedule-wrap">
            <div className="calender-wrap">
                <div className="cal-header-wrap">
                    <div className="cal-title-wrap">
                        <div className="prev-year-btn">
                            <button onClick={prevYear}>
                                <FontAwesomeIcon icon={faAnglesLeft} />
                            </button>
                        </div>
                        <div className="prev-month-btn">
                            <button onClick={prevMonth}>
                                <FontAwesomeIcon icon={faAngleLeft} />
                            </button>
                        </div>
                        <div className="cal-title-wrap">
                            <h6 className="title">
                                {format(curDate, "yyyy")}년 {format(curDate, "M")}월
                            </h6>
                        </div>
                        <div className="next-month-btn">
                            <button onClick={nextMonth}>
                                <FontAwesomeIcon icon={faAngleRight} />
                            </button>
                        </div>
                        <div className="next-year-btn">
                            <button onClick={nextYear}>
                                <FontAwesomeIcon icon={faAnglesRight} />
                            </button>
                        </div>
                    </div>
                    <div className="cal-plus-btn-wrap">
                        <button className="cal-plus-btn">
                            <FontAwesomeIcon icon={faCalendarPlus} />
                            <span className="txt">일정 추가</span>
                        </button>
                    </div>
                </div>
                <div className="cal-body-wrap">
                    <div className="cal-week-wrap">
                        <div className="cal-date-wrap">
                            {week}
                        </div>
                    </div>
                    <div className="cal-date-wrap">
                        {monthDays}
                    </div>
                </div>
            </div>
            <div className="schedule-side-wrap">
                <div className="schedule-list-wrap">
                    <div className="schedule-list-item-wrap">
                        <div className="item-header-wrap">
                            <div className="item-btn-wrap">
                                <button className="item-btn"><FontAwesomeIcon icon={faPenToSquare} /></button>
                            </div>
                            <div className="item-btn-wrap">
                                <button className="item-btn"><FontAwesomeIcon icon={faTrash} /></button>
                            </div>
                        </div>
                        <div className="item-content-wrap">
                            <div className="content-container">
                                <div className="schedule-info">
                                    <span className="info-title">공연 제목 : </span><span className="info-txt">지킬앤하이드</span>
                                </div>
                                <div className="schedule-info">
                                    <span className="info-title">공연 일시 : </span><span className="info-txt">2025-05-10</span>
                                </div>
                                <div className="schedule-info">
                                    <span className="info-title">공연 장소 : </span><span className="info-txt">블루스퀘어 신한카드홀</span>
                                </div>
                                <div className="schedule-info">
                                    <span className="info-title">메모 : </span><span className="info-txt">홍광호 배우님 마지막 관람</span>
                                </div>
                            </div>
                        </div>
                        <div className="item-footer-wrap">
                            <div className="item-btn-wrap">
                                <button className="item-btn">후기 작성</button>
                            </div>
                        </div>
                    </div>
                    <div className="schedule-list-item-wrap">
                        <div className="item-header-wrap">
                            <div className="item-btn-wrap">
                                <button className="item-btn"><FontAwesomeIcon icon={faPenToSquare} /></button>
                            </div>
                            <div className="item-btn-wrap">
                                <button className="item-btn"><FontAwesomeIcon icon={faTrash} /></button>
                            </div>
                        </div>
                        <div className="item-content-wrap">
                            <div className="content-container">
                                <div className="schedule-info">
                                    <span className="info-title">공연 제목 : </span><span className="info-txt">지킬앤하이드</span>
                                </div>
                                <div className="schedule-info">
                                    <span className="info-title">공연 일시 : </span><span className="info-txt">2025-05-17</span>
                                </div>
                                <div className="schedule-info">
                                    <span className="info-title">공연 장소 : </span><span className="info-txt">블루스퀘어 신한카드홀</span>
                                </div>
                                <div className="schedule-info">
                                    <span className="info-title">메모 : </span><span className="info-txt">신성록 배우님 서울 마지막 공연</span>
                                </div>
                            </div>
                        </div>
                        <div className="item-footer-wrap">
                            <div className="item-btn-wrap">
                                <button className="item-btn">후기 작성</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calender;