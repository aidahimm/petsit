const requestService = require('../services/requestService');

//Create Request

async function createRequest(req, res) {
    try {
        const reqs = await requestService.createRequest(res, req.body.ownerUsername, req.body.sitterUsername, req.body.title, req.body.nofpets);
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
        const reqs = await requestService.findAllPetSitterRequests(res, req.body.username);
        return res.status(200).json({ status: 200, data: reqs, message: "Service Executed Successfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function findAllOwnerReqs(req, res) {
    try {
        const reqs = await requestService.findAllPetOwnerRequests(res, req.body.username);
        return res.status(200).json({ status: 200, data: reqs, message: "Service Executed Successfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
async function acceptReqs(req, res) {
    try {
        const reqs = await requestService.acceptRequests(res, req.body.title, req.body.ownerUsername);
        return res.status(200).json({ status: 200, data: reqs, message: "Service Executed Successfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
async function rejectReqs(req, res) {
    try {
        const reqs = await requestService.rejectRequests(res, req.body.title, req.body.ownerUsername);
        return res.status(200).json({ status: 200, data: reqs, message: "Service Executed Successfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
async function findAccepted(req, res) {
    try {
        const reqs = await requestService.findAcceptedRequestOwner(res, req.body.username);
        return res.status(200).json({ status: 200, data: reqs, message: "Service Executed Successfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
module.exports = {
    createRequest, findAllReqs, findAllSitterReqs, findAllOwnerReqs, acceptReqs, rejectReqs, findAccepted
}
