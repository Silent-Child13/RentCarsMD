document.addEventListener("DOMContentLoaded", function() {
    const currentLang = localStorage.getItem('selectedLanguage') || 'en'; 
    
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

    const languageSelector = document.querySelector('#language-selector'); 
    if (languageSelector) {
        languageSelector.value = currentLang;

        languageSelector.addEventListener('change', function() {
            const selectedLanguage = this.value;
            localStorage.setItem('selectedLanguage', selectedLanguage);
            fetchTranslations(selectedLanguage);
        });
    } else {
        console.warn('Language selector not found');
    }
});
