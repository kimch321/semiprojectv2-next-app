
export async function getServerSideProps(context) {

    let res = await fetch(`http://localhost:3000/api/member/myinfo`);
    let userinfo = await res.json()

    return {
        props:{userinfo}
    }
}


const MyInfo = ({userinfo}) =>{
    return(
        <main>
            <h2>회원정보</h2>
            <table className="myinfo">
            {userinfo.map((info) =>(
                <>
                    <tr>
                        <td>아이디</td>
                        <td>{info.USERID}</td>
                    </tr>
                    <tr>
                        <td>이름</td>
                        <td>{info.NAME}</td>
                    </tr>
                    <tr>
                        <td>이메일</td>
                        <td>{info.EMAIL}</td>
                    </tr>
                    <tr>
                        <td>가입일</td>
                        <td>{info.REGDATE}</td>
                    </tr>
                </>
                )
            )}
        </table>
        </main>
    )
}
export default MyInfo;
