﻿interface TeamInfo {
    starters: SerializedBatterInfo[]
}

const team1: { starters: SerializedBatterInfo[] } = {
    "starters": [
        {
            "name": "Mason",
            "thumbnail": "images/team1/square/mason.png",
            "image": "images/team1/mason.png",
            "description": [
                "Sabina's brother, a dedicated young warrior who has made it his personal mission to protect her.",
                "Likes: Loyalty",
                "Dislikes: Dogma"
            ],
            "at_bats": 456,
            "total_hits": 126,
            "doubles": 25,
            "triples": 7,
            "home_runs": 13,
            "walks": 79,
            "hit_by_pitch": 11,
            "sacrifice_hits": 1,
            "sacrifice_flies": 4,
            "intentional_walks": 0
        },
        {
            "name": "Ralph",
            "thumbnail": "images/team1/square/ralph.png",
            "image": "images/team1/ralph.png",
            "description": [
                "A shy raccoon born with the ability to talk, something nobody else in his family could ever do.",
                "Likes: Being able to talk to humans",
                "Dislikes: Not being able to talk to other raccoons"
            ],
            "at_bats": 603,
            "total_hits": 176,
            "doubles": 35,
            "triples": 3,
            "home_runs": 39,
            "walks": 75,
            "hit_by_pitch": 18,
            "sacrifice_hits": 0,
            "sacrifice_flies": 3,
            "intentional_walks": 5
        },
        {
            "name": "Sabina",
            "thumbnail": "images/team1/square/sabina.png",
            "image": "images/team1/sabina.png",
            "description": [
                "A part-human, part-dragon teenager. She can shapeshift between the two forms, but her anxiety often causes her to do so involuntarily.",
                "Likes: Athletics",
                "Dislikes: Turning into a dragon"
            ],
            "at_bats": 583,
            "total_hits": 170,
            "doubles": 43,
            "triples": 4,
            "home_runs": 32,
            "walks": 74,
            "hit_by_pitch": 16,
            "sacrifice_hits": 0,
            "sacrifice_flies": 3,
            "intentional_walks": 8
        },
        {
            "name": "Zigzag",
            "thumbnail": "images/team1/square/zigzag.png",
            "image": "images/team1/zigzag.png",
            "description": [
                "A two foot tall jelly monster with a heart of gold. He often develops romantic feelings toward humans, but they never seem interested in him (unless they're trying to stick a sword through his eye.)",
                "Likes: Soap",
                "Dislikes: Rejection"
            ],
            "at_bats": 523,
            "total_hits": 142,
            "doubles": 31,
            "triples": 3,
            "home_runs": 18,
            "walks": 96,
            "hit_by_pitch": 4,
            "sacrifice_hits": 4,
            "sacrifice_flies": 4,
            "intentional_walks": 6
        },
        {
            "name": "Arike",
            "thumbnail": "images/team1/square/arike.png",
            "image": "images/team1/arike.png",
            "description": [
                "A scientist who arrived through a portal from another world, leaving her friends behind, to ensure that the worlds remained separate and prevent an invasion. Very smart and kind of a geek.",
                "Likes: Star Wars Episode III: Revenge of the Sith",
                "Dislikes: Star Wars Episode I: The Phantom Menace"
            ],
            "at_bats": 525,
            "total_hits": 125,
            "doubles": 25,
            "triples": 3,
            "home_runs": 21,
            "walks": 55,
            "hit_by_pitch": 12,
            "sacrifice_hits": 0,
            "sacrifice_flies": 6,
            "intentional_walks": 6
        },
        {
            "name": "Megan",
            "thumbnail": "images/team1/square/megan.png",
            "image": "images/team1/megan.png",
            "description": [
                "A young snake monster who once tried to attack Mason but wound up saving his life. Wants to make her parents proud.",
                "Likes: Puns",
                "Dislikes: Dead animals"
            ],
            "at_bats": 227,
            "total_hits": 54,
            "doubles": 9,
            "triples": 0,
            "home_runs": 12,
            "walks": 31,
            "hit_by_pitch": 3,
            "sacrifice_hits": 0,
            "sacrifice_flies": 3,
            "intentional_walks": 0
        },
        {
            "name": "Centian",
            "thumbnail": "images/team1/square/centian.png",
            "image": "images/team1/centian.png",
            "description": [
                "The spirit of a young teenage warrior who died in battle. Insists on theological grounds that he is not an angel, just a ghost with wings.",
                "Likes: God, family, monsters",
                "Dislikes: Misunderstandings"
            ],
            "at_bats": 530,
            "total_hits": 122,
            "doubles": 27,
            "triples": 1,
            "home_runs": 7,
            "walks": 54,
            "hit_by_pitch": 5,
            "sacrifice_hits": 1,
            "sacrifice_flies": 2,
            "intentional_walks": 0
        },
        {
            "name": "Paralari",
            "thumbnail": "images/team1/square/paralari.png",
            "image": "images/team1/paralari.png",
            "description": [
                "A monster/fairy hybrid who has been in countless battles but never seems to get hurt. Seems suspiciouly nice when you first meet her, but that's just the way she is.",
                "Likes: Flowers made out of cake frosting",
                "Dislikes: Thunder"
            ],
            "at_bats": 241,
            "total_hits": 52,
            "doubles": 8,
            "triples": 1,
            "home_runs": 8,
            "walks": 38,
            "hit_by_pitch": 3,
            "sacrifice_hits": 0,
            "sacrifice_flies": 2,
            "intentional_walks": 5
        },
        {
            "name": "Tomas",
            "thumbnail": "images/team1/square/tomas.png",
            "image": "images/team1/tomas.png",
            "description": [
                "A wizard who was turned into a book by a jealous rival who wanted to learn his secrets.",
                "Likes: Librarians",
                "Dislikes: Being read"
            ],
            "at_bats": 59,
            "total_hits": 6,
            "doubles": 3,
            "triples": 0,
            "home_runs": 0,
            "walks": 6,
            "hit_by_pitch": 0,
            "sacrifice_hits": 10,
            "sacrifice_flies": 0,
            "intentional_walks": 0
        }
    ]
};

