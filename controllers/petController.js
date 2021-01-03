const petService = require('../services/petService');

//Create Request

async function createPet(req, res) {
    try {
        await petService.createPet(res, req.body.username, req.body.petname, req.body.category, req.body.Vstatus, req.body.sex);
        return res.status(200).json({ status: 200, message: "Service Executed Successfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function getOwnerPets(req, res) {
    try {
        const pets = await petService.getAllPetsOfOwner(res, req.body.username);
        return res.status(200).json({ status: 200, data: pets, message: "Service Executed Successfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function updatePet(req, res) {
    try {
        await petService.updatePetVStatus(res, req.body.username, req.body.Vstatus);
        return res.status(200).json({ status: 200, message: "Service Executed Successfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function deletePet(req, res) {
    try {
        await petService.deletePet(res, req.body.username, req.body.petname);
        return res.status(200).json({ status: 200, message: "Service Executed Successfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
module.exports = {
    createPet, getOwnerPets, updatePet, deletePet
}
