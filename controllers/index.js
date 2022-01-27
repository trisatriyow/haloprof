const { User, Docter, Profile, Appointment } = require("../models");

class Controller {
  static login(req, res) {
    res.render("login");
  }
  static checkLogin(req, res) {
    const { email, password } = req.body;
    User.findAll({
      where: {
        email,
      },
    }).then((data) => {
      if (data.length == 0) {
        res.render("login", {});
      }
    });
  }
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
    let option = {
      order: [["count", "asc"]],
    };
    if (spesialisasi) {
      option.where = { spesialisasi };
    }
    Docter.findAll(option)
      .then((data) => {
        res.render("docterList", { data });
      })
      .catch((err) => {
        res.send(err);
      });
  }
  static userProfileList(req, res) {
    User.findAll({
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
}

module.exports = Controller;
