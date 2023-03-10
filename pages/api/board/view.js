import Board from "/models/Board";

export default async (req, res) => {
    let bno = req.query.bno;

    try{
        let rowData = new Board().selectOne(bno).then((result) => result)

        // 정상 처리 후 응답 : 상태코드 200, 조회결과 반환
        res.status(200).json(await rowData) // json으로 응답
    } catch (err) {
        console.log(err);
        // 처리 실패시 응답 : 상태코드 500, 오류내용 반환
        res.status(500).json(err)
    }
}