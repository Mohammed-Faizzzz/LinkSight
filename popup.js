// Fetch the data
document.getElementById('detailsBtn').addEventListener('click', () => {
    // Open a new tab to display details
    chrome.tabs.create({ url: 'details.html' });
});
