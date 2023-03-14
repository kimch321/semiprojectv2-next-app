// /member/login?userid=test&passwd=test


import Member from "../../../models/Member";

export default async (req, res) => {

    let {userid, passwd} = req.query

    try{
        let loginData = new Member().login(userid,passwd).then(result=> result)
        console.log(await loginData)
        res.status(200).json(await loginData)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }

}