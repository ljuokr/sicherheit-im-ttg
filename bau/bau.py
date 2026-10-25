import re, sys
import os
HIER = os.path.dirname(os.path.abspath(__file__)) + '/'
PROJ = os.path.dirname(HIER.rstrip('/')) + '/'
SRC = PROJ + 'inhalt.html'
OUT = sys.argv[1] if len(sys.argv) > 1 else PROJ + 'sicherheit-im-ttg.html'
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
# Fachraum: Betreiben und warten, dann Planen und einrichten
FACH = [('<h2 id="fachraum">','<h2 id="planen">'),('<h2 id="lagerung">','<h2 id="entsorgung">'),('<h2 id="entsorgung">','<h2 id="notfall">'),
        ('<h2 id="zustaendig">','<h2 id="begriffe">'),('<h2 id="planen">','<h2 id="zustaendig">')]
HAUPT = [('grundlage','Grundlage'),('verfahren','Maschinen und Verfahren'),('material','Material'),('fachraum','Fachraum'),
         ('notfall','Notfall'),('unterricht','Unterricht'),('recht','Recht'),('quellen','Quellen')]

# Eigene Zuordnung: welche Themen, Videos und Checklisten zu einer Maschine des Plakats passen
TUD = 'https://www.tud.ch/lernvideos/verfahren/#'
TUDH = 'https://www.tud.ch/lernvideos/hilfsger%C3%A4te/#'
SUVA = 'https://www.suva.ch/de-ch/download/checklisten/tisch--und-staenderbohrmaschinen/tisch--und-staenderbohrmaschinen--67036.D'
B4323 = 'https://www.bfu.ch/api/publications/bfu_4.323.01_Sicherheit%20im%20Technischen%20Gestalten%20%E2%80%93%20Checklisten%20zur%20%C3%9Cberpr%C3%BCfung%20der%20Fachr%C3%A4ume.pdf'
CHEM = 'https://chemsuisse.ch/files/278/DE-Schulen-Leitfaden-TTG/1391/Leitfaden-Schulen-TTG.pdf'
# Hinweise je Maschine: [Text, Quelle, Link]. Ohne Quelle = eigener Hinweis dieser Seite, wird so gekennzeichnet
KLEINGERAET = ['Lötkolben, Heissleimpistolen und Heissluftföhn samt Kabel regelmässig auf einwandfreien Zustand prüfen. Zum Auskühlen aufhängen, damit die Kabel nicht anschmelzen.', 'bfu 4.323, Checkliste 3, Punkt 4', B4323]
def heiss(teil): return ['%s: Verbrennungsgefahr. Nicht berühren und nach Gebrauch sicher abstellen.' % teil, '', '']
SCHNITT = ['Schnittgefahr an Messer oder Klinge: Finger ausserhalb des Schneidbereichs, Schutzvorrichtung benützen.', '', '']
QUETSCH = ['Quetschgefahr: Finger ausserhalb des Arbeitsbereichs halten.', '', '']
ZUORDNUNG = {
 'Laminiergerät': {'hinweis': [heiss('Die Folie ist beim Austritt heiss')]},
 'Heissleimpistole': {'hinweis': [heiss('Düse und Kleber werden heiss'), KLEINGERAET, ['Heissleim enthält kaum gefährliche Inhaltsstoffe.', 'chemsuisse, S. 23', CHEM]]},
 'Folienschweissgerät': {'hinweis': [heiss('Die Schweissleiste wird heiss')]},
 'Nähmaschine': {'hinweis': [['Stichverletzung durch die Nadel: Finger vom Nähfuss fernhalten, beim Einfädeln den Motor ausschalten.', '', '']], 'video': [('Nähen mit der Nähmaschine', TUD+'naehenmitdernaehmaschine')]},
 'Heftklammerpistole': {'hinweis': [['Nie auf Personen richten, Finger nicht vor die Austrittsöffnung.', '', '']]},
 'Weichlötvorrichtung': {'themen': ['weichloeten'], 'hinweis': [KLEINGERAET], 'video': [('Weichlöten mit dem Lötkolben', TUD+'weichloeten')]},
 'Bunsenbrenner (Brenngas und Luft)': {'themen': ['gasflaschen'], 'hinweis': [heiss('Die Flamme ist kaum sichtbar, das Werkstück wird heiss')]},
 'Hartlötanlage (Propan-/Butan-Sauerstoff)*': {'themen': ['hartloeten', 'gasflaschen'], 'video': [('Hartlöten', TUD+'hartloeten')]},
 'Autogenschweissanlage (Acetylen-Sauerstoff)*': {'themen': ['schweissen', 'gasflaschen']},
 'Schutzgasschweissanlage (MIG/MAG)*': {'themen': ['schweissen', 'gasflaschen'], 'video': [('Schutzgasschweissen', TUD+'schutzgasschweissen')]},
 'Papierschneidemaschine': {'hinweis': [SCHNITT]},
 'Dekupiersäge': {'themen': ['holzstaub'], 'video': [('Sägen mit der Dekupiersäge', TUD+'dekupiersaege')]},
 'Thermoschneider': {'themen': ['kunststoff-saegen-bohren-schleifen'], 'hinweis': [heiss('Der Heizdraht wird heiss')], 'video': [('Styroporschneider', TUDH+'styroporschneider')]},
 'Stichsäge': {'themen': ['holzstaub'], 'video': [('Sägen mit der Stichsäge', TUD+'stichsaege')]},
 'Handbohrmaschine': {'themen': ['holzstaub']},
 'Ständerbohrmaschine': {'themen': ['psa', 'holzstaub'], 'video': [('Bohren mit der Tischbohrmaschine', TUD+'tischbohrmaschine')], 'suva': True},
 'Hebelblechschere': {'hinweis': [SCHNITT, ['Blechkanten sind scharf: Handschuhe tragen.', '', '']]},
 'Bandsäge': {'themen': ['holzstaub'], 'video': [('Bandsäge', TUD+'bandsaege')]},
 'Gehrungskappsäge': {'themen': ['holzstaub']},
 'Lamellen-Dübelfräse': {'themen': ['holzstaub'], 'video': [('Runddübeln und Flachdübeln', TUD+'duebeln')]},
 'Holzdrechselbank': {'themen': ['holzstaub', 'psa']},
 'Dreieckschleifer': {'themen': ['holzstaub']},
 'Schwingschleifer': {'themen': ['holzstaub']},
 'Exzenterschleifer': {'themen': ['holzstaub']},
 'Tellerschleifmaschine': {'themen': ['holzstaub'], 'video': [('Schleifen an der Tellerschleifmaschine', TUD+'tellerschleifmaschine')]},
 'Bandschleifmaschine': {'themen': ['holzstaub']},
 'Overlockmaschine': {'hinweis': [['Messer und Nadel: Finger vom Nähfuss fernhalten, beim Einfädeln den Motor ausschalten.', '', '']], 'video': [('Nähen mit der Overlockmaschine', TUD+'naehenmitderoverlockmaschine')]},
 'Spindelpresse': {'hinweis': [QUETSCH]},
 'Linearbiegegerät': {'hinweis': [heiss('Heizstab und Werkstück werden heiss')], 'video': [('Linearbiegegerät', TUDH+'linearbiegegeraet')]},
 'Heissluftföhn, Industrieföhn': {'hinweis': [heiss('Die Düse wird heiss')]},
 'Tiefziehgerät': {'themen': ['tiefziehen'], 'hinweis': [heiss('Die Folie wird heiss')]},
 'Abkantgerät (Bleche)': {'hinweis': [QUETSCH]},
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
grund = zw('<h2 id="grundsatz">', '<h2 id="maschinen">').replace('<h3>Schutzausrüstung</h3>', '<h3 id="schutzausruestung">Schutzausrüstung</h3>')
aufsicht_txt = zw('<h2 id="maschinen">Maschinen nach Zyklus</h2>', '<p>Die folgenden Abschnitte', mit_a=False)
m_gelt = re.search(r'<div class="hinweis" id="geltung">.*?</div>\n', grund, re.S)
geltung = m_gelt.group(0) if m_gelt else ''
grund_ohne = grund.replace(geltung, '') if geltung else grund
def teil(a, b): return grund_ohne[grund_ohne.index(a):grund_ohne.index(b) if b else len(grund_ohne)]
def h3zu2(x, ids={}):
    for alt, neu in ids.items(): x = x.replace(alt, neu)
    return re.sub(r'<h3( id="[^"]+")?>(.*?)</h3>', r'<h2\1>\2</h2>', x)
sicher = h3zu2(teil('<h3 id="sicher-unterrichten">', '<h3>Für jeden Fachraum</h3>'))
allg = h3zu2(teil('<h3>Für jeden Fachraum</h3>', '<h3 id="schutzausruestung">'), {'<h3>Für jeden Fachraum</h3>': '<h3 id="fuer-jeden-fachraum">Für jeden Fachraum</h3>', '<h3>STOP-Prinzip</h3>': '<h3 id="stop">STOP-Prinzip</h3>'})
stoffe = h3zu2(teil('<h3 id="schutzausruestung">', None))
grund_ohne = grund_ohne[:grund_ohne.index('<h3 id="sicher-unterrichten">')]
grund_ohne = re.sub(r'<h2 id="grundsatz">.*?</h2>\n', '', grund_ohne).replace('<h3 id="drei-fragen">Drei Fragen vor jeder Arbeit</h3>', '<h2 id="drei-fragen">Drei Fragen vor jeder Arbeit</h2>')
def sprung(html): return '<ul class="sprung" aria-label="In diesem Register">\n' + '\n'.join('<li><a href="#%s">%s</a></li>' % m for m in re.findall(r'<h2 id="([^"]+)"[^>]*>(.*?)</h2>', html)) + '\n</ul>'
def ohne_erste_id(html, i): return html.replace('<h2 id="%s">' % i, '<h2>', 1)
einleitung_verf = re.search(r'<p>Die folgenden Abschnitte.*?</p>', S).group(0)
leer = re.search(r'<p id="leer" hidden>.*?</p>', S).group(0)
lehrplan = zw('<h2 id="lehrplan">', '<h2 id="quellen">')
kantone = zw('<h2 id="kantone">', '<h2 id="erschliessen">')
didaktik = zw('<h2 id="erschliessen">', '<h3>Fachraum als Lernort</h3>')
lernort = zw('<h3>Fachraum als Lernort</h3>', '<h2 id="lehrplan">')
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
kopf = re.search(r'<h1>.*?</h1>', S, re.S).group(0)
starts = [S.index('<section class="verfahren" id="%s">' % v[0]) for v in VERF] + [S.index('<h2 id="lagerung">')]
verf_html = []
for k, (vid, name) in enumerate(VERF):
    s = S[starts[k]:starts[k + 1]].strip('\n').replace('<section class="verfahren" id="%s">' % vid,
                          '<section class="verfahren" id="%s" data-titel="%s">' % (vid, name), 1)
    assert 'data-titel' in s
    verf_html.append(s)
# Fachraum ohne Unterreiter: eine Sprungliste, darunter Betreiben und Planen
fach_teile = [zw(x, y).replace('<h2 id="fachraum">', '<h2 id="fachraum-betreiben">', 1) for x, y in FACH]
fach_html = [allg] + fach_teile + [lernort]
fach_html = [sprung('\n'.join(fach_html))] + fach_html
notfall = zw('<h2 id="notfall">', '<h2 id="fachraum">')
mat_html = []
for mid, name, key in MATS:
    hint = '' if key == 'alle' else '\n<p class="einleitung">Themen aus allen Verfahren, die %s betreffen. Für jedes Material gelten zusätzlich die Themen unter <a href="#alle-materialien">«Alle Materialien»</a>.</p>' % ('«%s»' % name)
    if key == 'alle': hint = '\n<p class="einleitung">Themen, die für alle Materialien gelten.</p>'
    mat_html.append('<section class="mat-teil" id="%s" data-key="%s">\n<h2>%s</h2>%s\n<div class="slot"></div>\n</section>' % (mid, key, name, hint))
mat_html = [stoffe] + mat_html
mat_html = ['<ul class="sprung" aria-label="In diesem Register">\n' + '\n'.join('<li><a href="#%s">%s</a></li>' % m for m in re.findall(r'<h2 id="([^"]+)"[^>]*>(.*?)</h2>', stoffe) + [(m[0], m[1]) for m in MATS]) + '\n</ul>'] + mat_html

body = f'''<header class="kopf"><div class="in">
{kopf}
</div></header>

<div class="leiste" id="leiste">
<nav class="reg" id="reg" aria-label="Register">
<div class="in reg-zeile">
{tabs(HAUPT, 'Hauptbereiche', 'tl-haupt')}
<form id="finder" class="suche-klein" role="search">
<label class="sr" for="f-q">Suchen in Maschinen und Themen</label>
<input type="search" id="f-q" name="q" placeholder="Suchen" autocomplete="off">
</form>
</div>
<div class="reg2" id="reg2" hidden><div class="in">
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

<section class="panel" id="verfahren"><div class="text">
<ul class="sprung" aria-label="In diesem Register">
<li><a href="#maschinen">Maschinen nach Zyklus</a></li>
{chr(10).join('<li><a href="#%s">%s</a></li>' % v for v in VERF)}
</ul>
<section class="sub" id="plakat" data-titel="Übersicht">
<h2 id="maschinen" class="p-titel">Umgang mit Maschinen und Anlagen <span>Gefahrenkategorien nach Zyklus</span></h2>
<noscript><p>Die Maschinentabellen stehen bei den einzelnen Verfahren.</p></noscript>
<div class="p-legende nurjs" id="p-legende"></div>
<div class="plakat nurjs" id="plakat-ziel"></div>
<p class="p-unten nurjs">Aufgebaut wie das bfu-Plakat «Umgang mit Maschinen und Anlagen». Eine Maschine antippen zeigt die Einteilung und die Regeln dazu. Ein Gruppentitel führt zum Verfahren.</p>
<p class="quelle">Nachgebaut nach <a class="ql" href="https://www.bfu.ch/api/publications/bfu_4.301.01_Umgang%20mit%20Maschinen%20und%20Anlagen%20im%20Technischen%20Gestalten.pdf">bfu-Plakat 4.301, 09.2020&nbsp;↗</a> · Regeln, Videos und Checklisten je Maschine: eigene Zusammenstellung</p>
<p>Nicht auf dem Plakat: <a href="#flaechen">Flächen bilden</a> (Stricken, Häkeln, Weben, 3D-Druck) und der Lasercutter (<a href="#lasercutten">Lasercutten</a>).</p>
{leer}
<section id="aufsicht">
<h3>Gefahrenkategorien A, B, C</h3>
{aufsicht_txt}
</section>
</section>
{chr(10).join(verf_html)}
</div></section>

<section class="panel nurjs" id="material"><div class="text">
{chr(10).join(mat_html)}
</div></section>

<section class="panel" id="fachraum"><div class="text">
{chr(10).join(fach_html)}
</div></section>

<section class="panel" id="notfall"><div class="text">
{ohne_erste_id(notfall, 'notfall')}
</div></section>

<section class="panel" id="unterricht"><div class="text">
<ul class="sprung" aria-label="In diesem Register">
<li><a href="#erschliessen">Produktions- und Erschliessungshandeln</a></li>
<li><a href="#lehrplan">Lehrplan 21</a></li>
<li><a href="#sicher-unterrichten">Sicher unterrichten</a></li>
<li class="nurjs"><a href="#instruktion">Instruktion und Aufsicht</a></li>
</ul>
{didaktik}
{lehrplan}
{sicher}
<section id="instruktion" class="nurjs">
<h2>Instruktion und Aufsicht im Unterricht</h2>
<p class="einleitung">Alle Stellen dieser Seite, an denen die Quellen Instruktion, Aufsicht oder Handeln der Lehrperson verlangen, im Wortlaut. Der Link führt zum Thema.</p>
<div id="instr-liste"></div>
</section>
</div></section>

<section class="panel" id="recht"><div class="text">
<ul class="sprung" aria-label="In diesem Register">
<li><a href="#recht">Rechtlicher Rahmen</a></li>
<li><a href="#kantone">Kantonale Vorgaben</a></li>
</ul>
{ohne_erste_id(recht, 'recht')}
{kantone}
</div></section>

<section class="panel" id="quellen"><div class="text">
<ul class="sprung" aria-label="In diesem Register">
<li><a href="#quellen">Quellen und Downloads</a></li>
<li><a href="#begriffe">Begriffe</a></li>
</ul>
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
body = body.replace('@@QUELLEN@@', quellen.replace('<h2 id="quellen">', '<h2>', 1))
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
