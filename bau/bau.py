import re, sys
import os
HIER = os.path.dirname(os.path.abspath(__file__)) + '/'
PROJ = os.path.dirname(HIER.rstrip('/')) + '/'
SRC = PROJ + 'inhalt.html'
OUT = sys.argv[1] if len(sys.argv) > 1 else PROJ + 'sicherheit-im-gestalten.html'
S = open(SRC, encoding='utf-8').read()
# Abschnitte über Textmarken statt Zeilennummern, damit Änderungen an der Quelle nichts verschieben
def zw(a, b, mit_a=True):
    i = S.index(a); j = S.index(b, i + len(a))
    return (S[i:j] if mit_a else S[i + len(a):j]).strip('\n')
css = open(HIER+'stil.css', encoding='utf-8').read()
js = open(HIER+'app.js', encoding='utf-8').read()

VERBOTE = ["Kein Essen und Trinken","Gegenstände aus dem Unterricht dürfen keine","Keine bleihaltige Emaille","Kein imprägniertes",
"Nie mit Pressluft abblasen","Schleifpapier nicht ausklopfen","Handschuhverbot","Keine mechanische Bearbeitung","Acrylglas: Kanten nicht",
"In der Umgebung keine brennbaren","Nicht lasern","Verwendung und Bearbeitung asbesthaltiger","Blei und Bleilegierungen","Kein Woodsches Metall",
"Auf Polyurethan-Montageschaum","Bleihaltige Weichlote","Cadmiumhaltige Hartlote","Flussmittel als verwendungsfertige Paste","Keine Schweissarbeiten",
"Verzichten auf","Getränkte Lappen und Papiere nie","Auf Produkte mit gesundheitsgefährdenden","Nicht verwenden: Pigmente","Keine isocyanathaltigen",
"Leinölhaltige Lacke nie","Wenn möglich lösungsmittelfreie Alternativen","Verboten sind Beizmittel","Glasätzen braucht","Originalgebinde verwenden",
"Konzentrierte oxidierende Säuren","Keine Gasflaschen","Gefährliche Chemikalien dürfen nie","Alte Restbestände nicht mischen",
"Lehrpersonen dürfen nach eigenem Ermessen keine","Improvisierte Anschlüsse","Schutzeinrichtungen an Maschinen dürfen nicht"]
INSTR = [("Welche Schutzausrüstung ein Stoff verlangt","instruktion"),("bfu 2.524 führt den Lasercutter","aufsicht"),
("Auf Polyurethan-Montageschaum","instruktion"),("* Inbetriebnahme, Ausserbetriebsetzung","selbst"),

("Epoxy-, Polyurethan- und Sekundenkleber verwenden","instruktion"),("Produkte mit Gefahrenhinweis kennzeichnen","instruktion"),
("Brennofen in einem gut durchlüfteten Raum","selbst"),("Betrieb nur unter Aufsicht einer Lehrperson","aufsicht"),
("Die Schule stellt die Behälter","selbst"),("Lehrpersonen dürfen nach eigenem Ermessen","selbst"),("Teilen sich mehrere Lehrpersonen","selbst"),
("Eine Fachraumordnung mit Bekleidungs","instruktion"),("Bei Mehrfachnutzung empfiehlt die bfu ein Zutrittsmanagement","instruktion"),
("Lehrpersonen haben während der Unterrichtszeit","selbst"),("Werkzeuge, Geräte und Maschinen wählen und einführen dürfen nur","selbst"),("Gasanlagen für Hartlöten und Schweissen nehmen nur geschulte","selbst")]
treffer = {v: 0 for v in VERBOTE}; itreffer = {i[0]: 0 for i in INSTR}

def slug(t):
    t = t.lower()
    for a, b in (('ä','ae'),('ö','oe'),('ü','ue'),('é','e')): t = t.replace(a, b)
    return re.sub(r'[^a-z0-9]+', '-', t).strip('-')

