const pool = require("../database/db");

const getCitas = async (req, res) => {
  const { id_usuario } = req.body;
  const conv = JSON.stringify(id_usuario);
  try {
    const result = await pool.query(
        "select cita.id_cita,cita.hora,cita.fecha,usuario.nombre as username,dentista.nombre as dentuser,sede.nombre as sede, servicio.nombre as servicio from cita inner join usuario on cita.id_usuario = usuario.id_usuario inner join dentista on cita.id_dentista=dentista.id_dentista inner join sede on cita.id_sede = sede.id_sede inner join servicio on  cita.id_servicio = servicio.id_servicio where usuario.id_usuario = $1",
        [conv]
      );
      res.send({data:result.rows,
                sencencia:result.command,
                message:'consulta_exitosa'
    });
  } catch (error) {
    res.send(`ERROR!! NO_FUE_POSIBLE_REALIZAR_LA_CONSULTA.. ${error.message}`)
  }
};

const createCita = async (req, res) => {
  const { hora, fecha, id_usuario, id_dentista, id_sede, id_servicio } = req.body;
  try {
    const result = await pool.query(
        "INSERT INTO cita (hora,fecha,id_usuario,id_dentista,id_sede,id_servicio) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
        [hora,fecha,id_usuario,id_dentista,id_sede,id_servicio]
      );
      res.send({data: result.rows,
                sencencia:result.command,
                message:"datos almacenados correctamente"
        })
  } catch (error) {
    res.send(`ERROR!! NO_FUE_POSIBLE_CREAR_LA_CITA.. ${error.message}`)
  }
};

const getCitaForDelete= async(req,res)=>{
  const {id_cita}=req.body
  const conv = JSON.stringify(id_cita)
  try {
    const result = await pool.query(
      "select cita.id_cita,cita.hora,cita.fecha,usuario.nombre as username,dentista.nombre as dentista,sede.nombre as sede, servicio.nombre as servicio from cita inner join usuario on cita.id_usuario = usuario.id_usuario inner join dentista on cita.id_dentista=dentista.id_dentista inner join sede on cita.id_sede = sede.id_sede inner join servicio on  cita.id_servicio = servicio.id_servicio where cita.id_cita = $1",
      [conv]
    );
    res.send({data:result.rows,
              sencencia:result.command,
              message:'consulta_exitosa'
  });
  } catch (error) {
    
  }
}

const deleteCita = async(req, res) => {
    const {id_cita}=req.body
    const conv = JSON.stringify(id_cita)
    try {
        const result = await pool.query('DELETE FROM cita where id_cita =  $1 RETURNING * ',[conv])
        res.send({result:result.rows,
            sencencia: result.command,
            message:`cita ${id_cita} eliminada con exito`})
    } catch (error) {
        res.send(`ERROR!! NO_FUE_POSIBLE_ELIMINAR_LA_CITA.. ${error.message}`)
        
    }
};

module.exports = {
  getCitas,
  createCita,
  deleteCita,
  getCitaForDelete
};
