import axios from "axios";

const check_captcha = async (response) => {
    let url ='/api/board/recaptcha?response=' + response;
    const data = axios.get(url).then(data => data.data);

    return (await data).success;
};

module.exports = { check_captcha }