def lists(html):
    def ul(m):
        inner = m.group(1)
        items = re.findall(r'<li>(.*?)</li>', inner, re.S)
        vb, rest = [], []
        for it in items:
            txt = re.sub(r'<[^>]+>', '', it)
            attrs = ''
            isv = False
            for v in VERBOTE:
                if txt.startswith(v): treffer[v] += 1; isv = True
            for p, g in INSTR:
                if txt.startswith(p): itreffer[p] += 1; attrs += ' data-instr="%s"' % g
            if isv: vb.append('<li class="verbot"%s><span class="vb">Verbot</span> %s</li>' % (attrs, it))
            else: rest.append('<li%s>%s</li>' % (attrs, it))
        sep = '\n' if '\n' in inner else ''
        return '<ul>' + sep + sep.join(vb + rest) + sep + '</ul>'
    return re.sub(r'<ul>(.*?)</ul>', ul, html, flags=re.S)

def themen(html):
    def f(m):
        mat, tid, h3 = m.group(1), m.group(2), m.group(3)
        return '<section class="thema" data-mat="%s" id="%s">\n<h3>%s</h3>' % (mat, tid or slug(h3), h3)
    return re.sub(r'<section class="thema" data-mat="([^"]+)"(?: id="([^"]+)")?>\n<h3>(.*?)</h3>', f, html)

VERF = [('trennen','Trennen'),('umformen','Umformen'),('verbinden','Verbinden'),
        ('oberflaeche','Oberfläche verändern'),('flaechen','Flächen bilden'),('lehrpersonen','Nur Lehrpersonen')]
MATS = [('holz','Holz','holz'),('metall','Metall','metall'),('kunststoff','Kunststoff','kunststoff'),
        ('keramik','Keramik, Glas, Stein','keramik'),('textil','Textil','textil'),('alle-materialien','Alle Materialien','alle')]
# Fachraum nach Aufgabe: Notfall für alle, Betreiben und warten, Planen und einrichten, Zuständigkeiten
FACH = [('notfall','Notfall',[('<h2 id="notfall">','<h2 id="fachraum">')]),
        ('betreiben','Betreiben und warten',[('<h2 id="fachraum">','<h2 id="planen">'),('<h2 id="lagerung">','<h2 id="entsorgung">'),('<h2 id="entsorgung">','<h2 id="notfall">'),('<h2 id="zustaendig">','<h2 id="begriffe">')]),
        ('planen','Planen und einrichten',[('<h2 id="planen">','<h2 id="zustaendig">')])]
HAUPT = [('grundlage','Grundlage'),('unterricht','Unterricht'),('verfahren','Maschinen und Verfahren'),
         ('material','Material'),('fachraum','Fachraum'),('hintergrund','Hintergrund')]

