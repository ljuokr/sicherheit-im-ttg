'use strict';
/* Testgerüst Prüfrunde 4, Sicherheit im TTG (2026-11-08)
   Aufruf immer mit: source /Users/lukasjordi/Switchdirve/KI/sicherheit-im-gestalten/review-2026-11-08/tools/env.sh && node <skript.cjs>
   - Öffnet die gebaute Seite als file://, kein Server, kein Browser-Pane, externe Netzanfragen blockiert
   - const L = require(process.env.ST_LIB);
     const { page, close, errors } = await L.open({ width, height, mobile, dark, hash });
     await L.shot(page, 'name');   // Screenshot nach runs/
     await close();                // errors = Konsolen- und Seitenfehler */
const path = require('path');
const pw = require('playwright');
async function open(opt = {}) {
  const b = await pw.chromium.launch({ channel: 'chrome', headless: true });
  const ctx = await b.newContext({
    viewport: { width: opt.width || (opt.mobile ? 375 : 1280), height: opt.height || (opt.mobile ? 812 : 900) },
    locale: 'de-CH', isMobile: !!opt.mobile, hasTouch: !!opt.mobile, colorScheme: opt.dark ? 'dark' : 'light',
  });
  await ctx.route(u => !u.protocol.startsWith('file') && !u.protocol.startsWith('data') && !u.protocol.startsWith('blob'), r => r.abort());
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push('pageerror: ' + (e.stack || e.message).slice(0, 400)));
  page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text().slice(0, 300)); });
  await page.goto('file://' + process.env.ST_SEITE + (opt.hash ? '#' + opt.hash : ''));
  await page.waitForTimeout(400);
  return { page, errors, close: () => b.close() };
}
async function shot(page, name) {
  const f = path.join(process.env.ST_ROOT, 'runs', name + '.png');
  await page.screenshot({ path: f }); return f;
}
module.exports = { open, shot };
