document.addEventListener("DOMContentLoaded", async function () {
    // Verifica se o localStorage contém a flag de recarregamento
    if (localStorage.getItem("reloadPage") === "true") {
        localStorage.removeItem("reloadPage"); // Remove a flag para evitar recarregamento infinito
        window.location.reload(); // Recarrega a página
    }

    // Remove conteúdo da div, se houver
    localStorage.removeItem('conteudoDiv');

    const h1Element = document.getElementById('myTopAlbums');
    const selectedYear = localStorage.getItem("selectedYear");
    h1Element.textContent = `My Top Albums ${selectedYear}`;

    const key = 'e97ca135be347c4a86d57a2fe313f59e';
    const lastFmUser = localStorage.getItem("lastFmUser");
    const progressBar = document.getElementById("progressBar");
    const progressText = document.getElementById("progressText");
    let topAlbumsByMonth = [];

    if (lastFmUser != null) {

        // Função para buscar imagem do álbum
        async function fetchAlbumImage(artist, album) {
            const apiUrl = `https://ws.audioscrobbler.com/2.0/?method=album.getInfo&api_key=${key}&artist=${encodeURIComponent(artist)}&album=${encodeURIComponent(album)}&format=json`;
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error('Erro ao acessar a API de álbum: ' + response.status);
                const data = await response.json();
                return data.album.image[3]?.['#text'] || 'URL_DA_IMAGEM_PADRÃO';
            } catch (error) {
                console.error('Erro ao buscar imagem do álbum:', error);
                return 'URL_DA_IMAGEM_PADRÃO';
            }
        }

        // Função para buscar o álbum top do mês
        async function fetchMonthlyTopAlbum(year, month) {
            const from = new Date(year, month - 1, 1).getTime() / 1000;
            const to = new Date(year, month, 0).getTime() / 1000;
            const apiUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getweeklyalbumchart&user=${lastFmUser}&api_key=${key}&from=${from}&to=${to}&format=json`;

            try {
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error('Erro ao acessar a API de chart: ' + response.status);
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

        // Função para buscar os álbuns do ano inteiro
        async function getTopAlbumsOfYear(year) {
            const totalMonths = 12;
            progressBar.style.display = "block";

            const monthPromises = [];
            for (let month = 1; month <= totalMonths; month++) {
                monthPromises.push(fetchMonthlyTopAlbum(year, month));
            }

            await Promise.all(monthPromises);

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

            progressBar.style.display = "none";
            progressText.textContent = "Carregamento concluído!";

            saveAsImage();
        }

        // Função para salvar a div como imagem
        function saveAsImage() {
            const content = document.getElementById('content');
            html2canvas(content, { allowTaint: true, useCORS: true }).then(canvas => {
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.download = 'top_albums_2024.png';
                document.body.appendChild(link);
                localStorage.setItem('conteudoDiv', link);
            }).catch(error => {
                console.error('Error capturing image:', error);
            });
        }

        // Marcar recarregamento da página e iniciar o processo de obtenção dos álbuns
        localStorage.setItem("reloadPage", "true");
        await getTopAlbumsOfYear(selectedYear);
    }
});
