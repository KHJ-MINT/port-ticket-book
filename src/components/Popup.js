import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faChevronRight, faChevronLeft, faMagnifyingGlass, faStar } from "@fortawesome/free-solid-svg-icons";

const Popup = ({ onClose }) => {
    return (
        <div className="popup-wrap">
            <div className="popup-container">
                <div className="popup-header">
                    <span className="current-num">1</span><span className="seperate">/</span><span className='total-num'>3</span>
                </div>
                <div className="close-btn"><button type="button" onClick={onClose}><FontAwesomeIcon icon={faXmark} /></button></div>
                <div className="popup-content">
                    <form id="popup-form">
                        <div className="first-content-wrap">
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
                        <div className="second-content-wrap close">
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
                        <div className="third-content-wrap close">
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
                        <button className="prev-btn btn"><FontAwesomeIcon icon={faChevronLeft} />이전</button>
                        <button className="next-btn btn">다음<FontAwesomeIcon icon={faChevronRight} /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Popup;