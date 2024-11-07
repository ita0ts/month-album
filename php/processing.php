<?php

    // Recebe os dados enviados pelo formulário
    $lastFmUser = $_POST['lastFmUser'] ?? 'Usuário não informado';
    $selectedYear = $_POST['selectedYear'] ?? 'Ano não informado';

    // Exibe as informações ou faça o que for necessário com os dados
    echo "<h1>Dados Recebidos</h1>";
    echo "<h1 id='lastfmuser'>" . htmlspecialchars($lastFmUser) . "</h1>" ;
    echo "<br>";
    echo "<h1 id='yearSelect'>" . htmlspecialchars($selectedYear) . "</h1>" ;

?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Top Albums 2024</title>
    <link rel="stylesheet" href="../style.css">
</head>

<body>

    <div id="content">
        <div class="grid-container">
            <!-- Month boxes -->
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

    <script src="../library/html2canvas.min.js"></script>
    <script src="../library/jquery-3.7.1.min.js"></script>
    <script src="../js/app.js"></script>
</body>

</html>