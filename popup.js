// Fetch the data from chrome.storage.local
chrome.storage.local.get(null, (results) => {
    let siteCount = Object.keys(results).length; // Number of unique sites visited
    let linkCount = 0;

    for (let site in results) {
        linkCount += results[site].length; // Sum of all hyperlinks across sites
    }

    document.getElementById('siteCount').textContent = siteCount;
    document.getElementById('linkCount').textContent = linkCount;
});

document.getElementById('detailsBtn').addEventListener('click', () => {
    // Open a new tab to display details
    chrome.tabs.create({ url: 'details.html' });
});

