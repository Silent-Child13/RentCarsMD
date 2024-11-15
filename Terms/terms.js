document.addEventListener("DOMContentLoaded", function() {

   
    function fetchTranslations(lang) {
        fetch(`http://127.0.0.1:8000/terms/${lang}`)
            .then(response => response.json())
            .then(data => {
                const translations = data.terms_translations; 
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
  
   
    const storedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    
   
    if (languageSelector) {
        languageSelector.value = storedLanguage;
    }
  
 
    fetchTranslations(storedLanguage);
  
    if (languageSelector) {
        languageSelector.addEventListener('change', function() {
            const selectedLanguage = this.value;
  
           
            localStorage.setItem('selectedLanguage', selectedLanguage);
  
        
            fetchTranslations(selectedLanguage);
        });
    } else {
        console.warn('Language selector not found');
    }
  });
  