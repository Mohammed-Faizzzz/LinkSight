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
    // Data Rows for Visited Sites and Hyperlinks
for (let site in visited) {
    let row = table.insertRow();

    let siteCell = row.insertCell();
    let aSite = document.createElement('a');
    aSite.href = site;
    aSite.textContent = site;
    aSite.target = "_blank";
    siteCell.appendChild(aSite);

    let linkCell = row.insertCell();
    let firstHyperlink = hyperlinks[site] ? hyperlinks[site][0] : '';
    if (firstHyperlink) {
        let aLink = document.createElement('a');
        aLink.href = firstHyperlink;
        aLink.textContent = firstHyperlink;
        aLink.target = "_blank";
        linkCell.appendChild(aLink);
    }

    let countCell = row.insertCell();
    countCell.textContent = hyperlinks[site] ? hyperlinks[site].length : 0;

    // Data Rows for Hyperlinks from the same site
    for (let i = 1; i < hyperlinks[site].length; i++) {
        let link = hyperlinks[site][i];
        let hyperlinkRow = table.insertRow();

        let emptySiteCell = hyperlinkRow.insertCell();
        emptySiteCell.textContent = ''; // No site URL for hyperlinks

        let hyperlinkCell = hyperlinkRow.insertCell();
        let aLink = document.createElement('a');
        aLink.href = link;
        aLink.textContent = link;
        aLink.target = "_blank";
        hyperlinkCell.appendChild(aLink);

        let emptyCountCell = hyperlinkRow.insertCell();
        emptyCountCell.textContent = ''; // No hyperlink count for hyperlinks
    }
}

    // Append table to the container
    document.getElementById('tableContainer').appendChild(table);
});
