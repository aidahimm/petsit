const ratingService = require('../services/ratingService');

//Create Request

async function updateRating(req, res) {
    try {
        await ratingService.updateRating(res, req.body.username, req.body.rating);
        return res.status(200).json({ status: 200, message: "Service Executed Successfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

module.exports = {
    updateRating
}
