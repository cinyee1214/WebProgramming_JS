const express = require("express");
const router = express.Router();


router.get('/about', async(req, res) => {
    try {
        const about = {
            "name": "Xinyi Zhao",
            "cwid": "10451738",
            "biography": "This is my second master degree.\nI am studying computer science now.",
            "favoriteShows": ["Sleep no more", "Chicago", "Hamilton", "The lion king"],
            "hobbies": ["Painting", "Reading", "Programming"]
        };
        res.json(about);
    } catch (e) {
        res.status(404).json({ message: ' not found' });
    }
});

router.get('/story', async(req, res) => {
    try {
        const story = {
            "storyTitle": "Sapiens: A Brief History of Humankind",
            "story": "This is a book written by Yuval Noah Harari.\nThe book surveys the history of humankind from the evolution of archaic human species in the Stone Age up to the twenty-first century, focusing on Homo sapiens.\nThis book is worthy reading."
        };
        res.json(story);
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/education', async(req, res) => {
    try {
        const education = [{
                "schoolName": "Shandong University",
                "degree": "Bachelor's Degree in Materials Secience",
                "favoriteClass": "Mathematics",
                "favoriteMemory": "I made friends with some great person."
            },
            {
                "schoolName": "University of South Carolina",
                "degree": "MS in Chemical Engineering",
                "favoriteClass": "Number theory",
                "favoriteMemory": "I joined in a great group."
            },
            {
                "schoolName": "Stevens Institute of Technology",
                "degree": "MS in Computer Secience",
                "favoriteClass": "Web Programming",
                "favoriteMemory": "I am studying a brand new major and I enjoy it."
            }
        ];

        res.json(education);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;