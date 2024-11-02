document.addEventListener("DOMContentLoaded", function () {
  const h1Element = document.getElementById('myTopAlbums');
  const yearSelect = document.getElementById("yearSelect");

  yearSelect.addEventListener('change', function () {
    h1Element.textContent = 'My Top Albums ' + (yearSelect.value);
  });
  h1Element.textContent = 'My Top Albums ' + (yearSelect.value);
});

function submitToImage() {
  const key = 'e97ca135be347c4a86d57a2fe313f59e';
  const user = document.getElementById("lastfmuser").value;
  const selectedYear = document.getElementById("yearSelect").value;

  if (!user) {
    alert("Por favor, insira um usuário Last.fm.");
    return;
  }

  let topAlbumsByMonth = [];

  async function fetchAlbumImage(artist, album) {
    const apiUrl = `https://ws.audioscrobbler.com/2.0/?method=album.getInfo&api_key=${key}&artist=${encodeURIComponent(artist)}&album=${encodeURIComponent(album)}&format=json`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Erro ao acessar a API de álbum: ' + response.status);
      }

      const data = await response.json();
      return data.album.image[3]?.['#text'] || 'URL_DA_IMAGEM_PADRÃO';
    } catch (error) {
      console.error('Erro ao buscar imagem do álbum:', error);
      return 'URL_DA_IMAGEM_PADRÃO'; 
    }
  }

  async function fetchMonthlyTopAlbum(year, month) {
    const from = new Date(year, month - 1, 1).getTime() / 1000;
    const to = new Date(year, month, 0).getTime() / 1000;

    const apiUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getweeklyalbumchart&user=${user}&api_key=${key}&from=${from}&to=${to}&format=json`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Erro ao acessar a API de chart: ' + response.status);
      }

      const data = await response.json();
      const topAlbum = data.weeklyalbumchart.album[0];
      if (topAlbum) {
        const albumImage = await fetchAlbumImage(topAlbum.artist['#text'], topAlbum.name);
        topAlbumsByMonth.push({
          month: month,
          album: topAlbum.name,
          artist: topAlbum.artist['#text'],
          image: albumImage
        });
      }
    } catch (error) {
      console.error('Erro ao acessar a API:', error);
    }
  }

  async function getTopAlbumsOfYear(year) {
    for (let month = 1; month <= 12; month++) {
      await fetchMonthlyTopAlbum(year, month);
    }
    displayTopAlbums();
  }

  function displayTopAlbums() {
    topAlbumsByMonth.forEach(({ month, album, artist, image }) => {
      const monthBox = document.querySelector(`.month-box[data-month="${month}"]`);
      if (monthBox) {
        monthBox.innerHTML = `
          <img src="${image}" alt="${album}">
          <div class="album-info">
            <strong>${album}</strong><br>
            <em>${artist}</em>
          </div>
        `;
      }
    });
  }

  getTopAlbumsOfYear(selectedYear);
}

function saveAsImage() {
  const content = document.getElementById('content'); // Get the element to capture
  html2canvas(content, {
    allowTaint: true,
    useCORS: true

  }).then(function (canvas) {
    const link = document.createElement('a'); // Create a link element
    link.href = canvas.toDataURL('image/png'); // Convert canvas to data URL
    link.download = 'top_albums_2024.png'; // Specify the filename for download
    document.body.appendChild(link);
    // link.click(); // Trigger the download
    const conteudo = document.querySelector('a[download="top_albums_2024.png"]');

    localStorage.setItem('conteudoDiv', conteudo);
    window.location.href = 'download.html';

  }).catch(error => {
    console.error('Error capturing image:', error);
  });
}