# Eigene Zuordnung: welche Themen, Videos und Checklisten zu einer Maschine des Plakats passen
TUD = 'https://www.tud.ch/lernvideos/verfahren/#'
TUDH = 'https://www.tud.ch/lernvideos/hilfsger%C3%A4te/#'
SUVA = 'https://www.suva.ch/de-ch/download/checklisten/tisch--und-staenderbohrmaschinen/tisch--und-staenderbohrmaschinen--67036.D'
HOLZ_KST = ['holzstaub', 'kunststoff-saegen-bohren-schleifen']
ZUORDNUNG = {
 'Heissleimpistole': {'themen': ['kleben']},
 'Nähmaschine': {'themen': ['naehen'], 'video': [('Nähen mit der Nähmaschine', TUD+'naehenmitdernaehmaschine')]},
 'Weichlötvorrichtung': {'themen': ['weichloeten'], 'video': [('Weichlöten mit dem Lötkolben', TUD+'weichloeten')]},
 'Hartlötanlage (Propan-/Butan-Sauerstoff)*': {'themen': ['hartloeten', 'gasflaschen'], 'video': [('Hartlöten', TUD+'hartloeten')]},
 'Autogenschweissanlage (Acetylen-Sauerstoff)*': {'themen': ['schweissen', 'gasflaschen']},
 'Schutzgasschweissanlage (MIG/MAG)*': {'themen': ['schweissen', 'gasflaschen'], 'video': [('Schutzgasschweissen', TUD+'schutzgasschweissen')]},
 'Dekupiersäge': {'themen': HOLZ_KST, 'video': [('Sägen mit der Dekupiersäge', TUD+'dekupiersaege')]},
 'Thermoschneider': {'themen': ['kunststoff-saegen-bohren-schleifen'], 'video': [('Styroporschneider', TUDH+'styroporschneider')]},
 'Stichsäge': {'themen': HOLZ_KST, 'video': [('Sägen mit der Stichsäge', TUD+'stichsaege')]},
 'Handbohrmaschine': {'themen': HOLZ_KST},
 'Ständerbohrmaschine': {'themen': ['psa'] + HOLZ_KST, 'video': [('Bohren mit der Tischbohrmaschine', TUD+'tischbohrmaschine')], 'suva': True},
 'Bandsäge': {'themen': HOLZ_KST, 'video': [('Bandsäge', TUD+'bandsaege')]},
 'Gehrungskappsäge': {'themen': ['holzstaub']},
 'Lamellen-Dübelfräse': {'themen': ['holzstaub'], 'video': [('Runddübeln und Flachdübeln', TUD+'duebeln')]},
 'Holzdrechselbank': {'themen': ['holzstaub']},
 'Dreieckschleifer': {'themen': HOLZ_KST},
 'Schwingschleifer': {'themen': HOLZ_KST},
 'Exzenterschleifer': {'themen': HOLZ_KST},
 'Tellerschleifmaschine': {'themen': HOLZ_KST, 'video': [('Schleifen an der Tellerschleifmaschine', TUD+'tellerschleifmaschine')]},
 'Bandschleifmaschine': {'themen': HOLZ_KST},
 'Stickcomputer': {'themen': ['naehen']},
 'Overlockmaschine': {'themen': ['naehen'], 'video': [('Nähen mit der Overlockmaschine', TUD+'naehenmitderoverlockmaschine')]},
 'Linearbiegegerät': {'video': [('Linearbiegegerät', TUDH+'linearbiegegeraet')]},
 'Tiefziehgerät': {'themen': ['tiefziehen']},
 'Tischkreissäge': {'themen': ['holzstaub']},
 'Handkreissäge': {'themen': ['holzstaub']},
 'Elektrohandhobel': {'themen': ['holzstaub']},
 'Abricht- und Dickenhobelmaschine': {'themen': ['holzstaub']},
 'Handoberfräse': {'themen': ['holzstaub']},
 'Kehlmaschine': {'themen': ['holzstaub']},
 'Keramikbrennofen': {'themen': ['glasieren-und-brennen']},
}
for z in ZUORDNUNG.values():
    if z.get('suva'): z['suva'] = SUVA
import json
ZUORDNUNG_JSON = json.dumps(ZUORDNUNG, ensure_ascii=False)

def tabs(items, label, lid, haupt=None, zahl=False):
    out = ['<div class="tabs" role="tablist" aria-label="%s" id="%s"%s>' % (label, lid, ' data-haupt="%s"' % haupt if haupt else '')]
    for i, (pid, name) in enumerate(items):
        out.append('<button type="button" role="tab" id="t-%s" aria-controls="%s" aria-selected="%s" tabindex="%d">%s%s</button>'
                   % (pid, pid, 'true' if i == 0 else 'false', 0 if i == 0 else -1, name, '<span class="n" hidden></span>' if zahl else ''))
    out.append('</div>')
    return '\n'.join(out)

