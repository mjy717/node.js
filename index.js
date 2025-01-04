const express = require('express')
const app = express()

app.use(express.static('public'))

app.use(express.urlencoded({ extended: true })) // 用于解析URL编码的请求体

app.use(express.json())// 用于解析JSON格式的请求体

app.get('/test', (req, res) => {
    res.redirect('/lpost.html')
})


app.use('/api/auth', require('./routes/user'));
app.use('/api/article', require('./routes/article'));
app.use('/api/comment', require('./routes/comment')); 
app.use('/api/like', require('./routes/like'))
app.use('/api/favorite',require('./routes/favorite'))

app.listen(3500, () => {
    console.log('Server is running on port 3500')
})
