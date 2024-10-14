document.addEventListener("DOMContentLoaded", function() {

    // Fetch translations based on language
    function fetchTranslations(lang) {
        fetch(`http://127.0.0.1:8000/terms/${lang}`)
            .then(response => response.json())
            .then(data => {
                const translations = data.terms_translations; // Assuming the data structure directly contains translations
                applyTranslations(translations);
            })
            .catch(error => console.error('Error fetching translations:', error));
    }
  
    // Apply translations to elements with data-key attribute
    function applyTranslations(translations) {
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations && translations[key]) {
                element.textContent = translations[key];
            }
        });
    }
  
    const languageSelector = document.querySelector('#language-selector'); // Adjust selector as needed
  
    // Get the selected language from localStorage or default to 'en'
    const storedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    
    // Set the language selector value to the stored language
    if (languageSelector) {
        languageSelector.value = storedLanguage;
    }
  
    // Fetch translations using the stored language or default language on page load
    fetchTranslations(storedLanguage);
  
    if (languageSelector) {
        languageSelector.addEventListener('change', function() {
            const selectedLanguage = this.value;
  
            // Save the selected language to localStorage
            localStorage.setItem('selectedLanguage', selectedLanguage);
  
            // Fetch new translations based on the selected language
            fetchTranslations(selectedLanguage);
        });
    } else {
        console.warn('Language selector not found');
    }
  });
  