const team2: { starters: SerializedBatterInfo[] } = {
    "starters": [
        {
            name: "Bandit",
            fullName: "Kris \"Bandit\" Everett",
            thumbnail: "images/team2/square/bandit.svg",
            image: "images/team2/bandit.svg",
            description: [
                "Species: Lizard",
                "Gender: Male",
                "Bandit is smart and a bit of an eccentric; he almost always wears a mask and bandana. A New Jersey native, he's starting his first year at Princeton."
            ],
            at_bats: 582,
            total_hits: 151,
            doubles: 31,
            triples: 3,
            home_runs: 34,
            walks: 99,
            hit_by_pitch: 2,
            sacrifice_hits: 0,
            sacrifice_flies: 2,
            intentional_walks: 0
        },
        {
            name: "Melanie",
            fullName: "MEchanical Lifeform / Artifical Newly Intelligent Entity",
            thumbnail: "images/team2/square/melanie.svg",
            image: "images/team2/melanie.svg",
            description: [
                "Species: Robot",
                "Gender: Female",
                "Bandit's roommate Melanie was created in 1999 when her brother accidentally made an AI clone of himself on an iMac. Her main computer system still runs on PowerPC."
            ],
            at_bats: 610,
            total_hits: 168,
            doubles: 41,
            triples: 4,
            home_runs: 23,
            walks: 60,
            hit_by_pitch: 6,
            sacrifice_hits: 5,
            sacrifice_flies: 7,
            intentional_walks: 0
        },
        {
            name: "Looper",
            fullName: "Jenny Looper",
            thumbnail: "images/team2/square/looper.svg",
            image: "images/team2/looper.svg",
            description: [
                "Species: Cat",
                "Gender: Female",
                "Looper, a high school classmate of Bandit and Angie, goes to Princeton Theological Seminary and hopes to be a priest."
            ],
            at_bats: 604,
            total_hits: 182,
            doubles: 30,
            triples: 3,
            home_runs: 15,
            walks: 57,
            hit_by_pitch: 5,
            sacrifice_hits: 3,
            sacrifice_flies: 15,
            intentional_walks: 3
        },
        {
            name: "Angie",
            fullName: "Angie Coderre",
            thumbnail: "images/team2/square/angie.svg",
            image: "images/team2/angie.svg",
            description: [
                "Species: Lizard",
                "Gender: Female",
                "Bandit's girlfriend Angie is a student at Rutgers University. She was adopted as a baby by a well-off human family from Jersey City."
            ],
            at_bats: 557,
            total_hits: 133,
            doubles: 22,
            triples: 1,
            home_runs: 34,
            walks: 78,
            hit_by_pitch: 5,
            sacrifice_hits: 0,
            sacrifice_flies: 5,
            intentional_walks: 2
        },
        {
            name: "Casey",
            fullName: "Clock And Super Energetic Youth",
            description: [
                "Species: Alarm clock",
                "Gender: Alarm clock",
                "Casey was created as an experimental AI using the body of an alarm clock. They were abadoned by their creator and now live in Melanie's dorm room."
            ],
            at_bats: 565,
            total_hits: 84,
            doubles: 46,
            triples: 3,
            home_runs: 11,
            walks: 44,
            hit_by_pitch: 4,
            sacrifice_hits: 1,
            sacrifice_flies: 4,
            intentional_walks:1
        },
        {
            name: "Robert",
            fullName: "Robert Coderre",
            thumbnail: "images/team2/square/robert.svg",
            image: "images/team2/robert.svg",
            description: [
                "Species: Human",
                "Gender: Male",
                "Robert is Angie's brother and Bandit's high school friend. He was the one who encouraged Bandit to apply to Princeton."
            ],
            at_bats: 251,
            total_hits: 42,
            doubles: 11,
            triples: 1,
            home_runs: 9,
            walks: 9,
            hit_by_pitch: 2,
            sacrifice_hits: 0,
            sacrifice_flies: 2,
            intentional_walks: 0
        },
        {
            name: "Rory",
            fullName: "Rory Milton",
            thumbnail: "images/team2/square/rory.svg",
            image: "images/team2/rory.svg",
            description: [
                "Species: Armadillo",
                "Gender: Female",
                "Rory is a student in one of Bandit's math classes. She's usually confident, unless she has a crush on another girl."
            ],
            at_bats: 385,
            total_hits: 110,
            doubles: 25,
            triples: 5,
            home_runs: 8,
            walks: 23,
            hit_by_pitch: 3,
            sacrifice_hits: 3,
            sacrifice_flies: 4,
            intentional_walks: 2
        },
        {
            name: "Parker",
            fullName: "Phone And Radio Kid (Excluding Radio)",
            description: [
                "Species: Telephone",
                "Gender: Male",
                "Parker is another abandoned AI experiment adopted by Melanie. He acts grumpy but is always helpful when you need him."
            ],
            at_bats: 454,
            total_hits: 113,
            doubles: 23,
            triples: 2,
            home_runs: 12,
            walks: 33,
            hit_by_pitch: 5,
            sacrifice_hits: 1,
            sacrifice_flies: 2,
            intentional_walks: 0
        },
        {
            name: "Maria",
            fullName: "Maria Magnolia Maldonado Ramirez",
            thumbnail: "images/team2/square/maria.svg",
            image: "images/team2/maria.svg",
            description: [
                "Maria is a student in Bandit's math and computer classes. She mostly stays to herself, so Bandit doesn't know much about her."
            ],
            at_bats: 321,
            total_hits: 95,
            doubles: 18,
            triples: 5,
            home_runs: 14,
            walks: 36,
            hit_by_pitch: 4,
            sacrifice_hits: 2,
            sacrifice_flies: 2,
            intentional_walks: 4
        }
    ]
}
