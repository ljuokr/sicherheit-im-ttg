// Zweite Suchrunde: Struktur erkunden (nur lesen)
const L = require(process.env.ST_LIB);
(async () => {
  const { page, errors, close } = await L.open({});
  const r = await page.evaluate(() => {
    const out = {};
    out.tabs = [...document.querySelectorAll('[role=tab]')].map(t => t.id + '=' + t.textContent.trim() + '>' + t.getAttribute('aria-controls'));
    out.verfahrenKinder = [...document.querySelectorAll('#verfahren > .text > *')].map(x => x.tagName + '#' + x.id + '.' + x.className).slice(0, 40);
    out.themenOrt = [...new Set([...document.querySelectorAll('section.thema')].map(t => t.closest('.panel').id))];
    out.anzThemen = document.querySelectorAll('section.thema').length;
    out.finder = document.querySelector('#finder') && document.querySelector('#finder').outerHTML.slice(0, 600);
    out.selects = document.querySelectorAll('#finder select').length;
    out.summaries = document.querySelectorAll('summary').length;
    out.panels = [...document.querySelectorAll('.panel')].map(p => p.id);
    out.nichtGesucht = [...document.querySelectorAll('.panel')].map(p => p.id).filter(id => !['grundlage','matrix','fachraum','unterricht','kantone','recht','quellen'].includes(id));
    return out;
  });
  console.log(JSON.stringify(r, null, 1));
  console.log('Fehler', errors);
  await close();
})();
