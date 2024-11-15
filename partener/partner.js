document.addEventListener("DOMContentLoaded", function() {
    function fetchTranslations(lang) {
        fetch(`http://127.0.0.1:8000/partner/${lang}`)
            .then(response => response.json())
            .then(data => {
                const translations = data.partner_translation;
                applyTranslations(translations);
                
                localStorage.setItem('selectedLanguage', lang);
            })
            .catch(error => console.error('Error fetching translations:', error));
    }

    function applyTranslations(translations) {
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[key]) {
                element.textContent = translations[key];
            }
        });
    }

    const languageSelector = document.querySelector('#language-selector'); 

    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    if (languageSelector) {
        languageSelector.value = savedLanguage; 
   
        fetchTranslations(savedLanguage);
        
        languageSelector.addEventListener('change', function() {
            const selectedLanguage = this.value;
            fetchTranslations(selectedLanguage);
        });
    }

    fetchTranslations(savedLanguage);
});
