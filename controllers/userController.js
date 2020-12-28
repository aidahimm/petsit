const UserService = require('../services/userService');

async function createAuthorities (req, res) {
    try {
        const exists = await UserService.createAuthority(req.body.username);
        return res.status(200).json({ status: 200, data: exists, message: "Service Executed Successfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function createNewPetSitterUsers (req, res) {
    try {
        await UserService.createNewUserPetSitter(req.body.username, req.body.password,req.body.email,req.body.firstname,req.body.lastname,req.body.phone,req.body.city,req.body.country,req.body.description, req.body.category);
        return res.status(200).json({ status: 200, message: "Created Pet Sitter Successfully " });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
async function createNewPetOwnerUsers (req, res) {
    try {
        await UserService.createNewUserPetOwner(req.body.username, req.body.password,req.body.email,req.body.firstname,req.body.lastname,req.body.phone,req.body.city,req.body.country,req.body.numberofpets);
        return res.status(200).json({ status: 200, message: "Created Pet Owner Successfully " });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
async function getAllUsers (req, res) {
    try {
        const users = await UserService.getAllUsers({}, page, limit);
        return res.status(200).json({ status: 200, data: users, message: "Retrieved Users Successfully " });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function findAllPetSitterUsers (req, res) {
    try {
        const petsitters = await UserService.findAllPetSitters();
        return res.status(200).json({ status: 200, data: petsitters, message: "Found All Pet Sitters Successfully " });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
async function findAllPetOwnerUsers (req, res) {
    try {
        const petowners = await UserService.findAllPetOwners();
        return res.status(200).json({ status: 200, data: petowners, message: "Found All Pet Owners Successfully " });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function findPetSitterByCity (req, res) {
    try {
        const petsitter = await UserService.findPetSitterByCity(req.body.city);
        return res.status(200).json({ status: 200, data: petsitter, message: "Found Pet Sitters Successfully " });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
async function findPetSitterByCateg (req, res) {
    try {
        const petsitter = await UserService.findPetSitterByCateg(req.body.category);
        return res.status(200).json({ status: 200, data: petsitter, message: "Service Executed Successfully " });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function findByCityAndCateg (req, res, ) {
    try {
        const petsitter = await UserService.findPetSitterByCategAndCity(req.body.city, req.body.category);
        return res.status(200).json({ status: 200, data: petsitter, message: "Service Executed Successfully " });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function findPetSitterByName (req, res) {
    try {
        const user = await UserService.findPetSitterByName(req.body.name);
        return res.status(200).json({ status: 200, data: user, message: "Service Executed Successfully " });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function findPetSitterByUsername (req, res) {
    try {
        const petsitter = await UserService.findPetSitterByUsername(req.body.username);
        return res.status(200).json({ status: 200, data: petsitter, message: "Service Executed Successfully " });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function UpdateUserFirst (req, res) {
    try {
        const user = await UserService.updateUserFirst(req.body.username, req.body.firstname);
        return res.status(200).json({ status: 200, data: user, message: "Updated User First Name Successfully " });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function updateAcceptedCategories (req, res) {
    try {
        const user = await UserService.updateAcceptedCategs(req.body.username, req.body.categs);
        return res.status(200).json({ status: 200, data: user, message: "Updated PetSitter Accepted Categories Successfully " });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function DeleteTheUser (req, res) {
    try {
        await UserService.DeleteUser(req.body.username);
        return res.status(200).json({ status: 200, message: "Deleted User Successfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function FlagUser (req, res) {
    try {
        await UserService.flagUser(req.body.username);
        return res.status(200).json({ status: 200, message: "Flagged User Successfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
module.exports ={
    getAllUsers, createAuthorities, createNewPetSitterUsers, createNewPetOwnerUsers, findAllPetSitterUsers, findAllPetOwnerUsers, UpdateUserFirst, findPetSitterByCity, findPetSitterByCateg, findPetSitterByUsername, findPetSitterByName, DeleteTheUser, FlagUser, updateAcceptedCategories, findByCityAndCateg
}
