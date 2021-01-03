const express = require("express");
const router = express.Router();
const UserController = require('../controllers/userController');
const RequestController = require ('../controllers/requestController')
const RatingController = require ('../controllers/ratingController')
const PetController = require ('../controllers/petController')
const jwt = require('jsonwebtoken')

//
//
//
//
//
//
//USER
//Create
router.post('/signUpSitter', (req, res)=> {
    UserController.signUpPetSitterUsers(req, res).then(() => res.send("success"))
});

router.post('/signUpOwner', (req, res)=> {
    UserController.signUpPetOwnerUsers(req, res).then(() => res.send("success"))
});

// I called Token verification here only to facilitate testing
// The feature does work however, and it can simply be called in any other route we need
// The same way we do in the following
router.post('/crAuth', VerifyToken, (req, res)=> {
    jwt.verify(req.token, 'secretkey', (err)=>{
        if(err) {
            res.sendStatus(403)
        }else{
            UserController.createAuthorities(req, res).then(() => res.send("success"));
        }
    });
});

router.post ('/login', (req, res) => {
    UserController.Login(req, res).then(() => res.send("success"));
});

//Retrieve
router.get("/all", (req,  res)=> {
    UserController.getAllUsers(req, res).then(() => res.send("success"));
});

router.get("/findSitters", (req, res)=> {
    UserController.findAllPetSitterUsers(req, res).then(() => res.send("success"));
});
router.get("/findOwners", (req, res)=> {
    UserController.findAllPetOwnerUsers(req, res).then(() => res.send("success"));
});

//Search User with Attribute
router.post("/findByCateg", (req, res)=> {
    UserController.findPetSitterByCateg(req, res).then(() => res.send("success"));
});

router.post("/findByName", (req, res)=> {
    UserController.findPetSitterByName(req, res).then(() => res.send("success"));
});
router.post("/findByUsername", (req, res)=> {
    UserController.findPetSitterByUsername(req, res).then(() => res.send("success"));
});

router.post("/findByCityCateg", (req, res)=> {
    UserController.findByCityAndCateg(req, res).then(() => res.send("success"));
});

router.post("/findByCity", (req, res)=> {
    UserController.findPetSitterByCity(req, res).then(() => res.send("success"));
});

//Update Some User Info
router.put("/uPassword", (req, res)=> {
    UserController.UpdateUserPassword(req, res).then(() => res.send("success"));
});

router.put("/uEmail", (req, res)=> {
    UserController.UpdateUserEmail(req, res).then(() => res.send("success"));
});

router.put("/uSitterCateg", (req, res)=> {
    UserController.updateAcceptedCategories(req, res).then(() => res.send("success"));
});

router.put("/flagUser", (req, res)=> {
    UserController.FlagUser(req, res).then(() => res.send("success"));
});

//Delete User
router.delete("/delUser", (req, res) => {
    UserController.DeleteTheUser(req, res).then(() => res.send("success"));
});


//
//
//
//
//
// REQUESTS
router.post('/crReq', (req, res)=> {
    RequestController.createRequest(req, res).then(() => res.send("success"))
});

router.get("/allReq", (req, res)=> {
    RequestController.findAllReqs(req, res).then(() => res.send("success"));
});

router.post('/findSitterReqs', (req, res)=> {
    RequestController.findAllSitterReqs(req, res).then(() => res.send("success"))
});

router.post('/findOwnerReqs', (req, res)=> {
    RequestController.findAllOwnerReqs(req, res).then(() => res.send("success"))
});

router.post('/findAcceptedReqs', (req, res)=> {
    RequestController.findAccepted(req, res).then(() => res.send("success"))
});

router.put('/acceptReq', (req, res)=> {
    RequestController.acceptReqs(req, res).then(() => res.send("success"))
});

router.put('/rejectReq', (req, res)=> {
    RequestController.rejectReqs(req, res).then(() => res.send("success"))
});

//
//
//
//
//
//
// RATING
router.post('/rateSitter', (req, res)=> {
    RatingController.updateRating(req, res).then(() => res.send("success"))
});

//
//
//
//
//
// PETS
router.post('/getPets', (req, res)=> {
    PetController.getOwnerPets(req, res).then(() => res.send("success"))
});
router.post('/createPets', (req, res)=> {
    PetController.createPet(req, res).then(() => res.send("success"))
});
router.put('/updatePetV', (req, res)=> {
    PetController.updatePet(req, res).then(() => res.send("success"))
});
router.delete('/deletePet', (req, res)=> {
    PetController.deletePet(req, res).then(() => res.send("success"))
});
//
//
//
//
//
//
// Token Verification
function VerifyToken (req, res, next) {
    const bearerHeader = req.headers['authorization']
    if( typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(' ')[1]
        req.token = bearerToken
        next()
    }else{
        res.sendStatus(403)
    }
}

module.exports = router;
