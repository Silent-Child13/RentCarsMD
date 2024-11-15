document.addEventListener('DOMContentLoaded', () => {
  const currentLang = localStorage.getItem('selectedLanguage') || getCurrentLanguage();
  
  loadTranslations(currentLang);
  
  document.getElementById('language-selector').addEventListener('change', (event) => {
      const selectedLang = event.target.value;

      localStorage.setItem('selectedLanguage', selectedLang);
      loadTranslations(selectedLang);
  });
});

async function loadTranslations(lang) {
  try {
      const url = `http://127.0.0.1:8000/translate/${lang}`;
      console.log('Fetching translations from:', url);
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`Error fetching translations: ${response.statusText}`);
      }

      const translations = await response.json();
      console.log('Translations received:', translations);

      document.getElementById('airport-info').innerHTML = translations.airport_info || '';

  } catch (error) {
      console.error('Error loading translations:', error);
  }
}

function getCurrentLanguage() {
  return localStorage.getItem('selectedLanguage') || document.documentElement.lang || 'en'; 
}
