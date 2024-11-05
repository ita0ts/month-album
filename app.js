document.addEventListener("DOMContentLoaded", function () {

    const h1Element = document.getElementById('myTopAlbums');
    const selectedYear = localStorage.getItem("selectedYear");





    h1Element.textContent = 'My Top Albums ' + selectedYear;

    async function tentarAteFuncionar() {
    const seeTopAlbums = localStorage.getItem('seeTopAlbums');

        console.log(seeTopAlbums);
        while (seeTopAlbums) {
            try {
                submitToImage();
                seeTopAlbums = true;
            } catch (error) {
                console.error("porra", error.message);
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    }
    console.log(seeTopAlbums);
    
    tentarAteFuncionar();
    
    async function submitToImage() {
        const key = 'e97ca135be347c4a86d57a2fe313f59e';
        const lastFmUser = localStorage.getItem("lastFmUser");
        const user = lastFmUser;
     


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
            const totalMonths = 12;
            const progressBar = document.getElementById("progressBar");
            const progressText = document.getElementById("progressText");

            progressBar.style.display = "block";

            for (let month = 1; month <= totalMonths; month++) {
                await fetchMonthlyTopAlbum(year, month);

                const progressPercentage = ((month / totalMonths) * 100).toFixed(2);
                progressBar.value = progressPercentage;
                progressText.textContent = `Carregando: ${progressPercentage}%`;
                localStorage.setItem("progressPercentage", progressPercentage);
            }
            displayTopAlbums();

            progressBar.style.display = "none";
            progressText.textContent = "Carregamento concluído!";

            saveAsImage();

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

        const content = document.getElementById('content');
        html2canvas(content, {
            allowTaint: true,
            useCORS: true

        }).then(function (canvas) {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'top_albums_2024.png';
            document.body.appendChild(link);
            const conteudo = document.querySelector('a[download="top_albums_2024.png"]');
            localStorage.setItem('conteudoDiv', conteudo);

        }).catch(error => {
            console.error('Error capturing image:', error);
        });
    }

});