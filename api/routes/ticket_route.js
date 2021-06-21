// De acuerdo a las reglas de negocio, los tickets solamente se crean
// y se acceden, no es posible modificar su cuerpo o eliminarlos. solo 
// se modifican los comentarios


const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const creaFakeTicket = require("../utilities/GenTicket");
const Ticket = require("../models/ticket");
const Comment = require("../models/comment");
//const Compare = require("../functions/compare");
const { date } = require("faker");

router.post("/", (req, res, next) => {
  try {
    let objFake = creaFakeTicket.creaTicket();
    console.log("externo: " + objFake);
    res.status(201).json({
      message: "Se creo por POST un nuevo ticket",
      createdProduct: objFake._id      
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }


});



// busqueda de tickets por prestador
// getTicketByIdPrestador
router.get("/prestador/:idPrestador", (req, res, next) => {
  const id = req.params.idPrestador;
  Ticket.find({ idPrestador: id })
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for Prestador ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// busqueda de tickets por id
// getByIdTicket
router.get("/:id", (req, res, next) => {
  const myId = req.params.id;

  //--------------------
  Ticket.findById(myId, function (err, doc) {
    if (err) {
      console.log(err);
      res
        .status(404)
        .json({ message: "No valid entry found for  ID ticket" });
    }
    else {
      console.log("Result : ", doc);
      res.status(200).json(doc);
    }
  });
  

});


// getAllTickets
// lista todos los tickets
router.get("/", (req, res, next) => {
  Ticket.find()
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
