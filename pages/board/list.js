import {useState} from "react";
//import fetch from 'isomorphic-unfetch'
import axios from 'axios'
import Link from "next/link";

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
    return stpgns
}
const getPgns = (cpg,alpg) => {
    let isprev10 = (cpg - 10 > 0);
    let isnext10 = (cpg + 10 < alpg);
    let isprev = (cpg - 1 > 0);  // 이전 버튼 표시 여부
    let isnext = (cpg < alpg);  // 다음 버튼 표시 여부
    let pgn = {'prev' : cpg - 1, 'next' : cpg + 1,
        'prev10' : cpg - 10 , 'next10' : cpg + 10,
        'isprev' : isprev, 'isnext' : isnext,
        'isprev10' : isprev10 , 'isnext10' : isnext10,
    }; // 이전 : 현재 페이지 -1, 다음 : 현재 페이지 + 1

    return pgn;
}


export async function getServerSideProps(ctx) {
    let [ cpg, ftype, fkey ] = [ ctx.query.cpg, ctx.query.ftype, ctx.query.fkey ];

    // cpg= cpg ? parseInt(cpg) : 1;
    cpg = Number(cpg)
    if(cpg === 0 || isNaN(cpg)) {
        cpg = 1
    } else {
        cpg = cpg
    }


    let params = `cpg=${cpg}`;
    if (fkey) params += `&ftype=${ftype}&fkey=${fkey}`
    let url = `http://localhost:3000/api/board/list?${params}`



    // const res = await fetch(url);    // fetch
    // const listData = await res.json()

    const res = await axios.get(url);    // axios
    const listData = await res.data;

    let alpg = Math.ceil(parseInt(listData.allcnt) / 25);  // 총 페이지수 계산

    //페이지네이션 처리 1
    let stpgns = getStpgns(cpg,alpg)

    // 페이지네이션 처리 2
    let pgn = getPgns(cpg,alpg)

    // 검색시 검색관련 질의문자열 생성
    let qry = fkey ? `&ftype=${ftype}&fkey=${fkey}` : ''

    // 처리 결과를 boards 객체에 추가
    listData.stpgns = stpgns;
    listData.pgn = pgn;
    listData.qry = qry;

    return{props: {listData}}
}
// 반드시 배열을 복사해야 하는 것은 아니었다.
// 넘겨줄때 props를 구조분해 하여서, 편리하게 사용할 수 있다. 이렇게 하면 복잡한 인터페이스를 사용할 필요가 없다.
const List = ({listData}) => {
    const [ftype, setFtype] = useState('title');
    const [fkey, setFkey] = useState(undefined);


    const handletype = (e) => {
        setFtype(e.target.value)

    };
    const handlekey = (e) => {
        setFkey(e.target.value)
    };
    const handlefind = (e) => {
        if(fkey) location.href=`?ftype=${ftype}&fkey=${fkey}`
    };
    const handlewrite = () => {
        location.href='/board/write';
    };
    return(
        <main>
            <h2>게시판</h2>
            <table className="board">
                <tr>
                    <td colSpan="3" className="alignlft">
                        <select name="ftype" id="ftype" onChange={handletype}>
                            <option value="title">제 목</option>
                            <option value="userid">작성자</option>
                            <option value="contents">본 문</option>
                        </select>
                        <input type="text" name="fkey" id="fkey" onChange={handlekey}/>
                        <button type="button" id="findbtn" onClick={handlefind}>검색하기</button>
                    </td>
                    <td colSpan="2" className="alignrgt">
                        <button type="button" id="newbtn" onClick={handlewrite}>새글쓰기</button>
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
                        listData.boards.map((list) => (
                        <tr key={list.bno}>
                            <td key={list.bno}>{list.bno}</td>
                            <td key={list.title}><Link href={`/board/view?bno=${list.bno}`}>{list.title}</Link></td>
                            <td key={list.userid}>{list.userid}</td>
                            <td key={list.regdate}>{list.regdate}</td>
                            <td key={list.views}>{list.views}</td>
                        </tr>
                        )
                    )}
            </table>

            <ul className="pagenation">
                {
                    listData.pgn.isprev10 ? <li><a href={`?cpg=${listData.pgn.prev10}${listData.qry}`}>이전10</a></li> : ''
                }
                {
                    listData.pgn.isprev ? <li><a href={`?cpg=${listData.pgn.prev}${listData.qry}`}>이전</a></li> : ''
                }

                {
                    listData.stpgns.map(pgn => (
                        pgn.iscpg ?
                        <li key={pgn.num} className={'cpage'}>{pgn.num}</li> :
                        <li key={pgn.num}><a href={`?cpg=${pgn.num}${listData.qry}`}>{pgn.num}</a></li>
                    ))
                }

                {
                    listData.pgn.isnext ? <li><a href={`?cpg=${listData.pgn.next}${listData.qry}`}>다음</a></li> : ''
                }
                {
                    listData.pgn.isnext10 ? <li><a href={`?cpg=${listData.pgn.next10}${listData.qry}`}>다음10</a></li> : ''
                }
            </ul>
        </main>
    )
}

export default List;