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