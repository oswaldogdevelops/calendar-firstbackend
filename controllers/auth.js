const mongoose = require('mongoose');
var Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')
const {generatejwt} = require('../helpers/jwt')



const createuser = async(req,res)=>{

   
   const {email,password} = req.body

  try {
       
    let usuario = await Usuario.findOne({ email });

    if ( usuario ) {
        return res.status(400).json({
            ok: false,
            msg: 'El usuario ya existe'
        });
    }

 

    usuario = new Usuario(req.body)
//encriptar contraseña 
const salt = bcrypt.genSaltSync()
usuario.password = bcrypt.hashSync(password, salt)

   await usuario.save()
   //generar jwt

  const token = await generatejwt(usuario.id, usuario.name)
  
      res.status(201).json({
          ok:true,
          uid: usuario.id,
          password: usuario.password,
            name: usuario.name,
            token
     
         
      })
  } catch (error) {
    console.log(error)
      res.status(500).json({
          ok:false,
          msg: 'There must be an error please contact provider'
      })
  }

  
}

const login = async(req,res)=>{

    const {email,password} = req.body
    
    try {
  
        const usuario = await Usuario.findOne({ email });

        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }


        const validpassword = bcrypt.compareSync(password , usuario.password)

        if(!validpassword){
            return res.status(400).json({
                ok:false,
                msg: 'password incorrecto'
            })
        }

        const token = await generatejwt(usuario.id, usuario.name)

        res.json({
            ok:true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

   } catch (error) {
     console.log(error)
       res.status(500).json({
           ok:false,
           msg: 'There must be an error please contact provider'
       })
   }
 
 
   

}

const renew = async(req,res)=>{

  const {uid,name} = req

  const token = await generatejwt(uid, name)

    res.json({
        ok:true,
       token,
       uid,
       name
    })
}

module.exports = {
    createuser, login ,renew
}