document.addEventListener("DOMContentLoaded", function() {
    function fetchTranslations(lang) {
        fetch(`http://127.0.0.1:8000/about-us/${lang}`)
            .then(response => response.json())
            .then(data => {
                // Adjust this to match the actual property in the API response
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
        languageSelector.addEventListener('change', function() {
            const selectedLanguage = this.value;
            fetchTranslations(selectedLanguage);
        });
    } else {
        console.warn('Language selector not found');
    }
  
    const defaultLanguage = 'en'; // Set the default language if needed
    fetchTranslations(defaultLanguage);
  });
  