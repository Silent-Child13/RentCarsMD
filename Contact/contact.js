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
