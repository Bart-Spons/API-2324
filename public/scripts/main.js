/* eslint-disable no-undef */

const letters = document.querySelectorAll('#boxWrapper div');

if (letters.length) {
    const tl = gsap.timeline()
    tl.fromTo(letters, {
        // opacity: 0,
        scale: 0,
        rotation: -180,
        delay: 0.3,
        duration: 0.5,
    }, {
        scale: 0.8,
        stagger: 0.2,
        rotation: 0
    })
    tl.to(letters, {
        opacity: 1,
        duration: 0.5,
        // delay: 1
    })
}

window.onload = function () {
    function updateBatteryStatus(battery) {
        document.querySelector('#level').textContent = battery.level * 100 + '%';
        document.querySelector('#charging').textContent = battery.charging ? '🔋 charging' : '🪫 not charging';

        if (battery.charging) {
            document.getElementById('chargingOn').style.display = 'block';
            document.getElementById('chargingOff').style.display = 'none';
        } else {
            document.getElementById('chargingOn').style.display = 'none';
            document.getElementById('chargingOff').style.display = 'block';
        }
    }

    navigator.getBattery().then(function (battery) {
        // Update the battery status initially when the promise resolves ...
        updateBatteryStatus(battery);

        // .. and for any subsequent updates.
        battery.onchargingchange = function () {
            updateBatteryStatus(battery);
        };

        battery.onlevelchange = function () {
            updateBatteryStatus(battery);
        };
    });

    // if battery is charging id="chargingOn" on display block and id="chargingOff" on diplay none
    // if battery is not charging id="chargingOn" on display none and id="chargingOff" on diplay block
    // function updateBatteryStatus(battery) {

    // }
};

window.addEventListener(
    "scroll",
    () => {
        document.body.style.setProperty(
            "--scroll",
            window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
        );
    },
    false
);

// document.querySelectorAll('.movie').forEach((div) => {
//     const randomRotation = Math.random() * 10 - 5; // Random rotation between -5deg and +5deg
//     div.style.transform = `rotate(${randomRotation}deg)`;
// });

document.querySelectorAll('.movie').forEach((div) => {
    const randomRotation = Math.random() * 10 - 5; // Random rotation between -5deg and +5deg
    div.style.transition = 'transform 0.3s ease';

    // Apply initial random rotation
    div.style.transform = `rotate(${randomRotation}deg)`;

    // On hover, straighten the movie element
    div.addEventListener('mouseover', () => {
        div.style.transform = 'rotate(0deg)';
    });

    // On mouseout, return to the random rotation
    div.addEventListener('mouseout', () => {
        div.style.transform = `rotate(${randomRotation}deg)`;
    });
});

const movies = document.querySelectorAll('.movie');

if (movies.length) {
    const tl = gsap.timeline({
        defaults: { duration: 0.5, ease: "power1.inOut" } // Ensures smooth transitions
    });

    movies.forEach((movie, index) => {
        // Calculate a random rotation for each movie between -5 and +5 degrees
        const randomRotation = Math.random() * 10 - 5;

        // Animate each movie from scale 0 and rotation to visible and rotated randomly
        tl.fromTo(movie, {
            scale: 0,
            rotation: -180,
            opacity: 0
        }, {
            scale: 0.8,
            rotation: randomRotation,
            opacity: 1
        }, index * 0.2); // Stagger start for each movie

        // Add a delay before starting the pin animation
        tl.to(movie, {
            '--pin-opacity': 1, // Assuming you have a CSS variable controlling the pin's opacity
            duration: 0.25
        }, "+=0.1"); // Delay relative to the last animation
    });
}
