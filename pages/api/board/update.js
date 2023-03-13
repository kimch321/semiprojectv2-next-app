import Board from "../../../models/Board";

export default async (req, res) => {
    const {title, contents, bno} = req.body;


    try{
        const cnt = Board.modifyOne(title,contents,bno).update().then(result => result)
        res.status(200).json({cnt : await cnt})
    } catch (err) {
        res.status(500).json(err)
    }
}