# Inhalte
grund = zw('<h2 id="grundsatz">', '<h3>Was hergestellt wird</h3>').replace('<h3>Schutzausrüstung</h3>', '<h3 id="schutzausruestung">Schutzausrüstung</h3>')
aufsicht_txt = zw('<h2 id="maschinen">Maschinen nach Zyklus</h2>', '<p>Die folgenden Abschnitte', mit_a=False)
m_gelt = re.search(r'<div class="hinweis" id="geltung">.*?</div>\n', grund, re.S)
geltung = m_gelt.group(0) if m_gelt else ''
grund_ohne = grund.replace(geltung, '') if geltung else grund
hergestellt = zw('<h3>Was hergestellt wird</h3>', '<h2 id="maschinen">', mit_a=False)
einleitung_verf = re.search(r'<p>Die folgenden Abschnitte.*?</p>', S).group(0)
leer = re.search(r'<p id="leer" hidden>.*?</p>', S).group(0)
lehrplan = zw('<h2 id="lehrplan">', '<h2 id="quellen">')
kantone = zw('<h2 id="kantone">', '<h2 id="erschliessen">')
didaktik = zw('<h2 id="erschliessen">', '<h2 id="sicher-unterrichten">')
sicher = zw('<h2 id="sicher-unterrichten">', '<h2 id="lehrplan">')
begriffe = zw('<h2 id="begriffe">', '<h2 id="recht">')
recht = zw('<h2 id="recht">', '<h2 id="kantone">')
BILDER = HIER + 'bilder/'
import os, base64
try: NACHWEIS = json.load(open(BILDER + 'nachweis.json', encoding='utf-8'))
except Exception: NACHWEIS = {}
def bild(m):
    name = m.group(1); pfad = BILDER + name
    if not os.path.exists(pfad): return ''
    typ = 'image/svg+xml' if name.endswith('.svg') else 'image/jpeg'
    daten = base64.b64encode(open(pfad, 'rb').read()).decode()
    alt = '' if name.startswith('ghs') else NACHWEIS.get(name, {}).get('alt', '')
    out = '<div class="b-bild"><img src="data:%s;base64,%s" alt="%s" loading="lazy">' % (typ, daten, alt)
    nw = NACHWEIS.get(name, {}).get('credit')
    if nw: out += '<p class="b-credit">%s</p>' % nw
    return out + '</div>'
quellen = zw('<h2 id="quellen">', '</main>')
kopf = re.search(r'<h1>.*?</h1>\n<p class="lead">.*?</p>', S, re.S).group(0)
starts = [S.index('<section class="verfahren" id="%s">' % v[0]) for v in VERF] + [S.index('<h2 id="lagerung">')]
verf_html = []
for k, (vid, name) in enumerate(VERF):
    s = S[starts[k]:starts[k + 1]].strip('\n').replace('<section class="verfahren" id="%s">' % vid,
                          '<section class="verfahren sub" id="%s" data-titel="%s">' % (vid, name), 1)
    assert 'data-titel' in s
    verf_html.append(s)
fach_html = []
for fid, name, teile in FACH:
    if len(teile) == 1:
        s = re.sub(r'^<h2 id="[^"]+">', '<h2>', zw(*teile[0]), count=1)
    else:
        stuecke = [zw(a, b).replace('<h2 id="fachraum">', '<h2 id="fachraum-betreiben">', 1) for a, b in teile]
        sprung = '<ul class="sprung" aria-label="In diesem Abschnitt">\n' + '\n'.join(
            '<li><a href="#%s">%s</a></li>' % (re.search(r'<h2 id="([^"]+)">(.*?)</h2>', x).groups()) for x in stuecke) + '\n</ul>'
        s = sprung + '\n' + '\n'.join(stuecke)
    fach_html.append('<section class="sub" id="%s">\n%s\n</section>' % (fid, s))
mat_html = []
for mid, name, key in MATS:
    hint = '' if key == 'alle' else '\n<p class="einleitung">Themen aus allen Verfahren, die %s betreffen. Für jedes Material gelten zusätzlich die Themen unter <a href="#alle-materialien">«Alle Materialien»</a>.</p>' % ('«%s»' % name)
    if key == 'alle': hint = '\n<p class="einleitung">Themen, die für alle Materialien gelten.</p>'
    mat_html.append('<section class="sub" id="%s" data-key="%s">\n<h2>%s</h2>%s\n<div class="slot"></div>\n</section>' % (mid, key, name, hint))

