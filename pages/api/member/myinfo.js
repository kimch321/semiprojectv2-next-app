import oracledb from 'oracledb'

const dbconfig = {
    connectString : process.env.ORACLE_HOST,
    user : process.env.ORACLE_USER,
    password : process.env.ORACLE_PWD,
}

function init () {
    try {
        oracledb.initOracleClient({libDir: 'C:/Java/instantclient_19_17'})
    } catch (e) {
        console.log(e)
    } finally {

    }
}
init ()

export default async (req, res) => {
    let conn;
    try{
        conn = await oracledb.getConnection(dbconfig)

        let sql = `select MNO, USERID, NAME, EMAIL, REGDATE FROM MEMBER`;
        let result = await conn.execute(sql);
        const resulToJson = result.rows.map((row) => {
            const obj = {}
            result.metaData.forEach((meta,i) => {
            obj[meta.name] = row[i]
            })
            return obj
        })

        res.status(200).json(resulToJson)
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    } finally {
        if(conn) await conn.close();
    }
}