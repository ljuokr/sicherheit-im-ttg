import re, sys, subprocess
from html.parser import HTMLParser
import os, tempfile
HIER = os.path.dirname(os.path.abspath(__file__)) + '/'
SRC = HIER + '../inhalt.html'
NEU = sys.argv[1] if len(sys.argv) > 1 else HIER + '../sicherheit-im-ttg.html'
JS = os.path.join(tempfile.gettempdir(), 'sig-pruefe.js')
src = open(SRC, encoding='utf-8').read(); neu = open(NEU, encoding='utf-8').read()

class P(HTMLParser):
    VOID = {'meta','link','img','br','input','hr','source','wbr'}
    def __init__(s):
        super().__init__(); s.ids = []; s.stack = []; s.errs = []; s.text = []; s.skip = 0; s.imgs = 0; s.tags = {}
    def handle_starttag(s, t, a):
        d = dict(a)
        if 'id' in d: s.ids.append(d['id'])
        if t == 'img': s.imgs += 1
        if t in ('script', 'style'): s.skip += 1
        s.tags.setdefault(t, 0); s.tags[t] += 1
        if t not in s.VOID: s.stack.append(t)
    def handle_endtag(s, t):
        if t in ('script', 'style'): s.skip -= 1
        if t in s.VOID: return
        if s.stack and s.stack[-1] == t: s.stack.pop()
        else: s.errs.append((t, s.getpos(), s.stack[-3:]))
    def handle_data(s, d):
        if not s.skip: s.text.append(d)
p = P(); p.feed(neu)
print('Parserfehler:', p.errs[:5], 'offen:', p.stack)
dups = sorted({i for i in p.ids if p.ids.count(i) > 1}); print('doppelte ids:', dups)
print('img:', p.imgs)

def items(html, pat):
    return re.findall(pat, html, re.S)
def norm(x): return re.sub(r'\s+', ' ', x).strip()
neu_li = [norm(re.sub(r'<img class="vb-z"[^>]*> ', '', x)) for x in items(neu, r"<li(?:\s[^>]*)?>(.*?)</li>")]
src_li = [norm(x) for x in items(src, r'<li>(.*?)</li>')]
fehlt = [x for x in src_li if x not in neu_li]
print('Original-li:', len(src_li), 'fehlend:', len(fehlt), fehlt[:3])
q_src = [norm(x) for x in items(src, r'<p class="quelle">(.*?)</p>')]
q_neu = [norm(x) for x in items(neu, r'<p class="quelle">(.*?)</p>')]
print('quelle:', len(q_src), 'fehlend:', [x for x in q_src if x not in q_neu], 'im neuen:', len(q_neu))
rows = re.findall(r'<tr><td>[^<]+</td><td class="k [ABC] z1">', neu); print('Maschinenzeilen statisch:', len(rows))
src_rows = re.findall(r'<tr><td>.*?</tr>', src); neu_rows = re.findall(r'<tr><td>.*?</tr>', neu)
print('Tabellenzeilen identisch:', all(r in neu_rows for r in src_rows), len(src_rows))
print('Themen:', len(re.findall(r'<section class="thema"', neu)))
# alle Absätze und Überschriften des Originals
ps = [norm(x) for x in items(src, r'<(?:p|h3|h4|div class="hinweis")[^>]*>(.*?)</(?:p|h3|h4|div)>')]
print('fehlende p/h3/h4:', [x[:60] for x in ps if x not in norm(neu)])
txt = ''.join(p.text)
print('Gedankenstriche/ß im Text:', [c for c in '—–ß' if c in txt], 'in UI-JS:', [c for c in '—–ß' if c in neu.split('<script>')[-1]])
print('Ausrufezeichen im Text:', txt.count('!'))
print('[hidden]-Regel:', '[hidden]{display:none!important}' in neu)
vb = re.findall(r'<li class="verbot"[^>]*><img class="vb-z"[^>]*> (.*?)</li>', neu)
print('Verbote markiert:', len(vb))
print('data-instr:', len(re.findall(r'data-instr=', neu)))
js = neu.split('<script>')[-1].split('</script>')[0]
open(JS, 'w').write(js)
print('node --check:', subprocess.run(['node', '--check', JS], capture_output=True, text=True).returncode)
print('href-Ziele fehlend:', sorted({h for h in re.findall(r'href="#([^"]+)"', neu) if h not in p.ids}))
print('Groesse KB:', len(neu.encode()) // 1024)
