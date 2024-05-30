let mysql = require('mysql')
let express = require('express')
let bcrypt = require('bcryptjs')
let bodyparser = require('body-parser')
let con=require('./connecion')

let app = express()
app.use(bodyparser.json())

app.post ('/signup',async (req,res)=>{
    let {username,password} = req.body;
    let hashedpass = await bcrypt.hash(password,10)
    // console.log(hashedpass)
    await con.query(`INSERT INTO userdetails values ("${username}","${hashedpass}")`,()=>{
        // res.send(`New user create for ${username}`)
        res.json({message : `New user created for ${username}`})
    })
})
app.post('/login',(req,res)=>{
    let {username,password} = req.body
    con.query(`select * from userdetails where userName="${username}"`,(err,data)=>{
        let user = data[0]
        if(!user){
            return res.status(401).json({ error: 'UserName not found' })
        }
        // console.log(data[0])
        bcrypt.compare(password,user.password,(err,checkpass)=>{
            console.log(checkpass)
            if (!checkpass) {
                // return res.json({message:`${username} login successful`})
                return res.status(401).json({ error: 'Invalid password' });
            }
            
            res.json({message:`${username} login successful`}) 
            // return res.status(401).json({ error: 'Invalid password' });
            
        })   


        
    })
    // res.json({message:`${username} login successful`})
})
app.listen(8000)