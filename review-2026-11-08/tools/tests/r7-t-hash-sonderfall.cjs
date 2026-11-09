// Runde 7: Laden mit unbekanntem oder fehlerhaft kodiertem Anker
const L = require(process.env.ST_LIB);
const W = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  for (const h of ['gibtsnicht', '50%', 'b-pop', 'fenster', 'karte-3', 'h-H301', 'erg-inhalt', 'f-q', 'leiste', 'treppe-t']) {
    const { page, errors, close } = await L.open({ width: 1280, hash: h });
    await W(500);
    const r = await page.evaluate(() => ({ hash: location.hash, sichtbarePanels: [...document.querySelectorAll('.panel')].filter(p => !p.hidden).map(p => p.id), reg: (document.querySelector('#tl-haupt [aria-selected=true]') || {}).id, fenster: document.getElementById('fenster') ? !document.getElementById('fenster').hidden : 'fehlt', register: !document.getElementById('register').hidden, popup: !!document.querySelector('.b-pop:not([hidden])'), y: Math.round(scrollY) }));
    console.log('#' + h, JSON.stringify(r), errors.length ? errors.join(' / ').slice(0, 300) : '');
    // Danach normal weiterklicken?
    if (h === '50%') { await page.click('#t-recht').catch(e => console.log('Klick fehlgeschlagen', e.message.slice(0, 80))); await W(300); console.log('  nach Klick Recht', await page.evaluate(() => ({ hash: location.hash, sichtbar: [...document.querySelectorAll('.panel')].filter(p => !p.hidden).map(p => p.id), len: history.length }))); }
    await close();
  }
})();
