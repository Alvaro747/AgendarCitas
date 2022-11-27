const pool = require("../database/db")

const createUser = async(req,res)=>{
    const {nombre,cedula,correo,password,telefono} = req.body
   try {
    const result = await pool.query("INSERT INTO usuario (nombre,cedula,correo,contraseña,telefono) VALUES ($1,$2,$3,$4,$5) RETURNING *",
    [nombre,cedula,correo,password,telefono])
    res.send({
        data:result.rows,
        comando:result.command,
        message:'Usuario creado con exito'
    })
   } catch (error) {
    res.send(`ERROR!! NO_FUE_POSIBLE_CREAR_EL_USUARIO.. ${error.message}`)
   }
}

const loginUser = async(req,res)=>{
   try {
    const {cedula,password}=req.body
    console.log(cedula,password)
    const result = await pool.query('select cedula,contraseña from usuario where cedula=$1 and contraseña = $2',
    [cedula,password])
    const cedulaDb=result.rows[0].cedula
    const passwordDb=result.rows[0].contraseña
    res.send({cedula:cedulaDb,
    passord:passwordDb})
   } catch (error) {
    res.send('cedula o contraseña invalidos')
   }


}

module.exports={
    createUser,
    loginUser
}