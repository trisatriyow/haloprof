const {Appointment} = require('../models')
const {User} = require('../models')
const {Doctor} = require('../models')

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
        // Appointment.findAll({
        //     include: [
        //       {
        //         model: Doctor,
        //         include: [Appointment, User]
        //       },
        //       {
        //         model: User,
        //         include: {
        //           model: Appointment,
        //           include: {
        //             model: Doctor,
        //             include: [Appointment, User]
        //           }
        //         }
        //       }
        //     ]
        //   })
        //     .then((data)=>{
        //         console.log(data)
        //         res.send(data)
        //     })
    }
}

module.exports = Controller;