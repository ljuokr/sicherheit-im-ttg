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
"In der Umgebung keine brennbaren","Nicht lasern","Verwendung und Bearbeitung asbesthaltiger","Blei und Bleilegierungen",
"Auf Polyurethan-Montageschaum","Bleihaltige Weichlote","Cadmiumhaltige Hartlote","Flussmittel als verwendungsfertige Paste","Keine Schweissarbeiten",
"Verzichten auf","Getränkte Lappen und Papiere nie","Auf Produkte mit gesundheitsgefährdenden","Nicht verwenden: Pigmente","Keine isocyanathaltigen",
"Leinölhaltige Lacke nie","Nicht verwenden: toluolhaltige","Nicht verwenden: Beizmittel","Nicht verwenden: Ätzmittel mit Flusssäure","Nie Getränkeflaschen",
"Konzentrierte oxidierende Säuren","Keine Gasflaschen","Gefährliche Chemikalien dürfen nie","Alte Restbestände nicht mischen",
"Lehrpersonen dürfen nach eigenem Ermessen keine","Nicht verwenden: improvisierte Anschlüsse","Schutzeinrichtungen an Maschinen dürfen nicht","Keine Produkte, die explosiv","Auf das Bearbeiten von Blei"]
INSTR = [("Schülerinnen und Schüler bedienen den Lasercutter","aufsicht"),
("Auf Polyurethan-Montageschaum","instruktion"),("* Inbetriebnahme, Ausserbetriebsetzung","selbst"),

("Epoxy-, Polyurethan- und Sekundenkleber verwenden","instruktion"),("Produkte mit Gefahrenhinweis kennzeichnen","instruktion"),
("Brennofen in einem gut durchlüfteten Raum","selbst"),("Betrieb nur unter Aufsicht einer Lehrperson","aufsicht"),
("Die Schule stellt die Behälter","selbst"),("Lehrpersonen dürfen nach eigenem Ermessen","selbst"),("Teilen sich mehrere Lehrpersonen","selbst"),
("Eine Fachraumordnung mit Bekleidungs","instruktion"),("Bei Mehrfachnutzung empfiehlt die bfu ein Zutrittsmanagement","instruktion"),
("Lehrpersonen haben während der Unterrichtszeit","selbst"),("Gasanlagen für Hartlöten und Schweissen nehmen nur geschulte","selbst")]
treffer = {v: 0 for v in VERBOTE}; itreffer = {i[0]: 0 for i in INSTR}

def slug(t):
    t = t.lower()
    for a, b in (('ä','ae'),('ö','oe'),('ü','ue'),('é','e')): t = t.replace(a, b)
    return re.sub(r'[^a-z0-9]+', '-', t).strip('-')

# Passendes ISO-7010-Verbotszeichen, sonst das allgemeine Warnzeichen
def zeichen(txt):
    if txt.startswith('Kein Essen und Trinken'): return 'iso-P022.svg'
    if txt.startswith('Handschuhverbot'): return 'iso-P028.svg'
    return 'iso-W001.svg'

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
            if isv: vb.append('<li class="verbot"%s><img class="vb-z" data-icon="%s" alt="Warnpunkt:"> %s</li>' % (attrs, zeichen(txt), it))
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
        ('oberflaeche','Oberfläche verändern'),('lehrpersonen','Nur Lehrpersonen')]
# Zeilen der Matrix Material × Verfahren, Schlüssel wie in data-mat
MATS = [('alle','Alle Materialien',''),('holz','Holz','Massivholz, Sperrholz, MDF'),('metall','Metall','Stahl, Aluminium, Kupfer, Messing, Zinn'),
        ('kunststoff','Kunststoff','Acrylglas, PLA, ABS, PVC'),('keramik','Keramik','Ton, Porzellan, Glas'),('textil','Textil','Baumwolle, Wolle, Kunstfasern, Leder')]
# Kurztitel für die Felder der Matrix, der volle Titel steht im Fenster
KURZ = {'Staub beim Sägen, Bohren und Schleifen': 'Staub beim Sägen, Schleifen',
        'Ständerbohrmaschine (Säulen- und Tischbohrmaschine)': 'Ständerbohrmaschine',
        'Kunststoff: Thermoschneiden, Acrylglas, Brennprobe': 'Thermoschneiden, Acrylglas',
        'Metall thermisch trennen': 'Thermisch trennen',
        'Giessen und Formen mit flüssigen Kunststoffen': 'Giessen mit flüssigen Kunststoffen',
        'Gasflaschen und Gasanlagen': 'Gasflaschen',
        'Leinöl und ölgetränkte Lappen': 'Leinöl, ölige Lappen',
        'Lösungsmittel, Verdünner, Pinselreiniger': 'Lösungsmittel, Verdünner',
        'Heissgeräte: Heissleimpistole, Lötkolben, Heissluftföhn, Bügeleisen': 'Heissgeräte'}
