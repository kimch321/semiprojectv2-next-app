
export async function getServerSideProps() {
    const res = await fetch(`http://localhost:3000/api/board/list`);
    const listData = await res.json()
    console.log({listData} === {...listData})
    return{
        props: {...listData}
    }
}

const List = (props) => {
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
                        Object.values(props)
                            .map((list) => (
                        <tr>
                            <td>{list.bno}</td>
                            <td>{list.title}</td>
                            <td>{list.userid}</td>
                            <td>{list.regdate}</td>
                            <td>{list.views}</td>
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