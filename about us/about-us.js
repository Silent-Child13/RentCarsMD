document.addEventListener("DOMContentLoaded", function() {
    // Retrieve the current language from local storage or set to default
    const currentLang = localStorage.getItem('selectedLanguage') || 'en'; // Default to 'en'
    
    // Fetch translations for the current language
    fetchTranslations(currentLang);

    function fetchTranslations(lang) {
        fetch(`http://127.0.0.1:8000/about-us/${lang}`)
            .then(response => response.json())
            .then(data => {
                const translations = data.about_us_translation; 
                applyTranslations(translations);
            })
            .catch(error => console.error('Error fetching translations:', error));
    }

    function applyTranslations(translations) {
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations && translations[key]) {
                element.textContent = translations[key];
            }
        });
    }

    const languageSelector = document.querySelector('#language-selector'); // Adjust selector as needed
    if (languageSelector) {
        // Set the initial value of the selector to the current language
        languageSelector.value = currentLang;

        languageSelector.addEventListener('change', function() {
            const selectedLanguage = this.value;
            // Store the selected language in local storage
            localStorage.setItem('selectedLanguage', selectedLanguage);
            fetchTranslations(selectedLanguage);
        });
    } else {
        console.warn('Language selector not found');
    }
});
