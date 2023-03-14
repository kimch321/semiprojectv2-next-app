import Link from "next/link";

// Link로 해두면 프리 렌더링 된다.

const Header = () => {
    return(
        <>
            <header><h1>NextJS 프로젝트 v1</h1></header>
            <nav>
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><a href="/member/join">회원가입</a></li>
                    <li><a href="/member/login">로그인</a></li>
                    <li><Link href="/board/list">게시판</Link></li>
                    <li><Link href="/member/myinfo">회원정보</Link></li>
                </ul>
                <hr/>
            </nav>
        </>
    )
}

export default Header;
