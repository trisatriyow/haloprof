const {Appointment} = require('../models')
const {User} = require('../models')
const {Docter} = require('../models')
const {Profile} = require('../models')
// const bcrypt = require('bcrypt')

class Controller{
    static tabelApp(req, res){
        Appointment.findAll({include:[{model: User},{model: Doctor}]
        })
            .then((data)=>{
                // console.log(data)
                res.send(data)
            })
            .catch((err)=>{
                res.send(err)
            })
    }
    static doctorList(req, res){
        Docter.findAll()
            .then((data)=>{
                console.log(data)
                res.send(data)
            })
            .catch((err)=>{
                res.send(err)
            })
    }
    static userProfileList(req, res){
        User.findAll({include:{
            model: Profile
        }})
            .then((data)=>{
                res.send(data)
            })
            .catch((err)=>{
                res.send(err)
            })
    }
    // static postLogin(req, res){
    //     let {email, password} = req.body
    //     console.log(email, password)
    //     bcrypt.compare(password, user.password)

    // }
}

module.exports = Controller;