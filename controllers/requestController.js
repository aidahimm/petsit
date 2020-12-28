const requestService = require('../services/requestService');

//Create Request

async function createRequest(req, res) {
    try {
        const reqs = await requestService.createRequest(req.body.ownerUsername, req.body.sitterUsername);
        return res.status(200).json({ status: 200, data: reqs, message: "Service Executed Successfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function findAllReqs(req, res) {
    try {
        const reqs = await requestService.findAllRequests();
        return res.status(200).json({ status: 200, data: reqs, message: "Service Executed Successfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function findAllSitterReqs(req, res) {
    try {
        const reqs = await requestService.findAllPetSitterRequests(req.body.username);
        return res.status(200).json({ status: 200, data: reqs, message: "Service Executed Successfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function findAllOwnerReqs(req, res) {
    try {
        const reqs = await requestService.findAllPetOwnerRequests(req.body.username);
        return res.status(200).json({ status: 200, data: reqs, message: "Service Executed Successfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
async function acceptReqs(req, res) {
    try {
        const reqs = await requestService.acceptRequests(req.body.title);
        return res.status(200).json({ status: 200, data: reqs, message: "Service Executed Successfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
async function rejectReqs(req, res) {
    try {
        const reqs = await requestService.rejectRequests(req.body.title);
        return res.status(200).json({ status: 200, data: reqs, message: "Service Executed Successfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
async function findAccepted(req, res) {
    try {
        const reqs = await requestService.findAcceptedRequest(req.body.username);
        return res.status(200).json({ status: 200, data: reqs, message: "Service Executed Successfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
module.exports = {
    createRequest, findAllReqs, findAllSitterReqs, findAllOwnerReqs, acceptReqs, rejectReqs, findAccepted
}