# Fachraum: Betreiben und warten, dann Planen und einrichten
FACH = [('<h2 id="fachraum">','<h2 id="planen">'),('<h2 id="lagerung">','<h2 id="entsorgung">'),('<h2 id="entsorgung">','<h2 id="notfall">'),
        ('<h2 id="planen">','<h2 id="zustaendig">')]
HAUPT = [('grundlage','Grundlage'),('verfahren','Maschinen'),('matrix','Verfahren und Material'),('unterricht','Unterricht'),('fachraum','Fachraum'),
         ('kantone','Kantone'),('recht','Recht'),('quellen','Quellen')]

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
TK = 'https://www.hep-verlag.ch/downloads/lhh_lehrhilfe_tud_2024_tk.pdf#page='
S44023 = 'https://www.suva.ch/de-ch/download/dokument/so-arbeiten-sie-sicher-an-der-tischkreissaege--44023.d'
S67092 = 'https://www.suva.ch/de-ch/download/checklisten/elektrohandwerkzeuge/elektrohandwerkzeuge--67092.D'
S67125 = 'https://www.suva.ch/de-ch/download/checklisten/kapp--und-gehrungskreissaege/kapp--und-gehrungskreissaege--67125.D'
S67057 = 'https://www.suva.ch/de-ch/download/checklisten/bandsaege/bandsaege--67057.D'
ZUORDNUNG = {
 'Laminiergerät': {'hinweis': [heiss('Die Folie ist beim Austritt heiss')]},
 'Heissleimpistole': {'hinweis': [heiss('Düse und Kleber werden heiss'), ['Heissleim enthält kaum gefährliche Inhaltsstoffe.', 'chemsuisse, S. 23', CHEM]]},
 'Folienschweissgerät': {'hinweis': [heiss('Die Schweissleiste wird heiss')]},
 'Nähmaschine': {'hinweis': [['Stichverletzung durch die Nadel: Finger vom Nähfuss fernhalten, beim Einfädeln den Motor ausschalten.', '', '']], 'video': [('Nähen mit der Nähmaschine', TUD+'naehenmitdernaehmaschine')]},
 'Heftklammerpistole': {'hinweis': [['Nie auf Personen richten, Finger nicht vor die Austrittsöffnung.', '', '']]},
 'Weichlötvorrichtung': {'themen': ['weichloeten'], 'video': [('Weichlöten mit dem Lötkolben', TUD+'weichloeten')]},
 'Bunsenbrenner (Brenngas und Luft)': {'themen': ['gasflaschen'], 'hinweis': [heiss('Die Flamme ist kaum sichtbar, das Werkstück wird heiss')]},
 'Hartlötanlage (Propan-/Butan-Sauerstoff)*': {'themen': ['hartloeten', 'gasflaschen'], 'video': [('Hartlöten', TUD+'hartloeten')]},
 'Autogenschweissanlage (Acetylen-Sauerstoff)*': {'themen': ['schweissen', 'gasflaschen']},
 'Schutzgasschweissanlage (MIG/MAG)*': {'themen': ['schweissen', 'gasflaschen'], 'video': [('Schutzgasschweissen', TUD+'schutzgasschweissen')]},
 'Papierschneidemaschine': {'hinweis': [SCHNITT]},
 'Dekupiersäge': {'themen': ['holzstaub'], 'hinweis': [['Schutzbrille tragen, der Kopf ist höher als das Sägeblatt.', 'Technologiekarte, S. 59', TK + '5']], 'video': [('Sägen mit der Dekupiersäge', TUD+'dekupiersaege')]},
 'Thermoschneider': {'themen': ['kunststoff-saegen-bohren-schleifen'], 'hinweis': [heiss('Der Heizdraht wird heiss')], 'video': [('Styroporschneider', TUDH+'styroporschneider')]},
 'Stichsäge': {'themen': ['holzstaub'], 'hinweis': [['Schutzbrille tragen, auf die Kabelführung achten. Das Sägeblatt berührt beim Einschalten das Werkstück nicht. Werkstück mit Schraubzwinge befestigen, Stichsäge mit beiden Händen führen.', 'Technologiekarte, S. 59', TK + '5']], 'video': [('Sägen mit der Stichsäge', TUD+'stichsaege')]},
 'Handbohrmaschine': {'themen': ['holzstaub'], 'hinweis': [['Schutzbrille tragen, lange Haare zusammenbinden, Schmuck und Halstuch ablegen. Werkstück mit Bohrbrett, Schraubstock oder Feilkloben gegen Mitdrehen sichern. Wechsel und Einstellungen nur im Stillstand.', 'Technologiekarte, S. 61, 62', TK + '8']]},
 'Ständerbohrmaschine': {'themen': ['bohrmaschine', 'holzstaub'], 'video': [('Bohren mit der Tischbohrmaschine', TUD+'tischbohrmaschine')], 'suva': True},
 'Hebelblechschere': {'hinweis': [SCHNITT]},
 'Bandsäge': {'themen': ['holzstaub'], 'hinweis': [['Verdeckung bis höchstens 10 mm über das Werkstück absenken, mit Stossholz arbeiten, Hände mindestens eine Faustbreite vom Sägeband. Rundholz so führen, dass es sich nicht drehen kann, etwa in einem Prisma.', 'Suva 67057, Fragen 1, 3', S67057]], 'video': [('Bandsäge', TUD+'bandsaege')]},
 'Gehrungskappsäge': {'themen': ['holzstaub'], 'hinweis': [['Werkstück am Anschlag fixieren, eine Faustbreite Abstand halten, nie in die Schnittebene greifen. Keine kleinen, unfixierten Teile sägen. Gehörschutz tragen.', 'Suva 67125, S. 3, Fragen 11, 12', S67125]]},
 'Lamellen-Dübelfräse': {'themen': ['holzstaub'], 'video': [('Runddübeln und Flachdübeln', TUD+'duebeln')]},
 'Holzdrechselbank': {'themen': ['holzstaub']},
 'Dreieckschleifer, Schwingschleifer': {'themen': ['holzstaub'], 'hinweis': [['Werkstück einspannen, Schutzbrille tragen.', 'Technologiekarte, S. 64', TK + '10']]},
 'Exzenterschleifer': {'themen': ['holzstaub'], 'hinweis': [['Staubbeutel oder Staubsauger anschliessen, bei viel Staub Maske FFP2.', 'Suva 67092, Frage 11', S67092]]},
 'Akkubohrschrauber (kleine Bauweise)': {'hinweis': [['Werkstück gegen Mitdrehen sichern. Schutzbrille tragen, lange Haare zusammenbinden, Schmuck ablegen.', 'Technologiekarte, S. 62', TK + '8']]},
 'Winkelschleifer mit stumpfen Aufsätzen**': {'hinweis': [['Schutzhaube und Zusatzhandgriff montiert. Nur unbeschädigte Scheiben verwenden, die zur Drehzahl passen. Schutzbrille und Gehörschutz tragen.', 'Suva 67092, Fragen 10, 14', S67092]]},
 'Winkelschleifer mit Trennscheibenaufsätzen': {'hinweis': [['Schutzhaube und Zusatzhandgriff montiert. Nur unbeschädigte Scheiben verwenden, die zur Drehzahl passen. Schutzbrille und Gehörschutz tragen.', 'Suva 67092, Fragen 10, 14', S67092]]},
 'Tellerschleifmaschine': {'themen': ['holzstaub'], 'hinweis': [['Schutzbrille tragen. Der Abstand zwischen Schleiftisch und Scheibe ist höchstens 3 mm.', 'Technologiekarte, S. 64', TK + '10']], 'video': [('Schleifen an der Tellerschleifmaschine', TUD+'tellerschleifmaschine')]},
 'Bandschleifmaschine': {'themen': ['holzstaub']},
 'Overlockmaschine': {'hinweis': [['Messer und Nadel: Finger vom Nähfuss fernhalten, beim Einfädeln den Motor ausschalten.', '', '']], 'video': [('Nähen mit der Overlockmaschine', TUD+'naehenmitderoverlockmaschine')]},
 'Spindelpresse': {'hinweis': [QUETSCH]},
 'Linearbiegegerät': {'hinweis': [heiss('Heizstab und Werkstück werden heiss')], 'video': [('Linearbiegegerät', TUDH+'linearbiegegeraet')]},
 'Heissluftföhn/Industrieföhn': {'hinweis': [heiss('Die Düse wird heiss')]},
 'Tiefziehgerät': {'themen': ['tiefziehen'], 'hinweis': [heiss('Die Folie wird heiss')]},
 'Abkantgerät (Bleche)': {'hinweis': [QUETSCH]},
 'Tischkreissäge': {'themen': ['holzstaub'], 'hinweis': [['Rückschlag verhindern: Spaltkeil höchstens 5 mm vom Sägeblatt, Schutzhaube ganz auf das Werkstück absenken, schmale Stücke mit dem Längsstossholz schieben. Niemand steht im Bereich eines möglichen Rückschlags.', 'Suva 44023, S. 6, 7, 9, 12', S44023]]},
 'Handkreissäge': {'themen': ['holzstaub']},
 'Elektrohandhobel': {'themen': ['holzstaub']},
 'Abricht- und Dickenhobelmaschine': {'themen': ['holzstaub']},
 'Handoberfräse': {'themen': ['holzstaub']},
 'Kehlmaschine': {'themen': ['holzstaub']},
 'Keramikbrennofen': {'themen': ['glasieren-und-brennen']},
}
for n, sei in {'Dekupiersäge': 5, 'Stichsäge': 5, 'Ständerbohrmaschine': 7, 'Handbohrmaschine': 8, 'Tellerschleifmaschine': 10, 'Heissleimpistole': 13, 'Lamellen-Dübelfräse': 16, 'Nähmaschine': 21, 'Heissluftföhn/Industrieföhn': 11}.items(): ZUORDNUNG[n]['tk'] = sei
for n in ['Heissleimpistole', 'Weichlötvorrichtung', 'Heissluftföhn/Industrieföhn']: ZUORDNUNG[n].setdefault('themen', []).insert(0, 'heissgeraete')
# Lernvideos zu Maschinen sind nicht auf Sicherheitsaussagen prüfbar, darum keine auf den Karten
for z in ZUORDNUNG.values(): z.pop('video', None)
for z in ZUORDNUNG.values():
    if z.pop('suva', None): z.setdefault('links', []).append(['Suva-Checkliste 67036', SUVA])
    if 'tk' in z: z.setdefault('links', []).append(['Technologiekarte Technik und Design', TK + str(z.pop('tk'))])
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
allg = h3zu2(teil('<h3>Für jeden Fachraum</h3>', '<h3 id="schutzmassnahmen">'), {'<h3>Für jeden Fachraum</h3>': '<h3 id="fuer-jeden-fachraum">Für jeden Fachraum</h3>', '<h3>STOP-Prinzip</h3>': '<h3 id="stop">STOP-Prinzip</h3>'})
schutz = h3zu2(teil('<h3 id="schutzmassnahmen">', '<h3 id="einkauf">'))
stoffe = h3zu2(teil('<h3 id="einkauf">', '<h3 id="emissionen">'))
emissionen = h3zu2(teil('<h3 id="emissionen">', None))
grund_ohne = grund_ohne[:grund_ohne.index('<h3 id="sicher-unterrichten">')]
grund_ohne = re.sub(r'<h2 id="grundsatz">.*?</h2>\n', '', grund_ohne).replace('<h3 id="drei-fragen">Drei Fragen vor jeder Arbeit</h3>', '<h2 id="drei-fragen">Drei Fragen vor jeder Arbeit</h2>').replace('<h3 id="wichtigste">Das Wichtigste für den Anfang</h3>', '<h2 id="wichtigste">Das Wichtigste für den Anfang</h2>')
def sprung(html): return '<ul class="sprung" aria-label="In diesem Register">\n' + '\n'.join('<li><a href="#%s">%s</a></li>' % m for m in re.findall(r'<h2 id="([^"]+)"[^>]*>(.*?)</h2>', html)) + '\n</ul>'
def ohne_erste_id(html, i): return html.replace('<h2 id="%s">' % i, '<h2>', 1)
einleitung_verf = re.search(r'<p>Die folgenden Abschnitte.*?</p>', S).group(0)
leer = re.search(r'<p id="leer" hidden>.*?</p>', S).group(0)
lehrplan = zw('<h2 id="lehrplan">', '<h2 id="quellen">')
kantone = zw('<h2 id="kantone">', '<h2 id="erschliessen">')
didaktik = zw('<h2 id="erschliessen">', '<h3 id="lernort">Fachraum als Lernort</h3>')
lernort = zw('<h3 id="lernort">Fachraum als Lernort</h3>', '<h2 id="lehrplan">')
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
    s = s.replace('<div class="wrap">\n<table class="mtab">', '<div class="wrap mtab-wrap">\n<table class="mtab">')
    s = re.sub(r'(</table>\n</div>\n)<ul>(<li>\*)', r'\1<ul class="mtab-wrap">\2', s)
    verf_html.append(s)
