/* =========================================================
   SJC CAMPUS NAVIGATOR
   INTERACTIVE MAP + ROUTING SYSTEM
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       LOCATION DATABASE
    ===================================================== */

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


    /* =====================================================
       ROUTE GRAPH
    ===================================================== */

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


    /* =====================================================
       DOM
    ===================================================== */

    const startSelect =
        document.getElementById("startLocation");

    const destinationSelect =
        document.getElementById("destinationLocation");

    const routeButton =
        document.getElementById("routeButton");

    const swapButton =
        document.getElementById("swapButton");

    const resetButton =
        document.getElementById("resetMapButton");

    const routeLayer =
        document.getElementById("routeLayer");

    const markerLayer =
        document.getElementById("markerLayer");

    const map =
        document.getElementById("campusMap");

    const mapWrapper =
        document.getElementById("mapWrapper");

    const zoomIn =
        document.getElementById("zoomIn");

    const zoomOut =
        document.getElementById("zoomOut");

    const resetZoom =
        document.getElementById("resetZoom");

    const routeStatus =
        document.getElementById("routeStatus");

    const distanceValue =
        document.getElementById("distanceValue");

    const timeValue =
        document.getElementById("timeValue");

    const routeMessage =
        document.getElementById("routeMessage");

    const placeGrid =
        document.getElementById("placeGrid");

    const departmentGrid =
        document.getElementById("departmentGrid");

    const departmentSearch =
        document.getElementById("departmentSearch");

    const themeButton =
        document.getElementById("themeButton");

    const modal =
        document.getElementById("locationModal");

    const modalClose =
        document.getElementById("modalClose");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalCategory =
        document.getElementById("modalCategory");

    const modalDescription =
        document.getElementById("modalDescription");

    const modalIcon =
        document.getElementById("modalIcon");

    const modalRouteButton =
        document.getElementById("modalRouteButton");

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");


    /* =====================================================
       DEPARTMENTS
    ===================================================== */

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


    /* =====================================================
       LOCATION SELECT OPTIONS
    ===================================================== */

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


    function populateSelects() {

        selectLocations.forEach(([id, name]) => {

            const optionA =
                document.createElement("option");

            optionA.value = id;
            optionA.textContent = name;

            startSelect.appendChild(optionA);


            const optionB =
                document.createElement("option");

            optionB.value = id;
            optionB.textContent = name;

            destinationSelect.appendChild(optionB);

        });


        startSelect.value = "gate1";
        destinationSelect.value = "mca";

    }


    populateSelects();


    /* =====================================================
       PLACES
    ===================================================== */

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


    function renderPlaces() {

        placeGrid.innerHTML = "";

        places.forEach(place => {

            const card =
                document.createElement("article");

            card.className = "place-card";

            card.innerHTML = `

                <span class="place-index">
                    ${place.number}
                </span>

                <div class="place-icon">
                    ${place.icon}
                </div>

                <span>
                    ${place.category}
                </span>

                <h3>
                    ${place.title}
                </h3>

                <p>
                    ${place.description}
                </p>

            `;

            card.addEventListener("click", () => {

                destinationSelect.value = place.id;

                document
                    .getElementById("navigator")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

                setTimeout(() => {

                    calculateRoute();

                }, 700);

            });

            placeGrid.appendChild(card);

        });

    }


    renderPlaces();


    /* =====================================================
       DEPARTMENT RENDER
    ===================================================== */

    function renderDepartments(filter = "") {

        departmentGrid.innerHTML = "";

        const query =
            filter.trim().toLowerCase();


        const filtered =
            departments.filter(dept =>
                dept[1].toLowerCase().includes(query) ||
                dept[2].toLowerCase().includes(query)
            );


        if (!filtered.length) {

            departmentGrid.innerHTML = `

                <div
                    style="
                        grid-column:1/-1;
                        padding:40px;
                        color:rgba(255,255,255,.5);
                        text-align:center;
                    "
                >
                    No department found.
                </div>

            `;

            return;

        }


        filtered.forEach(dept => {

            const card =
                document.createElement("article");

            card.className =
                "department-card";


            card.innerHTML = `

                <small>
                    ${dept[0]}
                </small>

                <h3>
                    ${dept[1]}
                </h3>

                <p>
                    ${dept[2]}
                </p>

            `;


            departmentGrid.appendChild(card);

        });

    }


    renderDepartments();


    if (departmentSearch) {

        departmentSearch.addEventListener(
            "input",
            e => {

                renderDepartments(
                    e.target.value
                );

            }
        );

    }


    /* =====================================================
       MAP MARKERS
    ===================================================== */

    function createMarkers() {

        markerLayer.innerHTML = "";


        Object.entries(locations).forEach(
            ([id, location]) => {

                const group =
                    document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "g"
                    );

                group.setAttribute(
                    "class",
                    "map-marker"
                );


                group.setAttribute(
                    "data-location",
                    id
                );


                const circle =
                    document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "circle"
                    );


                circle.setAttribute(
                    "cx",
                    location.x
                );


                circle.setAttribute(
                    "cy",
                    location.y
                );


                circle.setAttribute(
                    "r",
                    "9"
                );


                circle.setAttribute(
                    "fill",
                    "#1687ff"
                );


                circle.setAttribute(
                    "stroke",
                    "white"
                );


                circle.setAttribute(
                    "stroke-width",
                    "3"
                );


                group.appendChild(circle);


                group.addEventListener(
                    "click",
                    event => {

                        event.stopPropagation();

                        openLocation(id);

                    }
                );


                markerLayer.appendChild(group);

            }
        );

    }


    createMarkers();


    /* =====================================================
       LOCATION MODAL
    ===================================================== */

    let modalLocation = null;


    function openLocation(id) {

        const location =
            locations[id];


        if (!location)
            return;


        modalLocation = id;


        modalTitle.textContent =
            location.name;


        modalCategory.textContent =
            location.category;


        modalDescription.textContent =
            location.description;


        modalIcon.textContent =
            location.icon;


        modal.classList.add("active");

    }


    function closeModal() {

        modal.classList.remove("active");

        modalLocation = null;

    }


    modalClose.addEventListener(
        "click",
        closeModal
    );


    modal.addEventListener(
        "click",
        event => {

            if (
                event.target.classList.contains(
                    "modal-overlay"
                )
            ) {

                closeModal();

            }

        }
    );


    modalRouteButton.addEventListener(
        "click",
        () => {

            if (!modalLocation)
                return;


            destinationSelect.value =
                modalLocation;


            closeModal();


            document
                .getElementById("navigator")
                .scrollIntoView({
                    behavior: "smooth"
                });


            setTimeout(
                calculateRoute,
                700
            );

        }
    );


    /* =====================================================
       BREADTH-FIRST SEARCH
    ===================================================== */

    function findPath(start, end) {

        if (start === end)
            return [start];


        const queue = [start];

        const visited =
            new Set([start]);

        const previous = {};


        while (queue.length) {

            const current =
                queue.shift();


            const neighbours =
                graph[current] || [];


            for (
                const next of neighbours
            ) {

                if (visited.has(next))
                    continue;


                visited.add(next);

                previous[next] =
                    current;


                if (next === end) {

                    const path = [];

                    let node = end;


                    while (node) {

                        path.unshift(node);

                        node =
                            previous[node];

                    }


                    return path;

                }


                queue.push(next);

            }

        }


        return [];

    }


    /* =====================================================
       SVG ROUTE
    ===================================================== */

    function buildRoutePath(path) {

        if (!path.length)
            return "";


        const points =
            path.map(
                id => locations[id]
            );


        let d =
            `M ${points[0].x} ${points[0].y}`;


        for (
            let i = 1;
            i < points.length;
            i++
        ) {

            const prev =
                points[i - 1];

            const current =
                points[i];


            const midX =
                (prev.x + current.x) / 2;


            const midY =
                (prev.y + current.y) / 2;


            d +=
                ` Q ${midX} ${prev.y} ${current.x} ${current.y}`;

        }


        return d;

    }


    /* =====================================================
       ROUTE DISTANCE
    ===================================================== */

    function calculateDistance(path) {

        let distance = 0;


        for (
            let i = 1;
            i < path.length;
            i++
        ) {

            const a =
                locations[path[i - 1]];

            const b =
                locations[path[i]];


            const dx =
                b.x - a.x;

            const dy =
                b.y - a.y;


            distance +=
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );

        }


        /*
            SVG units are converted into
            an approximate campus walking
            distance for this conceptual map.
        */

        return Math.max(
            40,
            Math.round(distance * .58)
        );

    }


    /* =====================================================
       DRAW ROUTE
    ===================================================== */

    function drawRoute(path) {

        routeLayer.innerHTML = "";


        if (!path.length)
            return;


        const routePath =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "path"
            );


        routePath.setAttribute(
            "class",
            "route-path"
        );


        routePath.setAttribute(
            "d",
            buildRoutePath(path)
        );


        routeLayer.appendChild(
            routePath
        );


        path.forEach(
            (id, index) => {

                const location =
                    locations[id];


                const stop =
                    document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "circle"
                    );


                stop.setAttribute(
                    "class",
                    "route-stop"
                );


                stop.setAttribute(
                    "cx",
                    location.x
                );


                stop.setAttribute(
                    "cy",
                    location.y
                );


                stop.setAttribute(
                    "r",
                    index === 0 ||
                    index === path.length - 1
                        ? 10
                        : 6
                );


                routeLayer.appendChild(
                    stop
                );

            }
        );


        /*
            Moving navigation dot.
        */

        const traveller =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "circle"
            );


        traveller.setAttribute(
            "class",
            "route-travel-dot"
        );


        traveller.setAttribute(
            "r",
            "8"
        );


        routeLayer.appendChild(
            traveller
        );


        animateTraveller(
            traveller,
            path
        );

    }


    /* =====================================================
       MOVING ROUTE DOT
    ===================================================== */

    let travellerAnimation = null;


    function animateTraveller(
        traveller,
        path
    ) {

        if (travellerAnimation) {

            cancelAnimationFrame(
                travellerAnimation
            );

        }


        const points =
            path.map(
                id => locations[id]
            );


        let segment = 0;

        let progress = 0;


        function animate() {

            if (
                segment >=
                points.length - 1
            ) {

                segment = 0;
                progress = 0;

            }


            const start =
                points[segment];

            const end =
                points[segment + 1];


            progress += .008;


            if (progress >= 1) {

                progress = 0;
                segment++;

            }


            const x =
                start.x +
                (end.x - start.x) *
                progress;


            const y =
                start.y +
                (end.y - start.y) *
                progress;


            traveller.setAttribute(
                "cx",
                x
            );


            traveller.setAttribute(
                "cy",
                y
            );


            travellerAnimation =
                requestAnimationFrame(
                    animate
                );

        }


        animate();

    }


    /* =====================================================
       ROUTE CALCULATION
    ===================================================== */

    function calculateRoute() {

        const start =
            startSelect.value;


        const destination =
            destinationSelect.value;


        if (
            !start ||
            !destination
        )
            return;


        if (
            start === destination
        ) {

            routeLayer.innerHTML = "";

            routeStatus.textContent =
                "SAME LOCATION";


            distanceValue.textContent =
                "0 m";


            timeValue.textContent =
                "0 min";


            routeMessage.textContent =
                "Starting point and destination are the same.";


            showToast(
                "Select two different locations."
            );


            return;

        }


        const path =
            findPath(
                start,
                destination
            );


        if (!path.length) {

            routeStatus.textContent =
                "NO ROUTE";


            routeMessage.textContent =
                "A route could not be generated between these locations.";


            return;

        }


        drawRoute(path);


        const distance =
            calculateDistance(path);


        const minutes =
            Math.max(
                1,
                Math.ceil(
                    distance / 70
                )
            );


        routeStatus.textContent =
            "ROUTE READY";


        distanceValue.textContent =
            `${distance} m`;


        timeValue.textContent =
            `${minutes} min`;


        routeMessage.textContent =
            `${locations[start].name} → ${locations[destination].name}`;


        highlightLocations(path);


        showToast(
            `Route created · ${distance} m`
        );

    }


    /* =====================================================
       HIGHLIGHT ROUTE LOCATIONS
    ===================================================== */

    function highlightLocations(path) {

        document
            .querySelectorAll(".map-location")
            .forEach(
                element => {

                    element.classList.remove(
                        "active"
                    );

                }
            );


        path.forEach(id => {

            const element =
                document.querySelector(
                    `.map-location[data-location="${id}"]`
                );


            if (element) {

                element.classList.add(
                    "active"
                );

            }

        });

    }


    /* =====================================================
       BUTTON EVENTS
    ===================================================== */

    routeButton.addEventListener(
        "click",
        calculateRoute
    );


    swapButton.addEventListener(
        "click",
        () => {

            const currentStart =
                startSelect.value;


            startSelect.value =
                destinationSelect.value;


            destinationSelect.value =
                currentStart;


            calculateRoute();

        }
    );


    resetButton.addEventListener(
        "click",
        () => {

            startSelect.value =
                "gate1";


            destinationSelect.value =
                "mca";


            routeLayer.innerHTML = "";


            routeStatus.textContent =
                "READY";


            distanceValue.textContent =
                "—";


            timeValue.textContent =
                "—";


            routeMessage.textContent =
                "Choose a destination to generate your campus route.";


            document
                .querySelectorAll(".map-location")
                .forEach(
                    el =>
                        el.classList.remove(
                            "active"
                        )
                );


            showToast(
                "Navigation reset."
            );

        }
    );


    /* =====================================================
       MAP ZOOM
    ===================================================== */

    let zoom =
        1;


    let panX =
        0;


    let panY =
        0;


    function updateMapTransform() {

        map.style.transform =
            `translate(${panX}px, ${panY}px) scale(${zoom})`;

    }


    zoomIn.addEventListener(
        "click",
        () => {

            zoom =
                Math.min(
                    1.8,
                    zoom + .15
                );


            updateMapTransform();

        }
    );


    zoomOut.addEventListener(
        "click",
        () => {

            zoom =
                Math.max(
                    .7,
                    zoom - .15
                );


            updateMapTransform();

        }
    );


    resetZoom.addEventListener(
        "click",
        () => {

            zoom = 1;

            panX = 0;

            panY = 0;

            updateMapTransform();

        }
    );


    /* =====================================================
       MAP DRAG
    ===================================================== */

    let dragging = false;

    let dragStartX = 0;

    let dragStartY = 0;


    mapWrapper.addEventListener(
        "pointerdown",
        event => {

            dragging = true;

            mapWrapper.setPointerCapture(
                event.pointerId
            );


            dragStartX =
                event.clientX - panX;


            dragStartY =
                event.clientY - panY;

        }
    );


    mapWrapper.addEventListener(
        "pointermove",
        event => {

            if (!dragging)
                return;


            panX =
                event.clientX -
                dragStartX;


            panY =
                event.clientY -
                dragStartY;


            updateMapTransform();

        }
    );


    mapWrapper.addEventListener(
        "pointerup",
        () => {

            dragging = false;

        }
    );


    mapWrapper.addEventListener(
        "pointerleave",
        () => {

            dragging = false;

        }
    );


    /* =====================================================
       THEME
    ===================================================== */

    themeButton.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark"
            );


            const isDark =
                document.body.classList.contains(
                    "dark"
                );


            localStorage.setItem(
                "sjc-theme",
                isDark
                    ? "dark"
                    : "light"
            );

        }
    );


    const savedTheme =
        localStorage.getItem(
            "sjc-theme"
        );


    if (
        savedTheme === "dark"
    ) {

        document.body.classList.add(
            "dark"
        );

    }


    /* =====================================================
       TOAST
    ===================================================== */

    let toastTimer;


    function showToast(message) {

        toastMessage.textContent =
            message;


        toast.classList.add(
            "show"
        );


        clearTimeout(
            toastTimer
        );


        toastTimer =
            setTimeout(
                () => {

                    toast.classList.remove(
                        "show"
                    );

                },
                2600
            );

    }


    /* =====================================================
       NAV ACTIVE STATE
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const navLinks =
        document.querySelectorAll(
            ".main-nav a"
        );


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        )
                            return;


                        navLinks.forEach(
                            link => {

                                link.classList.remove(
                                    "active"
                                );


                                if (
                                    link.getAttribute(
                                        "href"
                                    ) ===
                                    `#${entry.target.id}`
                                ) {

                                    link.classList.add(
                                        "active"
                                    );

                                }

                            }
                        );

                    }
                );

            },
            {
                threshold: .35
            }
        );


    sections.forEach(
        section =>
            observer.observe(
                section
            )
    );


    /* =====================================================
       INITIAL ROUTE
    ===================================================== */

    setTimeout(
        calculateRoute,
        500
    );

});