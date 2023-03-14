import axios from "axios";
import {signOut, useSession} from "next-auth/client";

export async function getServerSideProps(context) {
    // let userid = context.query.userid
    let userid = 'test';
    let url = `http://localhost:3000/api/member/myinfo?userid=${userid}`
    let res = await axios.get(url)
    const member = await res.data[0]


    return {
        props:{member}
    }
}


const MyInfo = ({member}) =>{

    const [session, loading] = useSession()
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
