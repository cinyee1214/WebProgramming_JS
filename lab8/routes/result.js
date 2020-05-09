const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    const title = 'The Best Palindrome Checker in the World!';
    res.render('result/index', { title: title });
});

router.post('/result', async(req, res) => {
    const title = 'The Palindrome Results!';
    let data = req.body['text-to-test'];

    if (!data) {
        res.status(400).render('result/error', {
            title: "Error",
            error: "No text provided."
        });
        return;
    }

    try {
        let isPalindrome = palindrome(data);
        res.render('result/result', {
            title: title,
            isPalindrome: isPalindrome,
            data: data
        });
    } catch (e) {
        res.status(500).json({ error: e });
    }

});

function palindrome(str) {
    let re = /[\W_]/g;
    var lowerStr = str.toLowerCase().replace(re, '');
    var reverseStr = lowerStr.split('').reverse().join('');
    return reverseStr === lowerStr;
}

module.exports = router;