# Fachraum ohne Unterreiter: eine Sprungliste, darunter Betreiben und Planen
fach_teile = [zw(x, y).replace('<h2 id="fachraum">', '<h2 id="fachraum-betreiben">', 1) for x, y in FACH]
notfall = zw('<h2 id="notfall">', '<h2 id="fachraum">')
zustaendig = zw('<h2 id="zustaendig">', '<h2 id="begriffe">')
# Recht und Zuständigkeiten: jede Unterüberschrift zuklappbar, mit Kernaussage in der Zeile
KERN = {'Warum Gesetze offen formuliert sind': 'Massstab statt Einzelvorschriften',
        'Sorgfalts- und Obhutspflicht': 'einteilen, instruieren, beaufsichtigen, laufend beurteilen',
        'Haftung': 'der Schulträger haftet, strafbar ist, wer die Sorgfalt verletzt',
        'Mutterschutz am Arbeitsplatz': 'Arbeitsplätze mit bestimmten Stoffen vorsorglich beurteilen',
        'Pflichten und Empfehlungen': 'sieben Pflichten, dazu Empfehlungen von bfu und chemsuisse, mit Rhythmus',
        'Wer kontrolliert': 'Arbeitsinspektorat, Suva nur Berufskrankheiten, bfu berät',
        'Wer an der Schule zuständig ist': 'Schulträger für Räume, Ansprechperson für Chemikalien, Aufgaben ins Pflichtenheft',
        'Fachraum betreiben': 'gemeinsame Regeln, Wartung, Checklisten',
        'Maschinen warten und prüfen': 'Schutzeinrichtungen intakt, Elektro periodisch prüfen',
        'Checklisten': 'bfu 4.323 von täglich bis jährlich',
        'Lagerung gefährlicher Stoffe': 'Kennzeichnung entscheidet, gefährliche Stoffe abschliessen',
        'Brennbare Flüssigkeiten, Säuren, Gas': 'höchstens 100 Liter pro Fachraum, Säuren und Laugen getrennt',
        'Entsorgung': 'gefährliche Chemikalien als Sonderabfall, nie in Kehricht oder Abwasser',
        'Fachräume planen und einrichten': 'für Neubau, Umbau und Neuorganisation',
        'Räume': 'Maschinenraum, Sichtkontakt, Zugang',
        'Installationen und Bauteile': 'FI-Schalter, Not-Aus, Absaugung',
        'Notfälle vorbereiten': 'Notfallblatt, Erste-Hilfe-Kasten, Löscher, Abläufe',
        'Fachraum als Lernort': 'Raum für selbstständiges Arbeiten',
        'Für jeden Fachraum': 'nicht essen, wenig Staub, absaugen, lösungsmittelfrei',
        'Schutzmassnahmen': 'STOP-Prinzip, Schutzausrüstung von Kopf bis Fuss',
        'Sicher unterrichten': 'Lehrperson wählt Maschinen, führt ein, beaufsichtigt und hält fest',
        'Vom Produktions- zum Erschliessungshandeln': 'selbstständiger Arbeiten verändert Raum und Aufsicht',
        'Was der Lehrplan 21 verlangt': 'Sicherheit als Lerninhalt, Kompetenzstufen'}
