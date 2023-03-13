import axios from "axios";
import {useState} from "react";
import {check_captcha} from "../../models/Utills";

export async function getServerSideProps(ctx) {

    let bno = ctx.query.bno

    let params = `bno=${bno}`
    let url = `http://localhost:3000/api/board/view?${params}`

    const res = await axios.get(url);
    const board = await res.data[0];

    return {props:{board}}
}

const process_update = async (data) => {
    const cnt = fetch('/api/board/update',
        {method: 'POST', mode:'cors', body: JSON.stringify(data), headers:{'Content-Type': 'application/json'}})
        .then(res => res.json());

    return (await cnt).cnt;
};

export default function Update ({board}) {

    const [title, setTitle] = useState(board.title)
    const [bno, setBno] = useState(board.bno)
    const [contents, setContents] = useState(board.contents);

    const handleupdate = async() => {
        if(grecaptcha.getResponse() && check_captcha(grecaptcha.getResponse())) {
            const data ={title:title, contents:contents, bno:bno}

            if(await process_update(data) >0) {
                location.href='/board/view?bno=' + board.bno;
            }
        }
    };
    const handleInput = (setInput, e) => {
        setInput(e.target.value);
    };
    return(
        <main>
            <script src="https://www.google.com/recaptcha/api.js" async defer></script>
            <div id="main">
                <h2>게시판 수정하기</h2>
                <form name="write" id="writefrm">
                    <div><label htmlFor="title">제목</label>
                        <input type="text" name="title" id="title"
                               defaultValue={board.title}
                               onChange={e => handleInput(setTitle, e)}/></div>

                    <div><label htmlFor="uid">작성자</label>
                        <input type="text" name="uid" id="uid"
                               value={board.userid} readOnly /></div>

                    <div><label htmlFor="contents" className="drgup">본문</label>
                        <textarea name="contents" id="contents"
                                  rows="7" cols="55" defaultValue={board.contents} onChange={e => handleInput(setContents,e)} /></div>

                    <div><label></label>
                        <div className="g-recaptcha cap" data-sitekey={'6LdF4OskAAAAAKHR83Hmsj65DVQqjXqe0BiBwFsP'}></div>
                    </div>

                    <div><label></label>
                        <button type="button" id="writebtn" onClick={handleupdate}>수정완료</button>
                        <button type="reset">다시입력</button>
                    </div>
                </form>
            </div>
        </main>

    );
}