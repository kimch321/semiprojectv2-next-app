import {useState} from "react";
import {check_captcha, handleInput, hashPassword, process_submit} from "../../models/Utills";
import {getSession} from "next-auth/client";

export async function getServerSideProps(context) {

    // 세션 객체 가져오기
    const sess = await getSession(context);
    if (sess) { // 로그인 한 경우 myinfo로 보낸다.
        return {
            redirect: {permanent: false, destination: '/member/myinfo'},
            props: {}
        }
    }
    return {props: {}}
}



const Join = () =>{

    const [userid, setUserid] = useState('')
    const [passwd, setPasswd] = useState('')
    const [rePasswd, setRePasswd] = useState('');
    const [name, setName] =useState('');
    const [email, setEmail] =useState('');

    const handleJoin = async () => {
        if(userid === '') { alert('아이디는?');
        } else if(passwd === '') { alert('비밀번호는?')
        } else if(rePasswd === '') { alert('비밀번호 확인은?')
        } else if(name === '') { alert('이름 확인은?')
        } else if(email === '') { alert('이메일은?')
        } else {

            if(grecaptcha.getResponse() && check_captcha(grecaptcha.getResponse())) {


                let hshpwd = await hashPassword(passwd)
                const data = {userid:userid,passwd:hshpwd,name:name,email:email}

                if (await process_submit('/api/member/join',data) > 0){
                    location.href='/'
                }
            }
        }
    };

  return(
      <main>
          <script src="https://www.google.com/recaptcha/api.js" async defer></script>
          <h2>회원가입</h2>
          <form name="join">
              <div><label htmlFor="uid">아이디</label>
                  <input type="text" name="uid" id="uid" onChange={e => handleInput(setUserid,e)}/></div>
              <div><label htmlFor="pwd">비밀번호</label>
                  <input type="password" name="pwd" id="pwd" onChange={e => handleInput(setPasswd,e)} /></div>
              <div><label htmlFor="repwd">비밀번호 확인</label>
                  <input type="password" name="repwd" id="repwd" onChange={e => handleInput(setRePasswd,e)} /></div>
              <div><label htmlFor="name">이름</label>
                  <input type="text" name="name" id="name" onChange={e => handleInput(setName,e)} /></div>
              <div><label htmlFor="email">이메일</label>
                  <input type="text" name="email" id="email" onChange={e => handleInput(setEmail,e)} /></div>

              <div><label></label>
                  <div className="g-recaptcha cap" data-sitekey={'6LdF4OskAAAAAKHR83Hmsj65DVQqjXqe0BiBwFsP'}></div>
              </div>

              <div><label></label>
                  <button type="button" onClick={handleJoin}>입력완료</button>
                  <button type="reset">다시입력</button>
              </div>
          </form>
      </main>
  )
}
export default Join;
