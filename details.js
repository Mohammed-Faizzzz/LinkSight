chrome.storage.local.get(null, (results) => {
    let table = document.createElement('table');
    
    // Headers
    let thead = table.createTHead();
    let headers = ['Visited Sites', 'Hyperlinks', 'Occurrences'];
    let headerRow = thead.insertRow();
    for (let header of headers) {
        let th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    }

    // Data Rows
    // Data Rows
    let displayedSites = new Set();
    for (let site in results) {
        let linksForSite = results[site];
        for (let link of linksForSite) {
            if (displayedSites.has(site)) {
                continue;
            }
            let row = table.insertRow();

            let siteCell = row.insertCell();
            if (!displayedSites.has(site)) {
                let aSite = document.createElement('a');
                aSite.href = "https://" + site;
                aSite.textContent = site;
                aSite.target = "_blank";
                siteCell.appendChild(aSite);
                displayedSites.add(site);
            }

            let linkCell = row.insertCell();
            let aLink = document.createElement('a');
            aLink.href = link.url;
            aLink.textContent = link.url;
            aLink.target = "_blank";
            linkCell.appendChild(aLink);

            let countCell = row.insertCell();
            countCell.textContent = link.count;
        }
    }

    // Append table to the container
    document.getElementById('tableContainer').appendChild(table);
});

