// comment_route: Crud solicitado
// 

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const newComment = require("../utilities/GenComments");
const Ticket = require("../models/ticket");
const Comment = require("../models/comment");

// post ok
// postComment

router.post("/:id", (req, res, next) => {
  //------------------
  //
  const myId = req.params.id;
  Ticket.findById(myId, function (err, Ticket) {
    if (!err) {
      Ticket.comments.push(newComment.creaComments());
      Ticket
        .save()
        .then(result => {
          console.log(result);
          res.status(201).json({
            message: "Se creo por POST un nuevo comment en el ticket " + myId,
            createdProduct: result
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        })
    }
  });
});
//-----------------------------------------------------------------------------
// putComment modificacion del texto de comentarios existentes
// solo para esta operacion puse codigo de transacción ya que
// se busca no recargar de código en otras acciones
//------------
async function updateComment(idParent, idChild, _whoComment, _textBody, post) {
  const session = await mongoose.startSession();

  session.startTransaction();

  //
  await post.findById(idParent)
    .then((user) => {
      const address = user.comments.id(idChild); // returns a matching subdocument
      console.log(address);
      address.whoComment = _whoComment;
      address.textBody = _textBody;
      address.dateComment = new Date();

      return user.save(); // saves document with subdocuments and triggers validation
    })
    .then((user) => {
      console.log(user)
    })
    .catch(e => console.log(e));


  session.commitTransaction();
  session.endSession();
  return post// findOne

}// funcion update

// putComment1
// actualiza el valor de el comentario de un ticket.
// se pasa como parámetros el id del ticket y el id del comentario
// comentado esta con valores fijos para una demo.


router.put("/:idTicket/:idComment", function (req, res, next) {
  var idParent = req.params.idTicket;
  var idChild = req.params.idComment;
  var _whoComment = newComment.creaComments().whoComment;
  var _textBody = newComment.creaComments().textBody;

  try {
    let __ticket = updateComment(idParent, idChild, _whoComment, _textBody, Ticket);
    res.json({
      message: 'Success Update Comment ' + new Date(),
      createdProduct: Ticket
    })
  } catch (error) {
    console.log(error);
  }


})
//--------------------------------------------------------
// 
// busqueda de tickets por prestador
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

//----------------------------------
// getAllComments
router.get("/", (req, res, next) => {

    Ticket.find(
     {"comments.whoComment": {$eq: "Checkmed"}}
   ) 
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


//-------------------------------------------
//--Elimina comentario
router.delete("/:idTicket/:idComment", (req, res, next) => {
  const id0 = req.params.idTicket;
  const id1 = req.params.idComment;
  //const session2 =  mongoose.startSession();
  // session2.startTransaction();
  Ticket.findById(id0)
    .then((user2) => {
      const address2 = user2.comments.id(id1); // returns a matching subdocument
      console.log(address2);
      address2.remove();
      user2.save();
      res.status(200).json(user2);
    })
    .then((user2) => {
      console.log(user2)
    })
    .catch(e => {
      console.log(e)
      res.status(500).json({
        error: err
      });
    });


  //session2.commitTransaction();
  //session2.endSession();

});
//-----------------------



module.exports = router;
