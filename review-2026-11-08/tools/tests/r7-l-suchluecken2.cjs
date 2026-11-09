// Runde 7: Stichproben für Texte, die die Suche nicht erreicht
const L = require(process.env.ST_LIB);
const W = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const { page, close } = await L.open({ width: 1280 });
  for (const w of ['Totenkopf', 'Javelwasser', 'Nasszone', 'Aufsicht heisst', 'Kindergarten bis 2. Klasse', 'So sieht das im Unterricht aus', 'Mehr Selbstständigkeit', 'STOP-Prinzip', 'Gefahrenkategorien', 'Raumaufteilung', 'Abfalltrennung']) {
    await page.fill('#f-q', w); await W(450);
    const r = await page.evaluate(w => {
      const vorkommen = [...document.querySelectorAll('.panel')].filter(p => p.textContent.toLowerCase().includes(w.toLowerCase())).map(p => p.id);
      return { status: document.getElementById('erg-status').textContent, kopf: [...document.querySelectorAll('#erg-inhalt h3')].map(h => h.textContent).slice(0, 4), vorkommen };
    }, w);
    console.log(w, JSON.stringify(r));
  }
  await close();
})();