def klapp(html, h='h3'):
    def f(m):
        titel = re.sub(r'<[^>]+>', '', m.group(2))
        return ('<section class="klapp"><details class="thema-d">\n<summary><%s%s>%s</%s><span class="t-meta">%s</span></summary>%s</details></section>\n'
                % (h, m.group(1), m.group(2), h, KERN.get(titel, ''), m.group(3)))
    ende = r'(?=<h3|<h2|\Z)' if h == 'h3' else r'(?=<h2|\Z)'
    return re.sub(r'<%s((?: [a-z]+="[^"]+")*)>(.*?)</%s>(.*?)%s' % (h, h, ende), f, html, flags=re.S)
recht = klapp(recht)
zustaendig = klapp(zustaendig)
# Fachraum: nur Betrieb und Einrichtung, ausserhalb der Lektion, als Zeilen zum Aufklappen
planen = fach_teile.pop() + lernort
fach_html = [klapp(klapp(x), 'h2') for x in fach_teile] + [klapp(klapp(planen), 'h2')]
# Material: nur eigener Inhalt, die Themen je Material zeigt die Matrix
mat_html = ['<section class="mat-teil">\n' + stoffe + '\n</section>', '<section class="mat-teil">\n' + emissionen + '</section>']
# Matrix: Zeilen Material, Spalten Verfahren, Felder öffnen das Thema im Fenster
zellen = {}
for (vid, _), sec in zip(VERF, verf_html):
    for mat, tid, h3 in re.findall(r'<section class="thema" data-mat="([^"]+)"(?: id="([^"]+)")?>\n<h3>(.*?)</h3>', sec):
        for key in mat.split(): zellen.setdefault((key, vid), []).append((tid or slug(h3), KURZ.get(h3, h3), h3))
