const UserService = require('../services/userService');

async function createAuthorities (req, res) {
    try {
        await UserService.authenticateAuth(req.body.newAuthUsername, req.body.newAuthPassword, res, req.body.authUsername, req.body.authPassword);
        return res.status(200).json({ status: 200, message: "Service Executed Successfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function Login (req, res) {
    try {
        let token = await UserService.login(res, req.body.username, req.body.password);
        return res.status(200).json({ status: 200, token: token,  message: "Service Executed Successfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function signUpPetSitterUsers (req, res) {
    try {
        await UserService.signUpUserPetSitter(res,req.body.username, req.body.password,req.body.email,req.body.firstname,req.body.lastname,req.body.phone,req.body.city,req.body.country,req.body.description, req.body.category);
        return res.status(200).json({ status: 200, message: "Created Pet Sitter Successfully " });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
async function signUpPetOwnerUsers (req, res) {
    try {
        await UserService.signUpUserPetOwner(res, req.body.username, req.body.password,req.body.email,req.body.firstname,req.body.lastname,req.body.phone,req.body.city,req.body.country,req.body.numberofpets);
        return res.status(200).json({ status: 200, message: "Created Pet Owner Successfully " });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
async function getAllUsers (req, res) {
    try {
        const users = await UserService.getAllUsers();
        return res.status(200).json({ status: 200, users: users, message: "Retrieved Users Successfully " });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function findAllPetSitterUsers (req, res) {
    try {
        const petsitters = await UserService.findAllPetSitters();
        return res.status(200).json({ status: 200, PetSitters: petsitters, message: "Found All Pet Sitters Successfully " });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
async function findAllPetOwnerUsers (req, res) {
    try {
        const petowners = await UserService.findAllPetOwners();
        return res.status(200).json({ status: 200, PetOwners: petowners, message: "Found All Pet Owners Successfully " });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function findPetSitterByCity (req, res) {
    try {
        const petsitter = await UserService.findPetSitterByCity(req.body.city);
        return res.status(200).json({ status: 200, PetSitters: petsitter, message: "Found Pet Sitters Successfully " });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
async function findPetSitterByCateg (req, res) {
    try {
        const petsitter = await UserService.findPetSitterByCateg(req.body.category);
        return res.status(200).json({ status: 200, PetSitters: petsitter, message: "Service Executed Successfully " });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function findByCityAndCateg (req, res) {
    try {
        const petsitter = await UserService.findPetSitterByCategAndCity(req.body.city, req.body.category);
        return res.status(200).json({ status: 200, PetSitters: petsitter, message: "Service Executed Successfully " });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function findPetSitterByName (req, res) {
    try {
        const user = await UserService.findPetSitterByName(req.body.name);
        return res.status(200).json({ status: 200, PetSitters: user, message: "Service Executed Successfully " });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function findPetSitterByUsername (req, res) {
    try {
        const petsitter = await UserService.findPetSitterByUsername(req.body.username);
        return res.status(200).json({ status: 200, PetSitters: petsitter, message: "Service Executed Successfully " });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function UpdateUserEmail (req, res) {
    try {
        await UserService.updateUserEmail(res, req.body.newEmail, req.body.username);
        return res.status(200).json({ status: 200, message: "Updated User Email Successfully " });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function UpdateUserPassword (req, res) {
    try {
        await UserService.updateUserPassword(res, req.body.newPassword, req.body.username);
        return res.status(200).json({ status: 200, message: "Updated User Password Successfully " });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function updateAcceptedCategories (req, res) {
    try {
        await UserService.updateAcceptedCategs(res, req.body.username, req.body.categories);
        return res.status(200).json({ status: 200, message: "Updated PetSitter Accepted Categories Successfully " });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function DeleteTheUser (req, res) {
    try {
        await UserService.DeleteUser(res, req.body.username);
        return res.status(200).json({ status: 200, message: "Deleted User Successfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function FlagUser (req, res) {
    try {
        await UserService.flagUser(res, req.body.username);
        return res.status(200).json({ status: 200, message: "Flagged User Successfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
module.exports = {
    getAllUsers, createAuthorities, signUpPetOwnerUsers, signUpPetSitterUsers, findAllPetSitterUsers, findAllPetOwnerUsers, UpdateUserPassword, UpdateUserEmail, findPetSitterByCity, findPetSitterByCateg, findPetSitterByUsername, findPetSitterByName, DeleteTheUser, FlagUser, updateAcceptedCategories, findByCityAndCateg, Login
}
