const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const cita = require('./routes/cita')
const auth = require ('./routes/auth')
const usuario = require('./routes/usuario')
const app = express()

const port = process.env.PORT || 5000

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(cita)
app.use(auth)
app.use(usuario)

app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})