# Heissgeräte gelten für alle Materialien, der Heissluftföhn steht auf dem Plakat auch unter Umformen
zellen.setdefault(('alle', 'umformen'), []).append(('heissgeraete', 'Heissgeräte', 'Heissgeräte: Heissleimpistole, Lötkolben, Heissluftföhn, Bügeleisen'))
# Textil: Maschinen ohne eigenes Thema öffnen ihre Karte auf dem Plakat (Schlüssel m:Name)
zellen.setdefault(('textil', 'verbinden'), []).extend([('m:Nähmaschine', 'Nähmaschine', 'Nähmaschine'), ('heissgeraete', 'Heissgeräte', 'Heissgeräte: Heissleimpistole, Lötkolben, Heissluftföhn, Bügeleisen')])
zellen.setdefault(('textil', 'oberflaeche'), []).extend([('m:Stickcomputer', 'Stickcomputer', 'Stickcomputer'), ('m:Overlockmaschine', 'Overlockmaschine', 'Overlockmaschine')])
zellen.setdefault(('keramik', 'umformen'), []).append(('glasieren-und-brennen', 'Glasieren und Brennen', 'Glasieren und Brennen'))
def chip(i, kurz, lang):
    if i.startswith('m:'): return '<a class="mchip mchip-m" href="#maschinen" data-maschine="%s" title="Auf dem Plakat zeigen">%s</a>' % (i[2:], kurz)
    return '<a class="mchip" href="#%s" title="%s">%s</a>' % (i, lang, kurz)
