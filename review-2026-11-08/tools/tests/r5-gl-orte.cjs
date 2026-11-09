// R5 Glossar: heikle Orte ansehen (Plakatkopf «Zyklus», Grafik Recht «Schulträger»), Verfahrens-Einleitungen, Popup beim Scrollen im Fenster
const L = require(process.env.ST_LIB);
(async () => {
  let o = await L.open({ hash: 'plakat' });
  const p = await o.page.evaluate(() => { const a = document.querySelector('#plakat a.b-wort'); const zk = a.closest('.p-zk'); a.scrollIntoView({ block: 'center' });
    return { html: zk.outerHTML.slice(0, 300), stil: getComputedStyle(zk).cssText ? '' : getComputedStyle(a.parentElement).fontWeight + ' ' + getComputedStyle(a.parentElement).fontSize, geschw: [...zk.parentElement.children].map(c => c.className + ':' + c.textContent.trim().slice(0, 20)).slice(0, 6) }; });
  console.log('PLAKAT', JSON.stringify(p)); await o.page.waitForTimeout(200); await L.shot(o.page, 'r5-gl-plakat-zyklus');
  await o.close();
  o = await L.open({ hash: 'recht' });
  const r = await o.page.evaluate(() => { const a = [...document.querySelectorAll('#recht a.b-wort')].find(x => x.closest('figure')); const f = a.closest('figure'); f.scrollIntoView({ block: 'start' });
    return { fig: f.outerHTML.replace(/\s+/g, ' ').slice(0, 700), obhut: (() => { const b = [...document.querySelectorAll('#recht a.b-wort[data-b=b-obhut]')][0]; return b.parentElement.outerHTML.slice(0, 400); })() }; });
  console.log('RECHT', JSON.stringify(r)); await o.page.waitForTimeout(200); await L.shot(o.page, 'r5-gl-recht-figur');
  await o.close();
  // Verfahrens-Einleitungen: Glossarwörter ausserhalb der Themen, mit/ohne Link
  o = await L.open({});
  const v = await o.page.evaluate(() => {
    const woerter = []; document.querySelectorAll('section.begriff[data-wort]').forEach(b => b.dataset.wort.split('|').forEach(w => woerter.push(w)));
    const re = new RegExp('(^|[^\\wäöüÄÖÜß-])(' + woerter.sort((a, b) => b.length - a.length).map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')(?![\\wäöüÄÖÜß-])');
    return [...document.querySelectorAll('#verfahren section.verfahren')].map(s => {
      const aussen = [...s.children].filter(c => !c.matches('h2,section.thema'));
      const t = aussen.map(c => c.textContent).join(' '); const m = t.match(re);
      return s.id + ': links=' + aussen.reduce((n, c) => n + c.querySelectorAll('a.b-wort').length, 0) + (m ? ' treffer «' + m[2] + '»' : '') + ' bloecke=' + (s.matches('#register .sub') ? 'sub' : 'kein');
    }).filter(x => /treffer/.test(x));
  });
  console.log('VERFAHREN-EINLEITUNG', v.length ? v.join('\n') : 'keine Treffer');
  await o.close();
  // Popup im Themenfenster, dann Fenster scrollen
  o = await L.open({ hash: 'holzstaub' }); await o.page.waitForTimeout(300);
  const fw = o.page.locator('#fenster a.b-wort').first(); await fw.click();
  const vor = await o.page.evaluate(() => { const a = document.querySelector('#fenster a.b-wort[aria-expanded=true]'), p = document.getElementById('b-pop'); return [Math.round(a.getBoundingClientRect().bottom), Math.round(p.getBoundingClientRect().top)]; });
  await o.page.evaluate(() => { document.getElementById('fenster').scrollTop += 250; }); await o.page.waitForTimeout(200);
  const nach = await o.page.evaluate(() => { const a = document.querySelector('#fenster a.b-wort[aria-expanded=true]'), p = document.getElementById('b-pop'); return [Math.round(a.getBoundingClientRect().bottom), Math.round(p.getBoundingClientRect().top), !p.hidden]; });
  console.log('FENSTER-SCROLL wort.bottom/pop.top vorher', vor, 'nachher', nach);
  await L.shot(o.page, 'r5-gl-fenster-scroll');
  await o.close();
})();
