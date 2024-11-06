<?php
// Verifica se os dados foram enviados via POST
if (isset($_POST['lastfmuser']) && isset($_POST['year'])) {
    $lastFmUser = $_POST['lastfmuser'];
    $selectedYear = $_POST['year'];

    // Processa os dados (Aqui você pode fazer algo com os dados, como consultar um banco ou API)
    echo "Usuário LastFM: " . $lastFmUser . "<br>";
    echo "Ano Selecionado: " . $selectedYear . "<br>";
    echo "Dados recebidos e processados com sucesso!";
} else {
    echo "Erro: Dados não recebidos.";
}


?>

<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página 2</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js"></script>
    <link rel="stylesheet" href="style.css">

</head>

<body>
    <h1 id="myTopAlbums"></h1>

    <div>
        <progress id="progressBar" value="0" max="100" style="width: 100%; display: none;"></progress>
        <span id="progressText"></span>
    </div>
    <div id="content">
        <div class="grid-container">
            <div class="month-box" data-month="1"><span>January</span></div>
            <div class="month-box" data-month="2"><span>February</span></div>
            <div class="month-box" data-month="3"><span>March</span></div>
            <div class="month-box" data-month="4"><span>April</span></div>
            <div class="month-box" data-month="5"><span>May</span></div>
            <div class="month-box" data-month="6"><span>June</span></div>
            <div class="month-box" data-month="7"><span>July</span></div>
            <div class="month-box" data-month="8"><span>August</span></div>
            <div class="month-box" data-month="9"><span>September</span></div>
            <div class="month-box" data-month="10"><span>October</span></div>
            <div class="month-box" data-month="11"><span>November</span></div>
            <div class="month-box" data-month="12"><span>December</span></div>
        </div>
    </div>
    <script src="https://html2canvas.hertzen.com/dist/html2canvas.js"></script>
    <script src="back.js"></script>
</body>
</html>