spalten = [v for v in VERF if v[0] != 'lehrpersonen']
# Nicht verwenden: Kurzfassung der Warnpunkte je Material, jeder Eintrag führt zur Regel mit Begründung
VERBOTEN = {
 'alle': [('Pigmente mit Blei, Cadmium, Chromat, Quecksilber', 'farben-lacke-spruehen'), ('Zweikomponenten-Polyurethanlacke (2K)', 'farben-lacke-spruehen'),
          ('Toluol, chlorierte Lösungsmittel', 'loesungsmittel-verduenner-pinselreiniger')],
 'holz': [('Imprägniertes Holz', 'holzstaub'), ('Holzschutzmittel im Innenbereich', 'farben-lacke-spruehen'), ('Wachs mit MEKO', 'wachsen')],
 'metall': [('Blei, Bleiblech, Altmetall mit Blei', 'mat-metall'), ('Bleihaltiges Zierzinn', 'metall-und-zinngiessen'), ('Bleihaltige Weichlote', 'weichloeten'),
            ('Cadmiumhaltige Hartlote', 'hartloeten'), ('Borhaltige Flussmittel', 'hartloeten'), ('Rostfreie und galvanisch beschichtete Stähle schweissen', 'schweissen'),
            ('Beizmittel mit Flusssäure oder Chromsäure', 'abbeizen-und-bruenieren'), ('Bleihaltige Emaille', 'emaillieren-und-glasaetzen')],
 'kunststoff': [('Kunststoffe mit Carbonfasern bearbeiten', 'holzstaub'), ('PVC, Teflon, Polyurethan, bromierte Kunststoffe lasern', 'lasercutten'),
                ('Polyurethan-Montageschaum', 'giessen-und-formen-mit-fluessigen-kunststoffen'), ('Filamente mit Nanomaterialien', '3d-druck')],
 'keramik': [('Asbest', 'speckstein-und-asbest'), ('Glasuren mit Schwermetallen für Geschirr', 'mat-keramik'), ('Flusssäure zum Glasätzen', 'emaillieren-und-glasaetzen')],
 'textil': [('Leder mit Chrom(VI) lasern', 'lasercutten')],
}
# Was nur ein Material betrifft und bei keinem Verfahren steht: öffnet sich beim Klick auf den Materialnamen
def li_mit(anfang):
    i = S.index('<li>' + anfang); return S[i:S.index('</li>', i) + 5]
