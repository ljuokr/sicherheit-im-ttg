// A4-Blatt als PDF und PNG ausgeben, prüfen ob es auf eine Seite passt
const pw = require('playwright'), path = require('path');
(async () => {
  const b = await pw.chromium.launch({ channel: 'chrome', headless: true });
  const p = await b.newPage({ viewport: { width: 794, height: 1123 } });
  const f = path.join(__dirname, 'sicherheit-ttg-a4.html');
  await p.goto('file://' + f); await p.waitForTimeout(500);
  await p.emulateMedia({ media: 'print' });
  const m = await p.evaluate(() => { const el = document.querySelector('.blatt'); return { h: el.scrollHeight, ch: el.clientHeight, ueber: [...el.children].map(c => c.getBoundingClientRect().bottom | 0) }; });
  console.log(JSON.stringify(m));
  await p.pdf({ path: path.join(__dirname, 'sicherheit-ttg-a4.pdf'), format: 'A4', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  await p.screenshot({ path: path.join(__dirname, 'vorschau.png'), fullPage: true });
  await b.close();
})();
