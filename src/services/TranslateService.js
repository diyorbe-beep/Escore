class TranslateService {
  static async translateToUzbek(text) {
    try {
      const response = await fetch('https://libretranslate.de/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: text,
          source: 'auto',
          target: 'uz',
          format: 'text'
        })
      });
      const data = await response.json();
      return data.translatedText || text;
    } catch (e) {
      console.error('Tarjima xatosi:', e);
      return text;
    }
  }
}

export default TranslateService; 