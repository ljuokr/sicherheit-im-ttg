# Seitentext je Register als Markdown, inklusive Themen (Fenster) und Materialfenster. Aufruf: python3 seitentext.py <seite.html> <ziel.md>
import sys
from bs4 import BeautifulSoup
s = BeautifulSoup(open(sys.argv[1], encoding='utf-8').read(), 'html.parser')
for t in s(['script', 'style', 'svg']): t.decompose()
out = []
tabs = {b['aria-controls']: b.get_text(strip=True) for b in s.select('#tl-haupt [role=tab]')}
def text(el):
    for x in el.find_all(['h1','h2','h3','h4','summary','p','li','tr','figcaption','dt','dd']):
        if x.find_parent(['li','p','tr']) and x.name in ('li','p'): continue
        if x.name != 'summary' and x.find_parent('summary'): continue
        t = ' '.join(x.get_text(' ', strip=True).split())
        if t: out.append({'h1':'# ','h2':'### ','h3':'#### ','h4':'##### ','summary':'> Zeile: ','li':'- ','tr':'| '}.get(x.name,'') + t)
for pid, name in tabs.items():
    out.append('\n\n## REGISTER «%s» (id %s)\n' % (name, pid)); text(s.find(id=pid))
for tp in s.select('template[id^="eigen-"]'):
    out.append('\n\n## MATERIALFENSTER %s\n' % tp['id']); text(BeautifulSoup(tp.decode_contents(), 'html.parser'))
open(sys.argv[2], 'w', encoding='utf-8').write('\n'.join(out)); print(len(out), 'Zeilen')
