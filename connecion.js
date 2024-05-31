let mysql = require('mysql')
let dotenv = require('dotenv')
dotenv.config()
con = mysql.createConnection(
    {
        host:process.env.HOST,
        user:process.env.USER,
        password:process.env.PASSWORD,
        database:process.env.DATABASE
    }
)

con.connect(()=>{
    console.log('Database connected')
}
)
module.exports=con