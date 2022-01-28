const { User, Docter, Profile, Appointment } = require("../models");
const nodemailer = require("nodemailer");
let memory = {};
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "haloprofhacktiv8@gmail.com",
    pass: "hacktiv8",
  },
});

class Controller {
  static tabelApp(req, res) {
    Appointment.findAll({ include: [{ model: User }, { model: Doctor }] })
      .then((data) => {
        // console.log(data)
        res.send(data);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static doctorList(req, res) {
    const { spesialisasi } = req.query;
    memory.UserId = 1;
    memory.email = "triyonosatriyo15@gmail.com";
    let option = {
      order: [["count", "asc"]],
    };
    if (spesialisasi) {
      option.where = { spesialisasi };
    }
    Docter.findAll(option)
      .then((data) => {
        res.render("docterList", { data, memory });
      })
      .catch((err) => {
        res.send(err);
      });
  }
  static async userProfileList(req, res) {
    let user =  await req.user;
    let id = JSON.parse(JSON.stringify(user)).id;
    User.findOne({
      where:{id},
      include: {
        model: Profile,
      },
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send(err);
      });
  }
  static confirmAppointment(req, res) {
    const { DoctorId, UserId } = req.params;
    console.log(DoctorId,  UserId)
    Profile.findAll({
      include: {
        model: Docter,
      },
    })
      .then((data) => {
        console.log(data)
        let mailOptions = {
          from: "haloprofhacktiv8@gmail.com",
          to: memory.email,
          subject: "Halo Prof Appointment",
          text: "Confirmation about appointment Halo Prof",
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Email Sent:" + info.response);
          }
        });
        console.log(data)
        res.render("appointment", { data });
      })
      .catch((err) => {
        res.send(err);
      });
  }
}

module.exports = Controller;
