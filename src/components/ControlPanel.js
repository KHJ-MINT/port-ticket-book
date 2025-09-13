const ControlPanel = () => {
    return (
        <div className="control-panel-wrap">
            <div className="control-panel-container">
                <div className="control-btn order-filter">
                    <button type="button" className="order-filter-btn">
                        <span className="btn-icon">아이콘</span>
                        <span className="btn-txt">정렬 및 필터</span>
                    </button>
                </div>
                <div className="control-btn add-ticket">
                    <button type="button" className="add-ticket-btn">
                        <span className="btn-icon">아이콘</span>
                        <span className="btn-txt">티켓 추가하기</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ControlPanel;