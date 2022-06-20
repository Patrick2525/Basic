const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');

const config = require('./config/key');

const { User } = require("./models/User"); // 유저 모델에서 가져옴

//application/x-www-form-urlencoded 이렇게 생긴 데이터를 분석해서 가져올 수 있도록 해줌
app.use(bodyParser.urlencoded({extented:true}));

//application/json 타입으로 된것을 분석해서 가져올 수 있도록 해준다
app.use(bodyParser.json());


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser : true, useUnifiedTopology : true
}).then(() => console.log('MoongoDB connected'))
  .catch(err => console.log(err))


app.get('/', (req, res) => res.send('Hello World!~~'));

app.post('/register', (req, res) => {
  
    // 회원 가입 할때 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터 베이스에 넣어준다

    // 가져온 User 모델로 인스턴스를 만든다
    const user = new User(req.body)
    
    //body 안 내용물
    // req.body안에 내용물들이 있을 수 있도록 해주는것은 body-parser가 있기때문이다. 
    // body-parser을 이용해서 client에서 보낸 정보를 받아준다
    // {
    //     id: "hello",
    //     password: "123"
    // }

    user.save((err, userInfo) => { // mongoDB에서 사용하는 메서드 - 정보들이 usermodel에 저장이 된다.
        if(err) return res.json({ success: false, err}) // 에러가 있다면 client에 json 형식으로 전달을 해준다
        return res.status(200).json({
            success: true
        })
    }); 


})



app.listen(port, () => console.log(`Listening on port ${port}!`));



//Amazon AWS RDS 연결
// const fs = require('fs');
// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const port = process.env.PORT || 5000;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true}));

// const data = fs.readFileSync('./config/database.json');
// const conf = JSON.parse(data);
// const mysql = require('mysql');

// const connection = mysql.createConnection({
//     host: conf.host,
//     user: conf.user,
//     password: conf.password,
//     port: conf.port,
//     database: conf.database
// })
// connection.connect(function (err) {
//     if (err) 
//         throw err;
//     console.log('MySQL DB connected');
// })

// mongodb+srv://user:<password>@myfirstmongo.3tzknur.mongodb.net/?retryWrites=true&w=majority


// // TODO
// // 1. input Validation
// // https://velog.io/@smooth97/Node.js-Restful-API-wok2wqo7yu
// //
// //

// // 기본 REST API 구성 - Select
// app.get('/posts/', (req, res) => {
//     connection.query(
//         "SELECT * FROM BOARD WHERE isDeleted = false",
//         (err, rows, fields) => { // rows = 배열, fields = 컬럼
//             if(err) {
//                 console.log('BOARD DB <=> Server - select 에러 발생했습니다!');
//             } else {
//                 res.send(rows);
//                 console.log('BOARD DB <=> Server - select 정상처리 되었습니다!');
//             }
//         }
//     );
// });


// // 기본 REST API 구성 - Insert
// app.post('/posts/', (req, res) => {
//     let sql = 'INSERT INTO BOARD VALUES (null, ?, ?, now(), false, null)';
//     let {type, title} = req.body;
//     let params = [type, title];
//     console.log(type + title);
//     connection.query(sql, params, (err, rows, fields) => {
//         if(err) {
//             console.log(err);
//             console.log('BOARD DB <=> Server - insert 에러 발생했습니다!');
//         } else {
//             res.send(rows);
//             console.log('BOARD DB <=> Server - insert 정상처리 되었습니다!');
//         }
//     })
// })

// // 기본 REST API 구성 - update
// app.put('/posts/', (req, res) => {
//     let sql = 'UPDATE BOARD SET type = ?, title = ? WHERE id = ?';
//     let {type, title, id} = req.body;
//     let params = [type, title, id];
//     connection.query(sql, params, (err, rows, fields) => {
//         if(err) {
//             console.log('BOARD DB <=> Server - update 에러 발생했습니다!');
//         } else {
//             res.send(rows);
//             console.log('BOARD DB <=> Server - update 정상처리 되었습니다!');
//         }
//     })

// })

// // 기본 REST API 구성 - Delete
// app.delete('/posts/:id', (req, res) => {
//   let sql = 'UPDATE BOARD SET isDeleted = 1 WHERE id = ?';
//   let params = [req.params.id];
//   connection.query(sql, params,
//     (err, rows, fields) => {
//         if(err) {
//             console.log('BOARD DB <=> Server - Delete 에러 발생했습니다!');
//         } else {
//             res.send(rows);
//             console.log('BOARD DB <=> Server - Delete 정상처리 되었습니다!');
//         }
//     }
//   )
// })

// app.listen(port, () => console.log(`Listening on port ${port}`));