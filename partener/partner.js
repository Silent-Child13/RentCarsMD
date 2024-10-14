document.addEventListener("DOMContentLoaded", function() {
    // Function to fetch translations based on the selected language
    function fetchTranslations(lang) {
        fetch(`http://127.0.0.1:8000/partner/${lang}`)
            .then(response => response.json())
            .then(data => {
                const translations = data.partner_translation;
                applyTranslations(translations);
                
                // Store the selected language in local storage
                localStorage.setItem('selectedLanguage', lang);
            })
            .catch(error => console.error('Error fetching translations:', error));
    }

    // Function to apply translations to elements
    function applyTranslations(translations) {
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[key]) {
                element.textContent = translations[key];
            }
        });
    }

    const languageSelector = document.querySelector('#language-selector'); // Adjust selector as needed

    // Retrieve the saved language from local storage or set to default
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    if (languageSelector) {
        languageSelector.value = savedLanguage; // Set the selector to the saved value
        // Fetch translations for the saved language
        fetchTranslations(savedLanguage);
        
        // Add event listener to handle language change
        languageSelector.addEventListener('change', function() {
            const selectedLanguage = this.value;
            fetchTranslations(selectedLanguage);
        });
    }

    // Fetch translations for the default or saved language on page load
    fetchTranslations(savedLanguage);
});
