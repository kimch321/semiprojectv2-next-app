import Board from "../../../models/Board";

export default async (req, res) => {
    const {title, userid, contents} = req.body;

    try{
        // new Board(null,title,userid,null,contents,null)
        const cnt = Board.newOne(title,userid,contents).insert().then(result => result);

        res.status(200).json({cnt : await cnt});
    } catch (err) {
        res.status(500).json(err)}
}