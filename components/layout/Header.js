import Link from "next/link";
import {getSession} from "next-auth/client";

// Link로 해두면 프리 렌더링 된다.
// component에는 severSideprops등 사용 불가능.

const Header = ({menu}) => {
    console.log('header1 -', menu)
    return(
        <>
            <header><h1>NextJS 프로젝트 v1</h1></header>
            <nav>
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><a href="/member/join">회원가입</a></li>

                    {/* 문자열을 html 태그로 출력 - dangerouslySetInnerHTML */}
                    <li dangerouslySetInnerHTML={{ __html : menu }}></li>

                    <li><Link href="/board/list">게시판</Link></li>
                    <li><Link href="/member/myinfo">회원정보</Link></li>
                </ul>
                <hr/>
            </nav>
        </>
    )
}

export default Header;