CHEM = 'https://chemsuisse.ch/files/278/DE-Schulen-Leitfaden-TTG/1391/Leitfaden-Schulen-TTG.pdf'
EIGEN = {
 'metall': (['Auf das Bearbeiten von Blei', 'Gegenstände aus dem Unterricht dürfen keine', 'Schmuck: Werkstoffe auf Nickel', 'Zinn möglichst rein'], 'chemsuisse, S. 8, 10, 11, 13'),
 'keramik': (['Ess- und Trinkgeschirr nur mit Glasuren', 'Gegenstände aus dem Unterricht dürfen keine'], 'chemsuisse, S. 10, 13, 20, 21'),
}
mx = ['<tr><td class="ecke"><span class="sr">Material und Verfahren</span></td>' + ''.join('<th scope="col">%s</th>' % v[1] for v in spalten) + '<th scope="col" class="mx-nv">Nicht verwenden</th></tr>']
eigen_html = ''
for key, name, klein in MATS:
    zkopf = '<a class="mx-mat" href="#mat-%s">%s</a>' % (key, name) if key in EIGEN else '<span class="mx-mat">%s</span>' % name
    mx.append('<tr class="z-%s"><th scope="row" class="mx-zeile" id="mat-%s">%s%s</th>' % (key, key, zkopf, '<span class="mx-klein">%s</span>' % klein if klein else '') + ''.join('<td>%s</td>' % (''.join(chip(*x) for x in zellen.get((key, vid), []))
              or '<span class="sr">kein Thema</span>') for vid, _ in spalten)
              + '<td class="mx-nv"><ul class="nv">%s</ul></td></tr>' % ''.join('<li><a href="#%s">%s</a></li>' % (z, t) for t, z in VERBOTEN.get(key, [])))
    if key in EIGEN:
        anf, ql = EIGEN[key]
        eigen_html += '<template id="eigen-%s"><ul>\n%s\n</ul>\n<p class="quelle"><a class="ql" href="%s">%s&nbsp;↗</a></p></template>\n' % (key, '\n'.join(li_mit(x) for x in anf), CHEM, ql)
# Auf dem Handy: dieselben Daten als Liste je Material statt Tabelle
liste = []
for key, name, klein in MATS:
    kopf_l = '<a class="mx-mat" href="#mat-%s">%s</a>' % (key, name) if key in EIGEN else name
    teile = ''.join('<div><dt>%s</dt><dd>%s</dd></div>' % (vname, ''.join(chip(*x) for x in zellen[(key, vid)])) for vid, vname in spalten if zellen.get((key, vid)))
    nv = ' · '.join('<a href="#%s">%s</a>' % (z, t) for t, z in VERBOTEN.get(key, []))
    liste.append('<section class="mxl z-%s"><h3>%s%s</h3><dl>%s</dl>%s</section>' % (key, kopf_l, ' <span class="mx-klein">%s</span>' % klein if klein else '', teile, '<p class="mxl-nv"><b>Nicht verwenden:</b> %s</p>' % nv if nv else ''))
matrix_html = ('<h2 class="sr">Verfahren und Material</h2>\n<div class="mx-wrap"><table class="mx"><caption class="sr">Sicherheitsthemen nach Material und Verfahren</caption>\n<thead>%s</thead>\n<tbody>\n%s\n</tbody></table></div>\n') % (mx[0], '\n'.join(mx[1:])) + '<div class="mx-liste">\n%s\n</div>\n' % '\n'.join(liste) + eigen_html