body = f'''<header class="kopf"><div class="in">
{kopf}
</div></header>

<div class="leiste" id="leiste">
<div class="finder"><div class="in">
<form id="finder" role="search" aria-label="Finden">
<span class="titel" aria-hidden="true">Finden</span>
<button type="button" class="knopf finden" id="finden" aria-expanded="false" aria-controls="felder">Finden</button>
<span class="kurz" id="f-kurz">Verfahren, Material, Zyklus oder Suche</span>
<div class="felder" id="felder">
<label class="sr" for="f-v">Verfahren</label>
<select id="f-v" name="v">
<option value="">Alle Verfahren</option>
{chr(10).join('<option value="%s">%s</option>' % (v[0], v[1]) for v in VERF)}
</select>
<label class="sr" for="f-m">Material</label>
<select id="f-m" name="m">
<option value="">Alle Materialien</option>
{chr(10).join('<option value="%s">%s</option>' % (m[0], m[1]) for m in MATS if m[2] != 'alle')}
</select>
<label class="sr" for="f-z">Zyklus</label>
<select id="f-z" name="z">
<option value="">Alle Zyklen</option>
<option value="1">Zyklus 1</option>
<option value="2">Zyklus 2</option>
<option value="3">Zyklus 3</option>
</select>
<label class="sr" for="f-q">Suchen in Maschinen und Themen</label>
<input type="search" id="f-q" name="q" placeholder="Suchen, z. B. Stichsäge, Leinöl" autocomplete="off">
<button type="reset" class="knopf">Zurücksetzen</button>
</div>
</form>
</div></div>
<nav class="reg" id="reg" aria-label="Register">
<div class="in">
{tabs(HAUPT, 'Hauptbereiche', 'tl-haupt')}
</div>
<div class="reg2" id="reg2" hidden><div class="in">
{tabs([('plakat', 'Übersicht')] + [(v[0], v[1]) for v in VERF], 'Verfahren', 'tl-verfahren', 'verfahren')}
{tabs([(m[0], m[1]) for m in MATS], 'Material', 'tl-material', 'material', zahl=True)}
{tabs([(f[0], f[1]) for f in FACH], 'Fachraum', 'tl-fachraum', 'fachraum')}
</div></div>
</nav>
</div>

<main id="inhalt"><div class="in">

<section class="ergebnis" id="ergebnis" aria-labelledby="erg-titel" hidden>
<div class="erg-kopf">
<div>
<h2 id="erg-titel">Ergebnis</h2>
<p id="erg-status" role="status" aria-live="polite" aria-atomic="true"></p>
</div>
<button type="button" class="knopf" id="zurueck">Zurück zu den Registern</button>
</div>
<div class="text breit" id="erg-inhalt"></div>
</section>

<div id="register">

<section class="panel" id="grundlage"><div class="text mit-rand">
<aside class="rand" aria-label="Was diese Seite ist und was nicht">
{geltung}
</aside>
<div class="haupt">
{grund_ohne}
</div>
</div></section>

<section class="panel" id="unterricht"><div class="text">
<ul class="sprung" aria-label="In diesem Register">
<li><a href="#aufsicht">Aufsicht nach A, B, C</a></li>
<li><a href="#sicher-unterrichten">Sicher unterrichten</a></li>
<li><a href="#erschliessen">Produktions- und Erschliessungshandeln</a></li>
<li class="nurjs"><a href="#instruktion">Instruktion und Aufsicht</a></li>
<li><a href="#hergestellt">Was hergestellt wird</a></li>
<li><a href="#lehrplan">Lehrplan 21</a></li>
</ul>
<section id="aufsicht">
<h2>Aufsicht nach A, B, C</h2>
{aufsicht_txt}
</section>
{sicher}
{didaktik}
<section id="instruktion" class="nurjs">
<h2>Instruktion und Aufsicht im Unterricht</h2>
<p class="einleitung">Alle Stellen dieser Seite, an denen die Quellen Instruktion, Aufsicht oder Handeln der Lehrperson verlangen, im Wortlaut. Der Link führt zum Thema.</p>
<div id="instr-liste"></div>
</section>
<section id="hergestellt">
<h2>Was hergestellt wird</h2>
{hergestellt}
</section>
{lehrplan}
</div></section>

<section class="panel" id="verfahren"><div class="text">
<section class="sub" id="plakat" data-titel="Übersicht">
<h2 id="maschinen">Maschinen und Anlagen nach Zyklus</h2>
<p class="einleitung">Aufgebaut wie das bfu-Plakat «Umgang mit Maschinen und Anlagen». Eine Maschine antippen zeigt die Einteilung und die Regeln dazu. Ein Gruppentitel führt zum Verfahren.</p>
<noscript><p>Die Maschinentabellen stehen bei den einzelnen Verfahren.</p></noscript>
<div class="z-hl nurjs" role="group" aria-label="Zyklus hervorheben">
<span class="z-hl-l">Zyklus hervorheben</span>
<button type="button" data-z="" aria-pressed="true">Alle</button>
<button type="button" data-z="1" aria-pressed="false">1</button>
<button type="button" data-z="2" aria-pressed="false">2</button>
<button type="button" data-z="3" aria-pressed="false">3</button>
</div>
<div class="plakat nurjs" id="plakat-ziel"></div>
<div class="p-legende nurjs" id="p-legende"></div>
<p class="quelle">Einteilung nach bfu Plakat 4.301.01, Stand 09.2020, Darstellung nachgebaut: <a href="https://www.bfu.ch/api/publications/bfu_4.301.01_Umgang%20mit%20Maschinen%20und%20Anlagen%20im%20Technischen%20Gestalten.pdf">Original-Plakat (PDF)</a>. Welche Regeln, Videos und Checklisten zu einer Maschine passen, ist eine eigene Zusammenstellung dieser Seite.</p>
<p>Nicht auf dem Plakat: <a href="#flaechen">Flächen bilden</a> (Stricken, Häkeln, Weben, 3D-Druck) und der Lasercutter (<a href="#lasercutten">Lasercutten</a>).</p>
{leer}
</section>
{chr(10).join(verf_html)}
</div></section>

<section class="panel nurjs" id="material"><div class="text">
{chr(10).join(mat_html)}
</div></section>

<section class="panel" id="fachraum"><div class="text">
{chr(10).join(fach_html)}
</div></section>

<section class="panel" id="hintergrund"><div class="text">
<ul class="sprung" aria-label="In diesem Register">
<li><a href="#recht">Rechtlicher Rahmen</a></li>
<li><a href="#kantone">Kantonale Vorgaben</a></li>
<li><a href="#quellen">Quellen und Downloads</a></li>
<li><a href="#begriffe">Begriffe</a></li>
</ul>
{recht}
{kantone}
@@QUELLEN@@
</div></section>

</div>
</div></main>'''

