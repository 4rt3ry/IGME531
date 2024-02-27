const download = (e) => {
    if (confirm("Dost thou want to download?")) {
        const data = new Blob([e.target.outerHTML], {'type': 'image/svg+xml'});
        const link = document.createElement("a");
        link.href = URL.createObjectURL(data);
        link.download = "download.svg";
        link.click();

        URL.revokeObjectURL(link.href);
    }
    
}

document.querySelectorAll("svg").forEach(elm => elm.addEventListener("click", download))