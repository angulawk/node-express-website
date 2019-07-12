const express = require("express");

const router = express.Router();

module.exports = (param) => {
    const { feedbackService } = param;

    try {
        router.get("/", async (req, res, next) => {
            const feedbackList = await feedbackService.getList();
            return res.render("feedback", {
                page: "Feedback",
                feedbackList,
                success: req.query.success
            })
        });
    } catch(err) {
        return err;
    }

    router.post("/", async (req, res, next) => {
        try {
            const feedbackName = req.body.feedbackName.trim();
            const feedbackTitle = req.body.feedbackTitle.trim();
            const feedbackMessage = req.body.feedbackMessage.trim();
            const feedbackList = await feedbackService.getList();
    
            if(!feedbackName || !feedbackTitle || !feedbackMessage) {
                return res.render("feedback", {
                    page: "Feedback",
                    error: true,
                    feedbackName,
                    feedbackTitle,
                    feedbackMessage,
                    feedbackList
                });
            }
            await feedbackService.addEntry(feedbackName, feedbackTitle, feedbackMessage)
            return res.redirect("/feedback?success=true")
        } catch(err) {
            return err;
        }
    });

    return router;
}