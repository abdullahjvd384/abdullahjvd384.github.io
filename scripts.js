document.getElementById('downloadBtn').addEventListener('click', function() {
    const text = document.getElementById('editor').innerText;
    const blob = new Blob([text], { type: 'text/plain' });
    const anchor = document.createElement('a');
    anchor.download = 'textfile.txt';
    anchor.href = window.URL.createObjectURL(blob);
    anchor.target = '_blank';
    anchor.style.display = 'none'; // make sure it is not displayed
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
});
