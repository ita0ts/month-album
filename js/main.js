document.addEventListener("DOMContentLoaded", function () {
    const h1Element = document.getElementById('myTopAlbums');
    const yearSelect = document.getElementById("yearSelect");
  
    yearSelect.addEventListener('change', function () {
        h1Element.textContent = 'My Top Albums ' + (yearSelect.value);
        // resetDisplayTopAlbums();
    });
    h1Element.textContent = 'My Top Albums ' + (yearSelect.value);
    
  });

  function sendData() {

    const user = document.getElementById("lastfmuser").textContent;
    const selectedYear = document.getElementById("yearSelect").textContent;

  // Prepara os dados para enviar
  const data = {
    user, selectedYear
  };

  // Envia os dados para o Domínio 2 usando fetch (AJAX)
  fetch('php/processing.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(data) // Converte os dados para o formato adequado
  })
  .then(response => response.text()) // Processa a resposta do Domínio B
  .then(result => {
      // Aqui você pode fazer algo com a resposta, por exemplo:
      alert('Resultado do Domínio B: ' + result);
  })
  .catch(error => {
      console.error('Erro ao enviar os dados:', error);
  });

}

