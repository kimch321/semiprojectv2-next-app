const View = () => {
    return(
        <main>
            <h2>게시판 본문</h2>
            <div id="view">
                <div><label>제목</label>
                    <span>시간은 금이라구,친구! 진짜라구, 친구! 정말이라구친구!
          참말이라구, 친구!</span></div>

                <div><label>작성자</label>
                    <span>siestageek</span></div>

                <div><label>작성일</label>
                    <span>2014-05-05 12:45:05(777)</span></div>

                <div><label className="drgup">본 문</label>
                    <span id="contents">시간은 금이라구,친구! 진짜라구, 친구! 정말이라구친구! 참말이라구,
        친구!시간은 금이라구,친구! 진짜라구, 친구! 정말이라구친구! 참말이
        라구, 친구시간은 금이라구,친구! 진짜라구, 친구! 정말이라구친구!
        참말이라구, 친구!시간은 금이라구,친구! 진짜라구, 친구! 정말이라
        구친구! 참말이라구, 친구!</span></div>

                <div><label></label>
                    <button type="button"
                            onClick="location.href='write.html'">새글쓰기
                    </button>
                    <button type="button">목록으로</button>
                    <button type="button">수정하기</button>
                    <button type="button">삭제하기</button>
                </div>
            </div>
        </main>
    )
}

export default View;