body = f'''<header class="kopf"><div class="in">
{kopf}
</div></header>

<div class="leiste" id="leiste">
<nav class="reg" id="reg" aria-label="Register">
<div class="in reg-zeile">
{tabs(HAUPT, 'Hauptbereiche', 'tl-haupt')}
<form id="finder" class="suche-klein" role="search">
<label class="sr" for="f-q">Seite durchsuchen</label>
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
<section class="sub" id="plakat" data-titel="Übersicht">
<h2 id="maschinen" class="p-titel">Umgang mit Maschinen und Anlagen nach Zyklus</h2>
<noscript><p>Die Maschinentabellen stehen bei den einzelnen Verfahren.</p></noscript>
<div class="plakat nurjs" id="plakat-ziel"></div>
<div class="p-legende nurjs" id="p-legende"></div>
<p class="p-zyklen">Zyklus 1: Kindergarten bis 2. Klasse, Zyklus 2: 3. bis 6. Klasse, Zyklus 3: 7. bis 9. Klasse. Einige Kantone haben eigene Maschinenlisten, etwa Luzern und Zürich. Massgebend ist die Vorgabe des Kantons, siehe <a href="#kantone">Kantone</a>.</p>
<p class="quelle">Nachgebaut nach <a class="ql" href="https://www.bfu.ch/api/publications/bfu_4.301.01_Umgang%20mit%20Maschinen%20und%20Anlagen%20im%20Technischen%20Gestalten.pdf">bfu-Plakat 4.301 «Umgang mit Maschinen und Anlagen», 09.2020&nbsp;↗</a></p>
{leer}
<section id="aufsicht" hidden>
<h3>Gefahrenkategorien A, B, C</h3>
{aufsicht_txt}
</section>
</section>
{chr(10).join(verf_html)}
</div></section>

<section class="panel" id="matrix"><div class="text mx-text">
{matrix_html}
<ul class="sprung mx-weiter" aria-label="Weiter in diesem Register">
<li><a href="#einkauf">Stoffe auswählen</a></li>
<li><a href="#hergestellt">Was hergestellt wird</a></li>
<li><a href="#emissionen">Emissionen</a></li>
</ul>
{chr(10).join(mat_html)}
</div></section>

<section class="panel" id="fachraum"><div class="text">
{chr(10).join(fach_html)}
</div></section>

<section class="panel" id="unterricht"><div class="text">
{klapp(sicher, 'h2')}
{klapp(allg, 'h2')}
<section class="u-schutz">
{klapp(schutz, 'h2')}</section>
{klapp(notfall, 'h2')}
{klapp(didaktik, 'h2')}
{klapp(lehrplan, 'h2')}
</div></section>

<section class="panel" id="kantone"><div class="text">
{ohne_erste_id(kantone, 'kantone')}
</div></section>

<section class="panel" id="recht"><div class="text">
<ul class="sprung" aria-label="In diesem Register">
<li><a href="#zustaendig">Zuständigkeiten</a></li>
<li><a href="#schulleitung">Pflichten und Empfehlungen</a></li>
</ul>
{ohne_erste_id(recht, 'recht')}
{zustaendig}
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

# Themen zuklappen: Kopfzeile mit Titel, Kernaussage, Material und Zahl der Warnpunkte
# Kernaussagen je Thema, vorerst drei zur Ansicht
THEMA_KERN = {'Weichlöten': 'nur bleifreies Lot, Lötkolben höchstens 300 °C, Rauch absaugen',
              'Leinöl und ölgetränkte Lappen': 'getränkte Lappen können sich selbst entzünden, nie in den Kehricht',
              'Lasercutten': 'nur unter Aufsicht, kein PVC, Teflon oder Polyurethan'}
def zuklappen(m):
    kopf, inhalt = m.group(1), m.group(4)
    n = inhalt.count('<li class="verbot"')
    warn = ' · <img class="vb-z klein" data-icon="iso-W001.svg" alt=""> %d %s' % (n, 'Warnpunkt' if n == 1 else 'Warnpunkte') if n else ''
    return ('%s<details class="thema-d">\n<summary><h3>%s</h3><span class="t-meta">%s%s</span></summary>%s</details>\n</section>'
            % (kopf, m.group(2), (THEMA_KERN[m.group(2)] + ' · ' if m.group(2) in THEMA_KERN else '') + m.group(3), warn, inhalt))
body = re.sub(r'(<section class="thema" data-mat="[^"]+" id="[^"]+">\n)<h3>(.*?)</h3>\n<p class="mat">Material: (.*?)</p>(.*?)</section>', zuklappen, body, flags=re.S)

# Lernvideos je Verfahren zuklappen
def videos(m):
    n = m.group(1).count('<a ')
    return '<details class="videos"><summary>Lernvideos auf tud.ch (%d)</summary><p>Handarbeit ohne Maschine: %s</p></details>' % (n, m.group(1))
body = re.sub(r'<p class="videos"><span class="vlabel">Lernvideos auf tud\.ch:</span> (.*?)</p>', videos, body, flags=re.S)
# Quellen erst nach der Listenbearbeitung einsetzen, damit die Base64-Cover nicht durch die Regex laufen
# Begriffe ganz am Schluss, aber vor der Fusszeile
if '<footer' in quellen:
    i = quellen.index('<footer'); quellen = quellen[:i] + begriffe + '\n\n' + quellen[i:]
else:
    quellen = quellen + '\n' + begriffe
body = body.replace('@@QUELLEN@@', quellen.replace('<h2 id="quellen">', '<h2>', 1))
# Pfeil hinter Quellenlinks nicht vorlesen
body = body.replace('&nbsp;↗</a>', '<span aria-hidden="true">&nbsp;↗</span></a>')
body = body.replace('aria-haspopup="dialog">', 'aria-haspopup="dialog" aria-expanded="false">')
body = re.sub(r'<div class="b-bild" data-bild="([^"]+)"></div>', bild, body)
def icon(m):
    pfad = BILDER + m.group(2)
    return '<img class="%s" src="data:image/svg+xml;base64,%s" alt="%s">' % (m.group(1), base64.b64encode(open(pfad, 'rb').read()).decode(), m.group(3))
body = re.sub(r'<img class="([^"]+)" data-icon="([^"]+)" alt="([^"]*)">', icon, body)
body = re.sub(r'<image data-icon="([^"]+)"', lambda m: '<image href="data:image/svg+xml;base64,%s"' % base64.b64encode(open(BILDER + m.group(1), 'rb').read()).decode(), body)

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
