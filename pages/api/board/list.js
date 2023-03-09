import mariadb from 'mariadb';

const dbconfig = {
    host : process.env.MARIADB_HOST,
    user : process.env.MARIADB_USER,
    password : process.env.MARIADB_PWD,
    database : process.env.MARIADB_DB
};

export default async (req, res) => {
    let conn;
    try{

        conn = await mariadb.createConnection(dbconfig);
        const sql = `select bno, title, userid, date_format(regdate, '%y-%m-%d') as regdate ,views from board order by bno desc limit 0, 25`

        const result = await conn.query(sql)

        // 정상 처리 후 응답 : 상태코드 200, 조회결과 반환
        res.status(200).json(result) // json으로 응답
    } catch (err) {
        console.log(err);
        // 처리 실패시 응답 : 상태코드 500, 오류내용 반환
        res.status(500).json(err)
    } finally {
        if(conn) await conn.close();
    }

}