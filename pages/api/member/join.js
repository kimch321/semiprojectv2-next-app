import Member from '/models/Member'

export default async(req,res)=> {
    let {userid, passwd, name, email} = req.body;


    try{
    const cnt = new Member(userid, passwd, name, email).insert()
        .then(result => result);

    res.status(200).json(await cnt)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }

}

