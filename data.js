/* SJC CAMPUS NAVIGATOR — SHARED DATA */
window.SJC = window.SJC || {};
const locations = {

        gate1: {
            name: "Gate 01 — Main Entrance",
            category: "CAMPUS GATE",
            icon: "01",
            description:
                "Primary campus entrance and one of the main access points to the SJC campus.",
            x: 92,
            y: 405
        },

        gate2: {
            name: "Gate 02 — East Gate",
            category: "CAMPUS GATE",
            icon: "02",
            description:
                "Eastern access point connecting the campus with the surrounding road network.",
            x: 1307,
            y: 405
        },

        gate3: {
            name: "Gate 03 — North Gate",
            category: "CAMPUS GATE",
            icon: "03",
            description:
                "Northern campus access point.",
            x: 680,
            y: 90
        },

        gate4: {
            name: "Gate 04 — South Gate",
            category: "CAMPUS GATE",
            icon: "04",
            description:
                "Southern campus access point.",
            x: 565,
            y: 735
        },

        gate5: {
            name: "Gate 05 — Service Gate",
            category: "CAMPUS GATE",
            icon: "05",
            description:
                "Service-side access point towards the southern-eastern side of campus.",
            x: 1310,
            y: 715
        },

        library: {
            name: "Arrupe Library",
            category: "ACADEMIC",
            icon: "LIB",
            description:
                "A major academic destination for reading, research and student study.",
            x: 390,
            y: 332
        },

        mca: {
            name: "MCA Block",
            category: "COMPUTING",
            icon: "MCA",
            description:
                "Dedicated navigation point for the Master of Computer Applications area.",
            x: 555,
            y: 320
        },

        church: {
            name: "SJC Church",
            category: "HERITAGE",
            icon: "SJ",
            description:
                "One of the prominent heritage landmarks within the St. Joseph's campus.",
            x: 650,
            y: 200
        },

        jim: {
            name: "Joseph Institute of Management",
            category: "MANAGEMENT",
            icon: "JIM",
            description:
                "Management education and academic destination.",
            x: 900,
            y: 320
        },

        computer: {
            name: "Computer Science",
            category: "COMPUTING",
            icon: "CS",
            description:
                "Computer Science academic destination.",
            x: 795,
            y: 467
        },

        physics: {
            name: "Physics",
            category: "SCIENCE",
            icon: "PHY",
            description:
                "Physics department and associated academic spaces.",
            x: 555,
            y: 475
        },

        chemistry: {
            name: "Chemistry",
            category: "SCIENCE",
            icon: "CH",
            description:
                "Chemistry department and laboratory area.",
            x: 1005,
            y: 465
        },

        biology: {
            name: "Biological Sciences",
            category: "SCIENCE",
            icon: "BIO",
            description:
                "Biological sciences academic area.",
            x: 370,
            y: 560
        },

        humanities: {
            name: "Humanities & Languages",
            category: "HUMANITIES",
            icon: "HUM",
            description:
                "Humanities and language-oriented academic spaces.",
            x: 745,
            y: 605
        },

        admin: {
            name: "Administrative Office",
            category: "ADMINISTRATION",
            icon: "ADM",
            description:
                "Administrative services and institutional offices.",
            x: 955,
            y: 160
        },

        nutri: {
            name: "Nutri Corner",
            category: "FOOD & WELLNESS",
            icon: "N",
            description:
                "A convenient campus food and refreshment destination.",
            x: 1122,
            y: 565
        },

        canteen: {
            name: "College Canteen",
            category: "FOOD",
            icon: "CAN",
            description:
                "Student-friendly food and refreshment destination.",
            x: 1100,
            y: 312
        },

        parking: {
            name: "Campus Parking",
            category: "FACILITY",
            icon: "P",
            description:
                "Designated parking area for campus visitors and vehicles.",
            x: 1175,
            y: 690
        },

        museum: {
            name: "College Museum",
            category: "HERITAGE",
            icon: "M",
            description:
                "A heritage-oriented campus destination.",
            x: 172,
            y: 260
        },

        herbarium: {
            name: "Rapinat Herbarium",
            category: "FACILITY",
            icon: "H",
            description:
                "A distinctive botanical academic resource associated with the campus.",
            x: 170,
            y: 580
        },

        sports: {
            name: "Sports Ground",
            category: "SPORTS",
            icon: "S",
            description:
                "Campus sports and physical activity destination.",
            x: 1177,
            y: 155
        },

        shepherd: {
            name: "SHEPHERD Centre",
            category: "COMMUNITY",
            icon: "SH",
            description:
                "Community outreach and social engagement destination.",
            x: 477,
            y: 700
        }

    };
