import Board from "/models/Board";

const ppg = 25;

export default async (req, res) => {
    let [ cpg, ftype, fkey ] = [ req.query.cpg, req.query.ftype, req.query.fkey ];

    let stnum = (cpg - 1) * ppg + 1;

    try{
        console.log(`ftype?`,ftype,`fkey?`,fkey)
        let rowData = new Board().select(stnum, ftype, fkey).then((result) => result)

        // 정상 처리 후 응답 : 상태코드 200, 조회결과 반환
        res.status(200).json(await rowData) // json으로 응답
    } catch (err) {
        console.log(err);
        // 처리 실패시 응답 : 상태코드 500, 오류내용 반환
        res.status(500).json(err)
    }

}