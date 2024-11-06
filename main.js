document.addEventListener("DOMContentLoaded", function () {
    // Função que limpa os dados do localStorage
    function removeAll() {
        localStorage.removeItem("progressPercentage");
        localStorage.removeItem("lastFmUser");
        localStorage.removeItem("selectedYear");
        localStorage.removeItem("seeTopAlbums");
        
    }

    // Função de atualização da barra de progresso
    function updateProgressBar() {
        const progressPercentage = localStorage.getItem("progressPercentage");
        if (progressPercentage) {
            progressBar.style.display = "block";
            progressBar.value = progressPercentage;
            progressText.textContent = `Carregando: ${progressPercentage}%`;

            if (progressPercentage === "100.00") {
                window.location.href = '/download.html';
                removeAll();
            }
        } else {
            progressBar.style.display = "none";
            progressText.textContent = "";
        }
    }

    // Inicializa as variáveis do DOM
    const progressBar = document.getElementById("progressBar");
    const progressText = document.getElementById("progressText");

    // Atualiza o progresso a cada 500ms
    const progressInterval = setInterval(updateProgressBar, 500);

    // Limita a execução do intervalo a 1 minuto
    setTimeout(() => clearInterval(progressInterval), 60000);

    // Atualiza o título da página quando o ano é alterado
    const h1Element = document.getElementById('myTopAlbums');
    const yearSelect = document.getElementById("yearSelect");
    yearSelect.addEventListener('change', function () {
        h1Element.textContent = `My Top Albums ${yearSelect.value}`;
    });

    // Inicializa o título ao carregar a página
    h1Element.textContent = `My Top Albums ${yearSelect.value}`;

    // Remove os dados iniciais
    removeAll();
});

// Função para navegar para a próxima página
function navigateToPage2() {
    const lastFmUser = document.getElementById("lastfmuser").value;
    const selectedYear = document.getElementById("yearSelect").value;
    localStorage.setItem("reloadPage", "true");

    // Definir valores no localStorage
    localStorage.setItem("lastFmUser", lastFmUser);
    localStorage.setItem("selectedYear", selectedYear);
    localStorage.setItem("seeTopAlbums", true);
}