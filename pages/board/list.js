
export async function getServerSideProps(context) {
    const res = await fetch(`http://localhost:3000/api/board/list`);
    const listData = await res.json()

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
                        listData.map((list) => (
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
                <li className="cpage">1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <li>7</li>
                <li>8</li>
                <li>9</li>
                <li>10</li>
                <li>다음</li>
            </ul>
        </main>
    )
}

export default List;