body = themen(lists(body))
# Quellen erst nach der Listenbearbeitung einsetzen, damit die Base64-Cover nicht durch die Regex laufen
# Begriffe ganz am Schluss, aber vor der Fusszeile
if '<footer' in quellen:
    i = quellen.index('<footer'); quellen = quellen[:i] + begriffe + '\n\n' + quellen[i:]
else:
    quellen = quellen + '\n' + begriffe
body = body.replace('@@QUELLEN@@', quellen)
body = re.sub(r'<div class="b-bild" data-bild="([^"]+)"></div>', bild, body)

head = S[:S.index('<style>\n/* Layout')].rstrip('\n')
assert head.startswith('<!doctype html>') and '@font-face' in head
html = (head + '\n<script>document.documentElement.classList.add("js")</script>\n<style>\n' + css + '</style>\n</head>\n<body>\n'
        + body + '\n\n<script>\n' + js.replace('/*ZUORDNUNG*/{}', ZUORDNUNG_JSON) + '</script>\n</body>\n</html>\n')
open(OUT, 'w', encoding='utf-8').write(html)
for v, n in treffer.items():
    if n == 0: print('VERBOT OHNE TREFFER:', v)
for v, n in itreffer.items():
    if n == 0: print('INSTR OHNE TREFFER:', v)
print('verbote', sum(treffer.values()), 'instr', sum(itreffer.values()))
