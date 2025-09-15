import posterImg from '../img/poster.jpg';

const RecentRecode = () => {
    return (
        <div className="left-center recently-view-wrap">
            <div className="poster-wrap">
                <div className="poster-img">
                    <img src={posterImg} alt="포스터 이미지" />
                </div>
            </div>
            <div className="recently-view-info">
                <h6 className="title">최근 관람한 작품</h6>
                <div className="info-list-wrap">
                    <p className="title-info">지킬앤하이드 - 20주년 기념 공연</p>
                    <p className="cast-info">홍광호, 린아, 김용수 외</p>
                    <p className="date-info">2025.05.10 (토) 14:00</p>
                </div>
                <div className="edit-btn"><button type="button">티켓 수정</button></div>
            </div>
        </div>
    )
}

export default RecentRecode;