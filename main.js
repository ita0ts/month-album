function navigateToPage2() {
    const lastFmUser = document.getElementById("lastfmuser").value;
    const selectedYear = document.getElementById("yearSelect").value;

    localStorage.setItem("lastFmUser", lastFmUser);
    localStorage.setItem("year", selectedYear);

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




document.addEventListener("DOMContentLoaded", function () {

    const progressBar = document.getElementById("progressBar");
    const progressText = document.getElementById("progressText");
    const Timeout = localStorage.getItem("Timeout");


    while (Timeout) {
        try {
            window.location.href = '/download.html';
            Timeout === true
        } catch (error) {
            console.error("Erro capturado:", error.message);
        }
    }


    function updateProgressBar() {
        const progressPercentage = localStorage.getItem("progressPercentage");


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
