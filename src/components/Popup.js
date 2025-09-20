import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faChevronRight, faChevronLeft, faMagnifyingGlass, faStar } from "@fortawesome/free-solid-svg-icons";

const Popup = ({ onClose }) => {
    //close 버튼을 누르면 input의 모든 내용 삭제(클리어)
    //search input의 검색 버튼을 누르면 뮤지컬 제목 검색
    //검색 후 공연장 정보와 출연진 정보 자동 입력, 포스터 이미지를 가져와 자동 출력
    //1, 2, 3단계 완료 후 티켓을 등록 완료하면 등록 완료 팝업과 함께 티켓 리스트 출력.
    //로컬 데이터베이스에 입력.
    //한 페이지에 최대 6개의 티켓 출력. 6개를 넘기면 페이지네이션 추가.

    const [step, setStep] = useState(1); //초기값은 1로
    const totalStep = 3; //총 3단계

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
                                <input type="text" className="form-input" name="perform-title" placeholder='공연 제목을 입력하세요.' />
                                <button className="popup-search-btn"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                            </div>
                            <div className="form-info-input-wrap">
                                <div className="poster-img-wrap"></div>
                                <div className="content-input-wrap">
                                    <div className="performance-info-wrap">
                                        <input type="text" className='place-input' name='perform-place' placeholder='공연장 정보' />
                                        <input type="date" className="date-input" name='perform-date' />
                                    </div>
                                    <div className="act-info-wrap">
                                        <p className="title">출연진 정보</p>
                                        <div className="act-list-wrap">
                                            <input type="text" className="act-info" name="performer-1" />
                                            <input type="text" className="act-info" name="performer-2" />
                                            <input type="text" className="act-info" name="performer-3" />
                                            <input type="text" className="act-info" name="performer-4" />
                                            <input type="text" className="act-info" name="performer-5" />
                                            <input type="text" className="act-info" name="performer-6" />
                                            <input type="text" className="act-info" name="performer-7" />
                                            <input type="text" className="act-info" name="performer-8" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`second-content-wrap ${step === 2 ? '' : 'close'}`}>
                            <div className="review-star-wrap">
                                <span className='title'>관람 후기</span>
                                <span className="review-star"><FontAwesomeIcon icon={faStar} /></span>
                                <span className="review-star"><FontAwesomeIcon icon={faStar} /></span>
                                <span className="review-star"><FontAwesomeIcon icon={faStar} /></span>
                                <span className="review-star"><FontAwesomeIcon icon={faStar} /></span>
                                <span className="review-star"><FontAwesomeIcon icon={faStar} /></span>
                            </div>
                            <div className="review-textarea-wrap">
                                <textarea name="review" className='review-textarea' placeholder='관람 후기를 작성해주세요.'></textarea>
                            </div>
                        </div>
                        <div className={`third-content-wrap ${step === 3 ? '' : 'close'}`}>
                            <h6 className="title">관람 추가 정보</h6>
                            <div className="add-review-info-wrap">
                                <div className="seat-input-wrap">
                                    <label htmlFor="seat-class">좌석 등급</label>
                                    <select name="seat-class" className="seat-class-select">
                                        <option value="none" selected>등급 선택</option>
                                        <option value="VIP">VIP</option>
                                        <option value="OP">OP</option>
                                        <option value="R">R</option>
                                        <option value="S">S</option>
                                        <option value="A">A</option>
                                    </select>
                                    <span className="text">석</span>
                                </div>
                                <div className="price-input-wrap">
                                    <label htmlFor="seat-price">좌석 가격</label>
                                    <input type="number" name="seat-price" className="seat-price-input" placeholder='1' />
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
                        <button className="next-btn btn"
                            type='button'
                            onClick={handelNext}
                            disabled={step === totalStep}
                        >다음<FontAwesomeIcon icon={faChevronRight} /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Popup;