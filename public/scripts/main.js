$(document).ready(function () {
    $("#boxWrapper").css({ visibility: "visible" });
    var tl = gsap.timeline(),
        letters = $("#boxWrapper div");

    // Initial animation
    tl.staggerFrom(letters, 0.5, { opacity: 0, scale: 0, rotation: -180 }, 0.3)
        .staggerTo(letters, 0.3, { scale: 0.8 }, 0.3, 0.7)
        // Ensure the transition to full opacity happens smoothly with GSAP
        .to(letters, { opacity: 1, duration: 0.5, delay: 1 });
});
