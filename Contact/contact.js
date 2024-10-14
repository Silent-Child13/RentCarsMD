document.addEventListener("DOMContentLoaded", function() {
    function fetchTranslations(lang) {
        fetch(`http://127.0.0.1:8000/contact/${lang}`)
            .then(response => response.json())
            .then(data => {
                const translations = data.contact_translations;
                applyTranslations(translations);
            })
            .catch(error => console.error('Error fetching translations:', error));
    }

    function applyTranslations(translations) {
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations && translations[key]) {
                // Handle text content for elements like <p>, <span>, and <a>
                if (element.tagName === 'SPAN' || element.tagName === 'P' || element.tagName === 'A') {
                    element.textContent = translations[key];
                }
                // Handle placeholders for input and textarea elements
                else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.setAttribute('placeholder', translations[key]);
                }
            }
        });
    }

    const languageSelector = document.querySelector('#language-selector'); // Adjust selector as needed

    // Retrieve the saved language from local storage or set to default
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    if (languageSelector) {
        languageSelector.value = savedLanguage; // Set the selector to the saved value
        fetchTranslations(savedLanguage); // Fetch translations for the saved language on page load

        languageSelector.addEventListener('change', function() {
            const selectedLanguage = this.value;
            // Store the selected language in local storage
            localStorage.setItem('selectedLanguage', selectedLanguage);
            fetchTranslations(selectedLanguage);
        });
    } else {
        console.warn('Language selector not found');
    }

    // Fetch translations for the default language on initial load
    fetchTranslations(savedLanguage);
});
