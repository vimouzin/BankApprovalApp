const express = require('express')
const path = require('path')
const app = express()
const port = 4500

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
