import axios from "axios";
import {getSession, signOut} from "next-auth/client";

export async function getServerSideProps(context) {

    // 세션 객체 가져오기
    const sess = await getSession(context);
    if(!sess) { // 로그인하지 않은 경우 로그인 페이지로 이동
        return {
            redirect:{permanent:false, destination: '/member/login'},
            props:{}
        }
    }

    // let userid = context.query.userid
    // let userid = 'test';
    let userid = sess.user.userid; // 로그인한 사용자아이디
    let url = `http://localhost:3000/api/member/myinfo?userid=${userid}`

    let res = await axios.get(url)
    const member = await res.data[0]

    return {
        props:{member:member,session:sess}
    }
}


const MyInfo = ({member, session}) =>{

    // const [session, loading] = useSession()
    console.log('myinfo -', session?.user?.userid);

    return(
        <main>
            <h2>회원정보</h2>
            <table className="myinfo">
                <>
                    <tr>
                        <td>아이디</td>
                        <td>{member.userid}</td>
                    </tr>
                    <tr>
                        <td>이름</td>
                        <td>{member.name}</td>
                    </tr>
                    <tr>
                        <td>이메일</td>
                        <td>{member.email}</td>
                    </tr>
                    <tr>
                        <td>가입일</td>
                        <td>{member.regdate}</td>
                    </tr>
                </>
        </table>

            {session?.user?.userid ? <button onClick={() => signOut()}>로그아웃하기</button> : <></>}

        </main>
    )
}
export default MyInfo;
