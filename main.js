let mysql = require('mysql')
let express = require('express')
let bcrypt = require('bcryptjs')
let bodyparser = require('body-parser')
const jwt = require('jsonwebtoken');
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
var hhh
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
            hhh=jwt.sign({ username: user.userName }, 'hello',{ expiresIn: '1h' }) 
            res.json({hhh})
            console.log(hhh)
            // res.json({message:`${username} login successful`}) 
            // return res.status(401).json({ error: 'Invalid password' });
            
        })   


        
    })
    // res.json({message:`${username} login successful`})
})

app.get('/me', async (req, res) => {
    try {
        // const token = req.headers.authorization.split(' ')[1];
        const token = hhh;
        if (!token) {
            return res.status(401).json({ error: 'Token is required' });
        }
        jwt.verify(token, 'hello', (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Invalid token' });
            }
            // Here you can fetch user details from the database using the decoded user ID or username
            res.json({ user: decoded });
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.listen(8000)