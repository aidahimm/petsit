const ratingService = require('../services/ratingService');

//Create Request

async function updateRating(req, res) {
    try {
        const rating = await ratingService.updateRating(req.body.username, req.body.rating);
        return res.status(200).json({ status: 200, data: rating, message: "Service Executed Successfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

module.exports = {
    updateRating
}
