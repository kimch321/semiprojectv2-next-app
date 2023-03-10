const getStpgns = (cpg,alpg) => {
    let stpgn = parseInt((cpg - 1) / 10) * 10 + 1; // 페이지네이션 시작값 계산
    let stpgns = [];
    for (let i = stpgn; i < stpgn + 10; ++i) {
        if (i <= alpg) {  // i가 총페이지수보다 같거나 작을때 i 출력
            let iscpg = (i == cpg) ? true : false;  // 현재페이지 표시
            let pgn = {'num': i, 'iscpg': iscpg};
            stpgns.push(pgn);
        }
    }
    return stpgns;
}


export async function getServerSideProps(ctx) {
    let [ cpg, ftype, fkey ] = [ ctx.query.cpg, ctx.query.ftype, ctx.query.fkey ];

    cpg= cpg ? parseInt(cpg) : 1;
    let params = `cpg=${cpg}`;
    let url = `http://localhost:3000/api/board/list?${params}`

    const res = await fetch(url);
    const listData = await res.json()

    let alpg = Math.ceil(parseInt(listData.allcnt) / 25);  // 총 페이지수 계산

    //페이지네이션 처리 1
    let stpgns = getStpgns(cpg,alpg)

    //처리 결과를 boards 객체에 추가
    listData.stpgns = stpgns;

    return{props: {listData}}
}
// 반드시 배열을 복사해야 하는 것은 아니었다.
// 넘겨줄때 props를 구조분해 하여서, 편리하게 사용할 수 있다. 이렇게 하면 복잡한 인터페이스를 사용할 필요가 없다.
const List = ({listData}) => {
    return(
        <main>
            <h2>게시판</h2>
            <table className="board">
                <tr>
                    <td colSpan="5" className="alignrgt">
                        <button type="button">새글쓰기</button>
                    </td>
                </tr>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                    <th>조회</th>
                </tr>
                    {
                        listData["boards"].map((list) => (
                        <tr key={list.bno}>
                            <td key={list.bno}>{list.bno}</td>
                            <td key={list.title}>{list.title}</td>
                            <td key={list.userid}>{list.userid}</td>
                            <td key={list.regdate}>{list.regdate}</td>
                            <td key={list.views}>{list.views}</td>
                        </tr>
                        )
                    )}
            </table>

            <ul className="pagenation">
                <li className="prev">이전</li>
                {
                    listData.stpgns.map(pgn => (
                        pgn.iscpg ?
                        <li key={pgn.num} className={'cpage'}>{pgn.num}</li> :
                        <li key={pgn.num}><a href={`?cpg=${pgn.num}`}>{pgn.num}</a></li>
                    ))
                }
                <li>다음</li>
            </ul>
        </main>
    )
}

export default List;