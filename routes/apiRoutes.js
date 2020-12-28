const express = require("express");
const router = express.Router();
const UserController = require('../controllers/userController');
const RequestController = require ('../controllers/requestController')
const RatingController = require ('../controllers/ratingController')
const PetController = require ('../controllers/petController')
//
//
//
//
//
//
//USER
//Create
router.post('/crp', (req, res)=> {
    UserController.createNewPetSitterUsers(req, res).then(() => res.send("success"))
});

router.post('/cro', (req, res)=> {
    UserController.createNewPetOwnerUsers(req, res).then(() => res.send("success"))
});

router.post('/cra', (req, res)=> {
    UserController.createAuthorities(req, res).then(() => res.send("success"));
});

//Retrieve All
router.get("/all", (req, res)=> {
    UserController.getAllUsers(req, res).then(() => res.send("success"));
});

router.get("/fps", (req, res)=> {
    UserController.findAllPetSitterUsers(req, res).then(() => res.send("success"));
});
router.get("/fpo", (req, res)=> {
    UserController.findAllPetOwnerUsers(req, res).then(() => res.send("success"));
});

//Search User with Attribute
router.post("/fbc", (req, res)=> {
    UserController.findPetSitterByCateg(req, res).then(() => res.send("success"));
});

router.post("/fbn", (req, res)=> {
    UserController.findPetSitterByName(req, res).then(() => res.send("success"));
});
router.post("/fbu", (req, res)=> {
    UserController.findPetSitterByUsername(req, res).then(() => res.send("success"));
});

router.post("/fbcitycateg", (req, res)=> {
    UserController.findByCityAndCateg(req, res).then(() => res.send("success"));
});

router.post("/fpc", (req, res)=> {
    UserController.findPetSitterByCity(req, res).then(() => res.send("success"));
});

//Update User Info
router.put("/ufn", (req, res)=> {
    UserController.UpdateUserFirst(req, res).then(() => res.send("success"));
});

router.put("/uct", (req, res)=> {
    UserController.updateAcceptedCategories(req, res).then(() => res.send("success"));
});

router.put("/flag", (req, res)=> {
    UserController.FlagUser(req, res).then(() => res.send("success"));
});

router.delete("/delu", (req, res) => {
    UserController.DeleteTheUser(req, res).then(() => res.send("success"));
});


//
//
//
//
//
// Requests
router.post('/crreq', (req, res)=> {
    RequestController.createRequest(req, res).then(() => res.send("success"))
});

router.get("/allreq", (req, res)=> {
    RequestController.findAllReqs(req, res).then(() => res.send("success"));
});

router.post('/streqs', (req, res)=> {
    RequestController.findAllSitterReqs(req, res).then(() => res.send("success"))
});

router.post('/owreqs', (req, res)=> {
    RequestController.findAllOwnerReqs(req, res).then(() => res.send("success"))
});

router.post('/facceptedreqs', (req, res)=> {
    RequestController.findAccepted(req, res).then(() => res.send("success"))
});

router.put('/accept', (req, res)=> {
    RequestController.acceptReqs(req, res).then(() => res.send("success"))
});

router.put('/reject', (req, res)=> {
    RequestController.rejectReqs(req, res).then(() => res.send("success"))
});

//
//
//
//
//
//
// Rating
router.post('/rate', (req, res)=> {
    RatingController.updateRating(req, res).then(() => res.send("success"))
});

//
//
//
//
//
// Pets
router.post('/getpets', (req, res)=> {
    PetController.getOwnerPets(req, res).then(() => res.send("success"))
});
router.post('/createpets', (req, res)=> {
    PetController.createPet(req, res).then(() => res.send("success"))
});
router.put('/updatepet', (req, res)=> {
    PetController.updatePet(req, res).then(() => res.send("success"))
});
router.delete('/deletepet', (req, res)=> {
    PetController.deletePet(req, res).then(() => res.send("success"))
});


module.exports = router;
