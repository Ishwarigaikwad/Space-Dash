// Name Title header
const fetchName = () => {
    let userName = (JSON.parse(localStorage.getItem('name')));
    if (userName === "" || userName === null) {
        $('.userName').text('friend');
    } else {
        $('.userName').text(JSON.parse(localStorage.getItem('name')));
    }
};
fetchName();
// Moon Data API
const queryURL = "https://api.farmsense.net/v1/moonphases/?d=1350526582";

// AJAX Call for moon images for phases
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (moonData) {
    let moonPhase = moonData[0].Phase
    let moonName = moonData[0].Moon[0]

    $('#moonPhase').text("Phase: " + moonPhase)
    $('#moonName').text("Name: " + moonName)

    // URL links to moon .png files
    if (moonPhase === "New Moon") {
        $('#todaysMoon').attr("src", "Assets/images/moon-phases/NewMoon.png")
    }
    if (moonPhase === "Waxing Crescent") {
        $('#todaysMoon').attr("src", "Assets/images/moon-phases/WaxingCrescent.png")
    }
    if (moonPhase === "First Quarter") {
        $('#todaysMoon').attr("src", "Assets/images/moon-phases/FirstQuarter.png")
    }
    if (moonPhase === "Waxing Gibbous") {
        $('#todaysMoon').attr("src", "Assets/images/moon-phases/WaxingGibbous.png")
    }
    if (moonPhase === "Full Moon") {
        $('#todaysMoon').attr("src", "Assets/images/moon-phases/FullMoon.png")
    }
    if (moonPhase === "Waning Gibbous") {
        $('#todaysMoon').attr("src", "Assets/images/moon-phases/WaningGibbous.png")
    }
    if (moonPhase === "Third Quarter") {
        $('#todaysMoon').attr("src", "Assets/images/moon-phases/ThirdQuarter.png")
    }
    if (moonPhase === "Waning Crescent") {
        $('#todaysMoon').attr("src", "Assets/images/moon-phases/WaningCrescent.png")
    }

});
