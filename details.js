chrome.storage.local.get(['visited', 'hyperlinks'], (data) => {
    let visited = data.visited || {};
    let hyperlinks = data.hyperlinks || {};

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

    // Data Rows for Visited Sites
    for (let site in visited) {
        let row = table.insertRow();

        let siteCell = row.insertCell();
        let aSite = document.createElement('a');
        aSite.href = site;
        aSite.textContent = site;
        aSite.target = "_blank";
        siteCell.appendChild(aSite);

        let linkCell = row.insertCell();
        linkCell.textContent = ''; // No hyperlink for visited sites

        let countCell = row.insertCell();
        countCell.textContent = ''; // No hyperlink count for visited sites
    }

    // Data Rows for Hyperlinks
    for (let site in hyperlinks) {
        for (let link of hyperlinks[site]) {
            let row = table.insertRow();

            let siteCell = row.insertCell();
            siteCell.textContent = ''; // No site URL for hyperlinks

            let linkCell = row.insertCell();
            let aLink = document.createElement('a');
            aLink.href = link;
            aLink.textContent = link;
            aLink.target = "_blank";
            linkCell.appendChild(aLink);

            let countCell = row.insertCell();
            countCell.textContent = ''; // No hyperlink count for hyperlinks
        }
    }

    // Append table to the container
    document.getElementById('tableContainer').appendChild(table);
});
