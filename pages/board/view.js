import axios from 'axios'

//http://localhost:3000/board/view?bno=1985
export async function getServerSideProps(ctx) {

    let bno = ctx.query.bno

    let params = `bno=${bno}`
    let url = `http://localhost:3000/api/board/view?${params}`

    const res = await axios.get(url);
    const viewData = await res.data[0];

    return {props:{viewData}}
}

const View = ({viewData}) => {

    const newOne = () => {
        location.href=`/board/write`
    };
    const goToList = () => {
        location.href=`/board/list`
    };
    const updateOne = () => {
        location.href=`/board/update?bno=${viewData.bno}`
    };
    const deleteOne = () => {
        if(confirm('정말 삭제하시겠습니까?')) location.href=`/api/board/delete?bno=${viewData.bno}`
    };

    return (
            <main>
                <h2>게시판 본문</h2>
                <div id="view">
                    <div><label>제목</label>
                        <span>{viewData.title}</span></div>

                    <div><label>작성자</label>
                        <span>{viewData.userid}</span></div>

                    <div><label>작성일</label>
                        <span>{viewData.regdate}({viewData.views})</span></div>

                    <div><label className="drgup">본 문</label>
                        <span id="contents">{viewData.contents}</span></div>

                    <input type="hidden" id="bno" value="" />
                    <input type="hidden" id="uid" value="" />

                    <div><label></label>
                        <button type="button"
                                onClick={newOne}>새글쓰기</button>
                        <button type="button"
                                onClick={goToList}>목록으로</button>
                        <button type="button" id="updatebtn" onClick={updateOne}>수정하기</button>
                        <button type="button" id="deletebtn" onClick={deleteOne}>삭제하기</button>
                    </div>
                </div>
            </main>
    )
}

export default View;