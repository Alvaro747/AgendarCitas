const pool = require("../database/db")

const getInfoUser= async(req,res)=>{
   try {
    const {id_usuario} = req.body
    const conv = JSON.stringify(id_usuario)
    const result = await pool.query('select nombre,correo,telefono,cedula from usuario where id_usuario = $1',
    [conv])

    res.send(result.rows)
   } catch (error) {
    res.send('ERROR_NO SE ENCUENTRAN DATOS DEL USUARIO')
   }
}


module.exports={
    getInfoUser
}