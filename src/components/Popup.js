import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faChevronRight, faChevronLeft, faMagnifyingGlass, faStar } from "@fortawesome/free-solid-svg-icons";

const Popup = ({ onClose, setTickets, isEdit = false, ticket, onMiniPopupOpen }) => {
    //티켓 입력 단계 관리
    const [step, setStep] = useState(1); //초기값은 1로
    const totalStep = 3; //총 3단계

    //티켓 등록 전 공연 검색어 상태 관리
    const [searchTitle, setSerchTitle] = useState('');
    const [searchDate, setSearchDate] = useState('');

    //티켓 등록 관련 상태 관리
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [poster, setPoster] = useState('');
    const [location, setLocation] = useState('');
    const [cast, setCast] = useState(Array.from({ length: 8 }, () => ({ actor: '', role: '' })));
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [seatClass, setSeatClass] = useState('none');
    const [seatPrice, setSeatPrice] = useState(0);

    //검색 결과
    const [searchResult, setSearchResult] = useState([]);
    const [isSearched, setIsSearched] = useState(false);

    const handleSelectResult = (searchResult) => {
        setTitle(searchResult.title);
        setLocation(searchResult.location);
        setPoster(searchResult.poster);

        setIsSearched(false);
    }

    //티켓 수동 입력 모드 전환
    const [isMaunualMode, setIsMaunualMode] = useState(false);

    const handleSwitchToManualMode = () => {
        setIsMaunualMode(true);
        setSearchResult([]);
        setIsSearched(false);
    }

    //공연 검색
    const handleSearch = () => {
        // console.log("공연 제목 - ", searchTitle);
        // console.log("관람 날짜 - ", searchDate);
        if (searchTitle === '' || searchDate === '') {
            alert("공연 제목 또는 관람 날짜가 선택되지 않았습니다.");
            return false;
        }

        const search_date = searchDate.replace(/-/g, ''); //정규 표현식으로 - 제거

        const api_url = `/openApi/restful/pblprfr?service=e21a48cc0aaf458f970c39b4a03f017d&stdate=${search_date}&eddate=${search_date}&cpage=1&rows=10&shprfnm=${searchTitle}`;
        //console.log(api_url);

        fetch(api_url)
            .then(res => {
                //응답 확인
                if (!res.ok) {
                    throw new Error('응답에 문제가 발생했습니다!');
                }
                return res.text(); //json이 아닌 텍스트로 결과를 받음.
            })
            .then(str => {
                //api로부터 받은 데이터 처리
                //console.log('검색 결과 : ', str);
                // 텍스트를 xml 문서 객체로 파싱
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(str, "text/xml");
                //console.log(xmlDoc);

                const performances = Array.from(xmlDoc.querySelectorAll('dbs > db')).map(el => ({
                    id: el.querySelector('mt20id')?.textContent,
                    title: el.querySelector('prfnm')?.textContent,
                    poster: el.querySelector('poster')?.textContent,
                    location: el.querySelector('fcltynm')?.textContent
                }));

                setSearchResult(performances);
                setIsSearched(true);
                //console.log("검색한 날짜 :", searchDate);
                //console.log("검색 결과 : ", searchResult);
                if (performances.length === 0) {
                    alert("검색 결과가 없습니다. 수동으로 입력해 주세요.");
                    handleSwitchToManualMode();
                    setIsSearched(true);
                }
            })
            .catch(error => {
                console.error('검색 중 에러 발생 : ', error);
                alert("검색에 실패했습니다. 수동으로 입력해 주세요.");
                handleSwitchToManualMode();
                setIsSearched(true);
                return false;
            })
    }

    //출연진 입력값
    const handleCastChange = (idx, event) => {
        const { name, value } = event.target;
        const newCast = [...cast]; //상태 불변성을 위한 배열 복사

        if (name === 'actor') {
            newCast[idx].actor = value;
        } else if (name === 'role') {
            newCast[idx].role = value;
        }

        setCast(newCast);
        // console.log(newCast);
        // console.log("상태변화 체크! : ", cast);
    }

    //공연 리뷰 입력값
    const handleReviewChange = (e) => {
        //관람 후기의 유효성 검사
        let reviewValue = e.target.value;
        reviewValue = reviewValue.replace(/</g, '&lt;').replace(/>/g, '&gt;'); // <, > 가 입력되면 자동으로 html 엔티티로 변경되도록 하기

        setReview(reviewValue); //상태 업데이트 요청
    }

    useEffect(() => {
        //console.log("작성된 리뷰 내용 : ", review);
    }, [review]); //의존성 배열에 review를 넣어 review가 바뀔 때마다 실행

    //별점 입력
    const maxStar = 5;
    const starList = Array.from({ length: maxStar }, (_, i) => i + 1); //배열의 요소가 비어 있기 때문에 _로 빈 요소 표시
    const handleRatingClick = (clicked) => {
        setRating(clicked);
        //console.log(rating);
    }

    //수동 입력 시 제목, 장소 입력
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    }

    //관람 시간 형식 변경
    const formatDate = (date) => {
        //date 객체로 변환
        const dateString = new Date(date);

        //date 객체에서 날짜와 시간 정보 추출
        const year = dateString.getFullYear(); //연도
        const month = String(dateString.getMonth() + 1).padStart(2, '0'); //월. 한 자리일 경우 앞에 '0' 추가하기 위해 padStart 함수 사용
        const day = String(dateString.getDate()).padStart(2, '0'); //일.
        let hours = dateString.getHours(); //시간은 변경되어야 하기 때문에 let으로 선언
        const minutes = String(dateString.getMinutes()).padStart(2, '0'); //분

        //시간의 경우 오전 오후 구분
        const ampm = hours >= 12 ? '오후' : '오전';
        hours = hours % 12;
        hours = hours ? hours : 12; //0시를 12시로 변환
        hours = String(hours).padStart(2, '0');

        return `${year}.${month}.${day} ${ampm} ${hours}:${minutes}`;
    }

    //티켓을 수정할 때 날짜 형식 변경하기
    function toDatetimeLocal(dateStr) {
        const match = dateStr.match(/(\d{4})\.(\d{2})\.(\d{2})\s(오전|오후)\s(\d{2}):(\d{2})/);
        if (!match) return '';

        let [_, year, month, day, ampm, hour, minute] = match;
        hour = parseInt(hour, 10);
        if (ampm === '오후' && hour < 12) hour += 12;
        if (ampm === '오전' && hour === 12) hour = 0;
        return `${year}-${month}-${day}T${String(hour).padStart(2, '0')}:${minute}`;
    }

    //티켓 수정하기
    useEffect(() => {
        if (isEdit && ticket) {
            setTitle(ticket.title || '');
            setDate(toDatetimeLocal(ticket.date) || '');
            setLocation(ticket.location || '');
            setPoster(ticket.poster || '');
            setCast(ticket.cast || Array.from({ length: 8 }, () => ({ actor: '', role: '' })));
            setRating(ticket.rating || 0);
            setReview(ticket.review || '');
            setSeatClass(ticket.seatClass || 'none');
            setSeatPrice(ticket.seatPrice || 0);
        }
    }, [isEdit, ticket]);

    //티켓 저장
    const handleFormSubmit = (e) => {
        e.preventDefault(); //새로고침을 방지하기 위한 기본 이벤트 제거

        if (isEdit && ticket) {
            if (window.confirm('티켓 정보를 수정하시겠습니까?')) {
                //수정할 티켓 객체 생성
                const storedTickets = localStorage.getItem('tickets');
                const tickets = storedTickets ? JSON.parse(storedTickets) : [];

                const updatedTickets = tickets.map(t =>
                    t.id === ticket.id ? {
                        ...t,
                        title,
                        date: formatDate(date),
                        poster,
                        location,
                        cast,
                        rating,
                        review,
                        seatClass,
                        seatPrice
                    }
                        : t
                );
                localStorage.setItem('tickets', JSON.stringify(updatedTickets));
                setTickets(updatedTickets);
            }
            //팝업 닫기
            onClose();
        } else if (window.confirm('티켓을 등록하시겠습니까?')) {
            if (searchResult.length > 0 || isMaunualMode) {
                //저장할 티켓 객체 생성
                const form = document.querySelector('#popup-form');
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());

                //로컬 스토리지에 저장된 기존 정보 가져오기
                const storedTickets = localStorage.getItem('tickets');
                const tickets = storedTickets ? JSON.parse(storedTickets) : [];

                //출연진 배열에서 빈 값 제거
                //배우와 배역이 모두 입력 된 경우에만 빈 값 제거하기.
                const filterCast = cast.filter(item => {
                    return item.actor.trim() !== '' && item.role.trim() !== '';
                });

                //정보 미입력 방지하기
                if (filterCast.length === 0) {
                    alert("출연진 정보를 입력하지 않았습니다.");
                    return false;
                }

                if (rating === 0) {
                    alert("관람 후기의 별점을 선택하지 않았습니다.");
                    return false;
                }

                if (review === '' || review === undefined) {
                    alert("관람 후기를 작성하지 않았습니다.");
                    return false;
                }

                if (data['ticket-seat-class'] === 'none') {
                    alert("좌석 등급이 선택되지 않았습니다.");
                    return false;
                }

                if (data['ticket-seat-price'] === '' || data['ticket-seat-price'] === undefined) {
                    alert("좌석 가격을 입력하지 않았거나 숫자가 아닌 문자로 입력하였습니다.");
                    return false;
                }

                //저장할 티켓의 id 생성
                const newId = tickets.length > 0 ? Math.max(...tickets.map(t => t.id)) + 1 : 1;

                //저장하기 전 관람 일자 형식 변경
                const formatedDate = formatDate(data['ticket-date']);

                //포스터 이미지가 없는 경우 기본 이미지 지정
                const poster = searchResult.length > 0 ? searchResult[0].poster : '';

                //저장할 데이터 정리
                const newTicket = {
                    id: newId,
                    title: data['ticket-title'],
                    date: formatedDate,
                    location: data['ticket-place'],
                    cast: filterCast,
                    rating: rating,
                    poster: poster,
                    review: review,
                    seatClass: data['ticket-seat-class'],
                    seatPrice: data['ticket-seat-price']
                }

                //저장할 티켓을 배열에 추가
                tickets.push(newTicket);

                //저장할 티켓이 추가된 배열을 다시 로컬 스토리지에 저장
                localStorage.setItem('tickets', JSON.stringify(tickets));
                setTickets(tickets);
                console.log("최종 저장할 정보 : ", newTicket);
            } else {
                alert('등록할 티켓의 공연이 검색되지 않았습니다!');
                return false;
            }
            //팝업 닫기
            onClose();
            //미니 팝업 열기
            onMiniPopupOpen();
        } else {
            console.log('티켓 저장 취소');
        }

    }

    //다음 버튼 클릭 시
    const handelNext = () => {
        setStep(prev => (prev < totalStep ? prev + 1 : prev)); //prev가 totalStep보다 작으면 1씩 증가
    };

    const handelPrev = () => {
        setStep(prev => (prev > 1 ? prev - 1 : prev)); //prev가 1보다 크면 1씩 감소
    }

    return (
        <div className="popup-wrap">
            <div className="popup-container">
                <div className="popup-header">
                    <span className="current-num">{step}</span><span className="seperate">/</span><span className='total-num'>{totalStep}</span>
                </div>
                <div className="close-btn"><button type="button" onClick={onClose}><FontAwesomeIcon icon={faXmark} /></button></div>
                <div className="popup-content">
                    <form id="popup-form">
                        <div className={`first-content-wrap ${step === 1 ? '' : 'close'}`}>
                            <div className="form-input-wrap">
                                <div className="search-input-wrap">
                                    <input type="text" className="title-search-input"
                                        name="perform-title" placeholder='공연 제목을 입력하세요.'
                                        value={searchTitle}
                                        autoComplete='off'
                                        onChange={(e) => setSerchTitle(e.target.value)} />
                                    <input type="date" className="date-input"
                                        name='perform-date'
                                        value={searchDate}
                                        autoComplete='off'
                                        onChange={(e) => {
                                            setSearchDate(e.target.value);
                                            setDate(e.target.value + 'T00:00');
                                        }} />
                                    <button type='button' className="popup-search-btn" onClick={handleSearch}>
                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                                    </button>
                                </div>
                                {
                                    isSearched && (
                                        <div className="search-result-wrap">
                                            <ul className="search-result-list">
                                                {
                                                    searchResult.length > 0 ? (
                                                        searchResult.map((result, index) => (
                                                            <li key={index} className="search-result-list-item" onClick={() => handleSelectResult(result)}>
                                                                <p className="search-result result-title"><span>공연 제목 : </span>{result.title}</p>
                                                                <p className="search-result restult-location"><span>공연 장소 : </span>{result.location}</p>
                                                            </li>
                                                        ))
                                                    ) : (
                                                        <li className="result-notice" onClick={handleSwitchToManualMode()}>검색 결과가 없습니다.</li>
                                                    )
                                                }
                                            </ul>
                                        </div>
                                    )
                                }

                            </div>
                            <p className="notice-text search-notice-text">관람한 공연 제목과 관람 일자를 입력하여 검색하세요.<br />검색 후 공연 제목과 공연장이 자동으로 입력되어 표시됩니다.</p>
                            <div className="form-info-input-wrap">
                                <div className="poster-img-wrap">
                                    {poster && <img src={poster} alt={title} className='search-poster' />}
                                    {!poster && <p className='notice-text'>포스터가 없습니다.</p>}
                                </div>
                                <div className="content-input-wrap">
                                    <div className="performance-info-wrap">
                                        <input type="text" readOnly={!isMaunualMode}
                                            className='performance-title'
                                            name='ticket-title'
                                            autoComplete='off'
                                            placeholder='공연 제목'
                                            value={title}
                                            onChange={(e) => handleTitleChange(e)}
                                        />
                                        <input type="text" className='place-input'
                                            name='ticket-place'
                                            placeholder='공연장' readOnly={!isMaunualMode}
                                            autoComplete='off'
                                            value={location}
                                            onChange={(e) => handleLocationChange(e)}
                                        />
                                        <input type="datetime-local"
                                            className='view-date-input'
                                            name='ticket-date'
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                        />
                                    </div>
                                    <div className="act-info-wrap">
                                        <p className="title">출연진 정보<span className='small-text'>(최대 8명 입력 가능합니다.)</span></p>
                                        <div className="act-list-wrap">
                                            {cast.map((item, index) => (
                                                <div className="actor-input-container" key={index}>
                                                    <input
                                                        type="text"
                                                        className="act-info"
                                                        name="actor" placeholder='배우명'
                                                        value={item.actor}
                                                        autoComplete='off'
                                                        onChange={(e) => handleCastChange(index, e)}
                                                    />
                                                    <input
                                                        type="text"
                                                        className='cast-info'
                                                        name='role' placeholder='배역명'
                                                        value={item.role}
                                                        autoComplete='off'
                                                        onChange={(e) => handleCastChange(index, e)}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`second-content-wrap ${step === 2 ? '' : 'close'}`}>
                            <div className="review-star-wrap">
                                <span className='title'>관람 후기</span>
                                {
                                    starList.map((star, index) => (
                                        <span className={star <= rating ? 'review-star filled' : 'review-star'}
                                            key={index}
                                            onClick={() => handleRatingClick(star)}
                                        >
                                            <FontAwesomeIcon icon={faStar} />
                                        </span>
                                    ))
                                }
                            </div>
                            <div className="review-textarea-wrap">
                                <textarea name="ticket-review" className='review-textarea' placeholder='관람 후기를 작성해주세요.' value={review} onChange={(e) => handleReviewChange(e)}></textarea>
                            </div>
                        </div>
                        <div className={`third-content-wrap ${step === 3 ? '' : 'close'}`}>
                            <h6 className="title">관람 추가 정보</h6>
                            <div className="add-review-info-wrap">
                                <div className="seat-input-wrap">
                                    <label htmlFor="seat-class">좌석 등급</label>
                                    <select name="ticket-seat-class"
                                        className="seat-class-select"
                                        value={seatClass}
                                        onChange={(e) => setSeatClass(e.target.value)}
                                    >
                                        <option value="none" defaultValue>등급 선택</option>
                                        <option value="VIP">VIP</option>
                                        <option value="OP">OP</option>
                                        <option value="R">R</option>
                                        <option value="S">S</option>
                                        <option value="A">A</option>
                                        <option value="기타">기타</option>
                                    </select>
                                    <span className="text">석</span>
                                </div>
                                <div className="price-input-wrap">
                                    <label htmlFor="seat-price">좌석 가격</label>
                                    <input type="number"
                                        name="ticket-seat-price"
                                        className="seat-price-input"
                                        autoComplete='off'
                                        placeholder='10000'
                                        value={seatPrice}
                                        onChange={(e) => setSeatPrice(e.target.value)}
                                    />
                                    <span className="text">원</span>
                                </div>
                            </div>
                            <p className="notice-text">입력한 정보는 관람 통계에 사용됩니다.</p>
                        </div>
                    </form>
                </div>
                <div className="popup-footer">
                    <div className="popup-btn-wrap">
                        <button className="prev-btn btn"
                            type='button'
                            onClick={handelPrev}
                            disabled={step === 1}
                        ><FontAwesomeIcon icon={faChevronLeft} />이전</button>
                        {
                            step < totalStep ? (
                                <button className="next-btn btn"
                                    type='button'
                                    onClick={handelNext}
                                >다음<FontAwesomeIcon icon={faChevronRight} /></button>
                            ) : (
                                <button className="next-btn btn"
                                    type='submit'
                                    onClick={handleFormSubmit}
                                >등록<FontAwesomeIcon icon={faChevronRight} /></button>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Popup;