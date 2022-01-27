const {Appointment} = require('../models')
const {User} = require('../models')
const {Doctor} = require('../models')
const {Profile} = require('../models')

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
        Doctor.findAll()
            .then((data)=>{
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
}

module.exports = Controller;