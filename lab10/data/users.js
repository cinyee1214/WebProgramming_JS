const userData = [{
        _id: 0,
        username: "masterdetective123",
        firstName: "Sherlock",
        lastName: "Holmes",
        Profession: "Detective",
        Bio: "Sherlock Holmes(/ˈʃɜːrlɒk ˈhoʊmz/) is a fictional private detective created by British author Sir Arthur Conan Doyle.Known as a \"consulting detective\" in the stories, Holmes is known for a proficiency with observation, forensic science, and logical reasoning that borders on the fantastic, which he employs when investigating cases for a wide variety of clients, including Scotland Yard.",
        hashedPassword: "$2a$16$7JKSiEmoP3GNDSalogqgPu0sUbwder7CAN/5wnvCWe6xCKAKwlTD."
    },
    {
        _id: 1,
        username: "lemon",
        firstName: "Elizabeth",
        lastName: "Lemon",
        Profession: "Writer",
        Bio: "Elizabeth Miervaldis \"Liz\" Lemon is the main character of the American television series 30 Rock. She created and writes for the fictional comedy-sketch show The Girlie Show or TGS with Tracy Jordan.",
        hashedPassword: "$2a$16$SsR2TGPD24nfBpyRlBzINeGU61AH0Yo/CbgfOlU1ajpjnPuiQaiDm"
    },
    {
        _id: 2,
        username: "theboywholived",
        firstName: "Harry",
        lastName: "Potter",
        Profession: "Student",
        Bio: "Harry Potter is a series of fantasy novels written by British author J. K. Rowling. The novels chronicle the life of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry . The main story arc concerns Harry's struggle against Lord Voldemort, a dark wizard who intends to become immortal, overthrow the wizard governing body known as the Ministry of Magic, and subjugate all wizards and Muggles.",
        hashedPassword: "$2a$16$4o0WWtrq.ZefEmEbijNCGukCezqWTqz1VWlPm/xnaLM8d3WlS5pnK"
    }
];

async function getUserData(username) {
    // for (let i = 0; i < userData.length; i++) {
    //     if (userData[i].username === username) {
    //         return userData[i];
    //     }
    // }
    for (let user of userData) {
        if (user.username == username) {
            return user;
        }
    }
    return null;
}

module.exports = {
    userData,
    getUserData
}