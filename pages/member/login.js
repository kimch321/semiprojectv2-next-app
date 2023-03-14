import {useState} from "react";
import {handleInput} from "../../models/Utills";
import axios from "axios";


const Login = () =>{
    const [userid, setUserid] = useState('')
    const [passwd, setPasswd] = useState('')

    const handlelogin = async () => {

        let params = `?userid=${userid}&passwd=${passwd}`;
        let url = `http://localhost:3000/api/member/login${params}`
        let res = await axios.get(url)
        const member = await res.data[0]
        console.log(member)

    }

    return(
      <main>
          <h2>로그인</h2>
          <form name="login">
              <div><label htmlFor="uid">아이디</label>
                  <input type="text" id="uid"
                         onChange={e => handleInput(setUserid,e)}/></div>
              <div><label htmlFor="pwd">비밀번호</label>
                  <input type="password" id="pwd"
                         onChange={e => handleInput(setPasswd,e)}/></div>
              <div><label></label>
                  <button type="button" onClick={handlelogin}>로그인</button>
              </div>
          </form>
      </main>
  )
}
export default Login;
