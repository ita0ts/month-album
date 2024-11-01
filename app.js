function saveAsImage() {
    const element = document.getElementById('content');
    html2canvas(element).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'pagina_capturada.png';
        link.click();
    });
}
