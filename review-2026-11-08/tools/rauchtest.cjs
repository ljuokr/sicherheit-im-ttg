// Rauchtest: Seite lädt, Register vorhanden, keine Fehler
const L = require(process.env.ST_LIB);
(async () => {
  const { page, errors, close } = await L.open({ hash: 'matrix' });
  const r = await page.evaluate(() => ({ tabs: [...document.querySelectorAll('#tl-haupt [role=tab]')].map(t => t.textContent.trim()), chips: document.querySelectorAll('#matrix .mchip').length }));
  console.log(JSON.stringify(r), 'Fehler:', errors.length);
  await close();
})();
