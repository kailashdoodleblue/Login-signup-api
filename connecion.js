let mysql = require('mysql')

con = mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'root',
        database:'sampledb'
    }
)

con.connect(()=>{
    console.log('Database connected')
}
)
module.exports=con