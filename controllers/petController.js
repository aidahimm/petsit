const petService = require('../services/petService');

//Create Request

async function createPet(req, res) {
    try {
        const pet = await petService.createPet(req.body.username, req.body.petname, req.body.category, req.body.Vstatus);
        return res.status(200).json({ status: 200, data: pet, message: "Service Executed Successfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function getOwnerPets(req, res) {
    try {
        const pets = await petService.getAllPetsOfOwner(req.body.username);
        return res.status(200).json({ status: 200, data: pets, message: "Service Executed Successfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function updatePet(req, res) {
    try {
        const pet = await petService.updatePetVStatus(req.body.username, req.body.Vstatus);
        return res.status(200).json({ status: 200, data: pet, message: "Service Executed Successfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function deletePet(req, res) {
    try {
        await petService.deletePet(req.body.username, req.body.petname);
        return res.status(200).json({ status: 200, message: "Service Executed Successfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
module.exports = {
    createPet, getOwnerPets, updatePet, deletePet
}
