import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faChevronRight, faChevronLeft, faMagnifyingGlass, faStar } from "@fortawesome/free-solid-svg-icons";

const Popup = ({ onClose, setTickets }) => {
    //close 버튼을 누르면 input의 모든 내용 삭제(클리어)
    //search input의 검색 버튼을 누르면 뮤지컬 제목 검색
    //아래는 검색 시 사용할 api url
    //http://kopis.or.kr/openApi/restful/pblprfr?service=e21a48cc0aaf458f970c39b4a03f017d&stdate={입력한 날짜}&eddate={입력한 날짜}&cpage=1&rows=5&shprfnm={검색어(띄어쓰기없이)}
    //검색 후 공연장 정보와 출연진 정보 자동 입력, 포스터 이미지를 가져와 자동 출력
    //1, 2, 3단계 완료 후 티켓을 등록 완료하면 등록 완료 팝업과 함께 티켓 리스트 출력.
    //로컬 데이터베이스에 입력.
    //한 페이지에 최대 6개의 티켓 출력. 6개를 넘기면 페이지네이션 추가.

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
    const [seatPrice, setSeatPrice] = useState('');

    //검색 결과
    const [searchResult, setSearchResult] = useState([]);

    //공연 검색
    const handleSearch = () => {
        console.log("공연 제목 - ", searchTitle);
        console.log("관람 날짜 - ", searchDate);

        const search_date = searchDate.replace(/-/g, ''); //정규 표현식으로 - 제거

        const api_url = `/openApi/restful/pblprfr?service=e21a48cc0aaf458f970c39b4a03f017d&stdate=${search_date}&eddate=${search_date}&cpage=1&rows=1&shprfnm=${searchTitle}`;
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
                console.log("검색 결과 : ", searchResult);

            })
            .catch(error => {
                console.error('검색 중 에러 발생 : ', error);
                alert("검색에 실패했습니다. 검색어를 확인해 주세요.");
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
        setReview(e.target.value); //상태 업데이트 요청
    }

    useEffect(() => {
        console.log("작성된 리뷰 내용 : ", review);
    }, [review]); //의존성 배열에 review를 넣어 review가 바뀔 때마다 실행

    //별점 입력
    const maxStar = 5;
    const star_list = Array.from({ length: maxStar }, (_, i) => i + 1); //배열의 요소가 비어 있기 때문에 _로 빈 요소 표시
    const handleRatingClick = (clicked) => {
        setRating(clicked);
        console.log(rating);
    }

    //티켓 저장
    const handleFormSubmit = (e) => {
        e.preventDefault(); //새로고침을 방지하기 위한 기본 이벤트 제거

        if (window.confirm('티켓을 등록하시겠습니까?')) {
            if (searchResult.length > 0) {
                //로컬 스토리지에 저장된 기존 정보 가져오기
                const storedTickets = localStorage.getItem('tickets');
                const tickets = storedTickets ? JSON.parse(storedTickets) : [];

                //저장할 티켓의 id 생성
                const newId = tickets.length > 0 ? Math.max(...tickets.map(t => t.id)) + 1 : 1;

                //저장할 티켓 객체 생성
                const form = document.querySelector('#popup-form');
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());

                //저장할 데이터 정리
                const newTicket = {
                    id: newId,
                    title: data['ticket-title'],
                    date: data['ticket-date'],
                    location: data['ticket-place'],
                    cast: cast,
                    rating: rating,
                    poster: searchResult[0].poster,
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
        } else {
            console.log('티켓 저장 취소');
        }
        //팝업 닫기
        onClose();
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
                                <input type="text" className="title-search-input"
                                    name="perform-title" placeholder='공연 제목을 입력하세요.'
                                    value={searchTitle}
                                    autoComplete='off'
                                    onChange={(e) => setSerchTitle(e.target.value)} />
                                <input type="date" className="date-input"
                                    name='perform-date'
                                    value={searchDate}
                                    autoComplete='off'
                                    onChange={(e) => setSearchDate(e.target.value)} />
                                <button type='button' className="popup-search-btn" onClick={handleSearch}>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </button>
                            </div>
                            <p className="notice-text">관람한 공연 제목과 관람 일자를 입력하여 검색하세요.<br />검색 후 공연 제목과 공연장이 자동으로 입력되어 표시됩니다.</p>
                            <div className="form-info-input-wrap">
                                <div className="poster-img-wrap">
                                    {
                                        searchResult.length > 0 ? (
                                            searchResult.map(result => (
                                                <img src={result.poster} alt={result.title} key={result.id} className='search-poster' />
                                            ))
                                        ) : (
                                            ''
                                        )
                                    }
                                </div>
                                <div className="content-input-wrap">
                                    <div className="performance-info-wrap">
                                        <input type="text" readOnly
                                            className='performance-title'
                                            name='ticket-title'
                                            autoComplete='off'
                                            placeholder='공연 제목'
                                            value={
                                                searchResult.length > 0 ? (
                                                    searchResult.map(result => (
                                                        result.title
                                                    ))
                                                ) : (
                                                    ''
                                                )
                                            } />
                                        <input type="text" className='place-input'
                                            name='ticket-place'
                                            placeholder='공연장' readOnly
                                            autoComplete='off'
                                            value={
                                                searchResult.length > 0 ? (
                                                    searchResult.map(result => (
                                                        result.location
                                                    ))
                                                ) : (
                                                    ''
                                                )
                                            } />
                                        <input type="datetime-local" className='view-date-input' name='ticket-date' />
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
                                    star_list.map((star, index) => (
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
                                    <input type="number" name="ticket-seat-price" className="seat-price-input" autoComplete='off' placeholder='1' />
                                    <span className="text">만원</span>
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