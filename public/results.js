// Load and display results
document.addEventListener('DOMContentLoaded', () => {
    const resultsData = sessionStorage.getItem('searchResults');
    
    if (!resultsData) {
        showError('No search results found. Please search again.');
        return;
    }
    
    try {
        const data = JSON.parse(resultsData);
        displayResults(data);
    } catch (error) {
        showError('Error loading results. Please try again.');
    }
});

function displayResults(data) {
    const loadingState = document.getElementById('loadingState');
    const resultsContent = document.getElementById('resultsContent');
    const personName = document.getElementById('personName');
    const summary = document.getElementById('summary');
    const timestamp = document.getElementById('timestamp');
    
    // Hide loading, show results
    loadingState.classList.add('hidden');
    resultsContent.classList.remove('hidden');
    
    // Populate data
    personName.textContent = data.name;
    summary.textContent = data.summary;
    
    // Format timestamp
    const date = new Date(data.timestamp);
    timestamp.textContent = date.toLocaleString();
}

function showError(message) {
    const loadingState = document.getElementById('loadingState');
    const errorState = document.getElementById('errorState');
    const errorText = document.getElementById('errorText');
    
    loadingState.classList.add('hidden');
    errorState.classList.remove('hidden');
    errorText.textContent = message;
}
