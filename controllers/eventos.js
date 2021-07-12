const Oswevent = require('../models/event');


const crearEventos = async(req,res) =>{
  


    try {
        const evento = new Oswevent( req.body );
        evento.user = req.uid
        const eventoGuardado = await evento.save();

        res.json({
            ok: true,
            evento: eventoGuardado
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
   
}

const getEventos = async(req,res) =>{

    const alleventos = await Oswevent.find().populate('user','name password')

      res.json({
          ok:true,
         alleventos
      })
}


const actualizarEventos = async(req,res) =>{

 const eventid = req.params.id
 const uid = req.uid

   try{
      const search = await Oswevent.findById(eventid)

      if(!search){
         return res.status(404).json({
              ok:false,
              msg:'the event wasnt found with that id'
          })
      }

      if(search.user.toString() !== uid){
        return res.status(401).json({
            ok:false,
            msg:'cant edit that event'
         })
      }

      const newEvent = {
        ...req.body,
        user: uid
      }

      const UpdatedEvent = await Oswevent.findByIdAndUpdate(eventid, newEvent, {new: true})

      res.json({
          ok:true,
          UpdatedEvent
      })

   }catch(error){
       console.log(error)
       res.status(500).json({
           ok:false ,
           msg:'failed to update'
       })
   }

}

const borrarEventos  = async(req,res) =>{

    const eventid = req.params.id
 const uid = req.uid

   try{
      const search = await Oswevent.findById(eventid)

      if(!search){
       return   res.status(404).json({
              ok:false,
              msg:'the event wasnt found with that id'
          })
      }

      if(search.user.toString() !== uid){
       return res.status(401).json({
            ok:false,
            msg:'cant edit that event'
         })
      }


      const DeleteEvent = await Oswevent.findByIdAndDelete(eventid)

      res.json({
          ok:true
          
      })

   }catch(error){
       console.log(error)
       res.status(500).json({
           ok:false ,
           msg:'failed to erase'
       })
   }




    res.json({
        ok:true,
       msg: 'eliminar eventos'
    })
}

module.exports = {
    borrarEventos,actualizarEventos,crearEventos,getEventos
}