const graph = {

        gate1: ["museum", "library"],

        museum: ["gate1", "library"],

        library: ["gate1", "mca", "biology"],

        mca: ["library", "church", "physics", "computer"],

        church: ["mca", "gate3", "admin"],

        gate3: ["church", "admin"],

        admin: ["church", "jim", "sports"],

        sports: ["admin", "gate2"],

        jim: ["admin", "canteen", "computer"],

        canteen: ["jim", "nutri", "gate2"],

        computer: [
            "mca",
            "jim",
            "physics",
            "chemistry",
            "humanities"
        ],

        physics: [
            "mca",
            "computer",
            "biology",
            "shepherd"
        ],

        chemistry: [
            "computer",
            "nutri",
            "gate2"
        ],

        biology: [
            "library",
            "physics",
            "herbarium",
            "shepherd"
        ],

        herbarium: [
            "biology",
            "gate4"
        ],

        shepherd: [
            "biology",
            "physics",
            "gate4",
            "humanities"
        ],

        humanities: [
            "computer",
            "shepherd",
            "nutri"
        ],

        nutri: [
            "canteen",
            "chemistry",
            "humanities",
            "parking"
        ],

        parking: [
            "nutri",
            "gate5"
        ],

        gate2: [
            "sports",
            "canteen",
            "chemistry"
        ],

        gate4: [
            "herbarium",
            "shepherd"
        ],

        gate5: [
            "parking"
        ]

    };
const departments = [

        ["01", "Artificial Intelligence", "Computing / Technology"],
        ["02", "Biochemistry", "Biological Sciences"],
        ["03", "Botany", "Biological Sciences"],
        ["04", "Biotechnology", "Biological Sciences"],
        ["05", "Business Administration", "Management"],
        ["06", "B.Com Business Analytics", "Commerce"],
        ["07", "B.Com Honours", "Commerce"],
        ["08", "B.Com Strategic Finance", "Commerce"],
        ["09", "Chemistry", "Physical Sciences"],
        ["10", "Commerce", "Commerce"],
        ["11", "Commerce Computer Applications", "Computing / Commerce"],
        ["12", "Computer Science", "Computing"],
        ["13", "Counselling Psychology", "Human Sciences"],
        ["14", "Data Science", "Computing / Data"],
        ["15", "Economics", "Social Sciences"],
        ["16", "Electronics", "Physical Sciences"],
        ["17", "English", "Languages"],
        ["18", "French", "Languages"],
        ["19", "Hindi", "Languages"],
        ["20", "History", "Humanities"],
        ["21", "Human Excellence", "Student Development"],
        ["22", "Human Resource Management", "Management"],
        ["23", "Information Technology", "Computing"],
        ["24", "Mathematics", "Physical Sciences"],
        ["25", "B.Sc. Physical Education, Health Education & Sports", "Sports"],
        ["26", "Physics", "Physical Sciences"],
        ["27", "Sanskrit", "Languages"],
        ["28", "Software Development & System Administration", "Vocational"],
        ["29", "Statistics", "Data / Mathematics"],
        ["30", "Tamil", "Languages"],
        ["31", "Viscom Technology", "Media / Vocational"]

    ];
const places = [

        {
            id: "mca",
            number: "01",
            icon: "⌁",
            category: "COMPUTING",
            title: "MCA Block",
            description:
                "Master of Computer Applications destination."
        },

        {
            id: "library",
            number: "02",
            icon: "◫",
            category: "ACADEMIC",
            title: "Arrupe Library",
            description:
                "Reading, research and study destination."
        },

        {
            id: "canteen",
            number: "03",
            icon: "＋",
            category: "FOOD",
            title: "College Canteen",
            description:
                "Everyday food and student gathering space."
        },

        {
            id: "nutri",
            number: "04",
            icon: "◉",
            category: "WELLNESS",
            title: "Nutri Corner",
            description:
                "Quick food and refreshment destination."
        },

        {
            id: "parking",
            number: "05",
            icon: "P",
            category: "FACILITY",
            title: "Parking",
            description:
                "Convenient campus vehicle parking area."
        },

        {
            id: "church",
            number: "06",
            icon: "✦",
            category: "HERITAGE",
            title: "SJC Church",
            description:
                "A prominent heritage landmark."
        },

        {
            id: "museum",
            number: "07",
            icon: "□",
            category: "HERITAGE",
            title: "College Museum",
            description:
                "Campus heritage and institutional memory."
        },

        {
            id: "sports",
            number: "08",
            icon: "○",
            category: "SPORTS",
            title: "Sports Ground",
            description:
                "Physical education and sports destination."
        }

    ];
const selectLocations = [

        ["gate1", "Gate 01 — Main Entrance"],
        ["gate2", "Gate 02 — East Gate"],
        ["gate3", "Gate 03 — North Gate"],
        ["gate4", "Gate 04 — South Gate"],
        ["gate5", "Gate 05 — Service Gate"],

        ["mca", "MCA Block"],
        ["library", "Arrupe Library"],
        ["church", "SJC Church"],
        ["jim", "Joseph Institute of Management"],
        ["computer", "Computer Science"],
        ["physics", "Physics"],
        ["chemistry", "Chemistry"],
        ["biology", "Biological Sciences"],
        ["humanities", "Humanities & Languages"],

        ["admin", "Administrative Office"],
        ["nutri", "Nutri Corner"],
        ["canteen", "College Canteen"],
        ["parking", "Campus Parking"],
        ["museum", "College Museum"],
        ["herbarium", "Rapinat Herbarium"],
        ["sports", "Sports Ground"],
        ["shepherd", "SHEPHERD Centre"]

    ];
window.SJC.locations = locations;
window.SJC.graph = graph;
window.SJC.departments = departments;
window.SJC.places = places;
window.SJC.selectLocations = selectLocations;
