chrome.storage.local.get(null, (results) => {
    let tableBody = document.querySelector("#detailsTable tbody");
    for (let site in results) {
        if (site === 'isTrackingPaused') continue;
        let row = tableBody.insertRow();
        let siteCell = row.insertCell(0);
        let linkCountCell = row.insertCell(1);
        
        siteCell.textContent = site;
        linkCountCell.textContent = results[site].length;
    }
});
