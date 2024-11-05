document.addEventListener("DOMContentLoaded", function () {


    function removeAll() {
        seeTopAlbums = false;
        localStorage.removeItem("progressPercentage");
        localStorage.removeItem("lastFmUser");
        localStorage.removeItem("selectedYear");
        localStorage.removeItem("seeTopAlbums");
    }

    removeAll();

    const progressBar = document.getElementById("progressBar");
    const progressText = document.getElementById("progressText");
    function updateProgressBar() {
        const progressPercentage = localStorage.getItem("progressPercentage");
        if (progressText.textContent === "Carregando: 100.00%") {

            window.location.href = '/download.html';
            removeAll();
        }
        if (progressPercentage) {
            progressBar.style.display = "block";
            progressBar.value = progressPercentage;
            progressText.textContent = `Carregando: ${progressPercentage}%`;
        } else {
            progressBar.style.display = "none";
            progressText.textContent = "";
        }
    }

    const progressInterval = setInterval(() => {
        updateProgressBar();
    }, 500);

    setTimeout(() => {
        clearInterval(progressInterval);
    }, 60000);

});

function navigateToPage2() {
    const lastFmUser = document.getElementById("lastfmuser").value;
    const selectedYear = document.getElementById("yearSelect").value;

    const seeTopAlbums = true;


    localStorage.setItem("lastFmUser", lastFmUser);
    localStorage.setItem("selectedYear", selectedYear);
    localStorage.setItem("seeTopAlbums", seeTopAlbums);

}
document.addEventListener("DOMContentLoaded", function () {
    const h1Element = document.getElementById('myTopAlbums');
    const yearSelect = document.getElementById("yearSelect");

    yearSelect.addEventListener('change', function () {
        h1Element.textContent = 'My Top Albums ' + (yearSelect.value);
        // resetDisplayTopAlbums();
    });
    h1Element.textContent = 'My Top Albums ' + (yearSelect.value);

});