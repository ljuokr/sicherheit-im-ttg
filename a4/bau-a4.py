# Baut das A4-Blatt «Sicherheit im TTG auf einen Blick»: a4/sicherheit-ttg-a4.html (druckfertig). Aufruf: python3 a4/bau-a4.py
import base64, re, os, io
import qrcode, qrcode.image.svg
HIER = os.path.dirname(os.path.abspath(__file__)) + '/'
PROJ = HIER + '../'
SEITE = 'https://ljuokr.github.io/sicherheit-im-ttg/sicherheit-im-ttg.html'

inhalt = open(PROJ + 'inhalt.html', encoding='utf-8').read()
font = re.search(r'@font-face\{[^}]*\}', inhalt).group(0)

def svg(name):
    d = base64.b64encode(open(PROJ + 'bau/bilder/' + name, 'rb').read()).decode()
    return 'data:image/svg+xml;base64,' + d

q = qrcode.make(SEITE, image_factory=qrcode.image.svg.SvgPathImage, box_size=10, border=0)
b = io.BytesIO(); q.save(b)
qr = 'data:image/svg+xml;base64,' + base64.b64encode(b.getvalue()).decode()

ALLE = [
    ('iso-M004.svg', 'Schutzbrille', 'an Maschinen und bei Spritzern, an der Bohrmaschine immer'),
    ('iso-P028.svg', 'Keine Handschuhe', 'an drehenden Maschinen, sie werden erfasst und eingezogen'),
    ('iso-M010.svg', 'Kleidung, Haare, Schmuck', 'eng anliegend, lange Haare binden, Schmuck ablegen'),
    ('iso-M008.svg', 'Geschlossene Schuhe', 'für Schülerinnen, Schüler und Lehrpersonen'),
    ('iso-M003.svg', 'Gehörschutz', 'an lauten Maschinen, ab 85 dB(A) verlangt ihn die Suva'),
    ('iso-P022.svg', 'Nicht essen und trinken', 'im Fachraum, Hände waschen vor Pausen und am Schluss'),
    ('iso-M017.svg', 'Wenig Staub', 'absaugen oder lüften, Atemschutz erst, wenn das nicht reicht'),
    ('iso-W001.svg', 'Maschinen nur nach Einführung', 'und mit Freigabe der Lehrperson'),
]
def ghs(*n): return '<span class="ghs">' + ''.join('<img src="%s" alt="">' % svg(x) for x in n) + '</span>'

def liste(xs): return '<ul>' + ''.join('<li>%s</li>' % x for x in xs) + '</ul>'

LP = [
    'Maschinen nach Zyklus freigeben wie auf dem bfu-Plakat: <b>A</b> selbstständig nach Einführung, <b>B</b> nur unter Aufsicht der Lehrperson, <b>C</b> nicht für Schülerinnen und Schüler.',
    'Erst einführen, dann arbeiten lassen. Laufend beaufsichtigen, eingreifen oder abbrechen, wenn nötig.',
    'Festhalten, welche Klasse wann an welcher Maschine instruiert wurde.',
    'Über Schlüsselschalter und Not-Aus Maschinen freigeben und zentral stoppen.',
    'Gefährliche Stoffe nie unbeaufsichtigt stehen lassen, auch nicht in der Pause.',
    'Mit Leinöl getränkte Lappen können sich selbst entzünden: ausgebreitet trocknen lassen, nie in den normalen Kehricht.',
]
SCHULE = [
    'Fachraumordnung mit Bekleidungs- und Verhaltensregeln, gemeinsam im Team getragen.',
    'FI-Schutzschalter 30 mA, Schlüsselschalter, Not-Aus, wirksame Absaugung.',
    'Elektroinstallation periodisch kontrollieren lassen, bei Schulhäusern alle 5 Jahre (NIV).',
    'Chemikalien-Ansprechperson bezeichnen, Chemikalienliste führen, Sicherheitsdatenblätter zugänglich.',
    'Gefährliche Stoffe abgeschlossen, höchstens 100 Liter brennbare Flüssigkeiten pro Fachraum im Sicherheitsschrank.',
    'Fachraum jährlich mit den bfu-Checklisten 4.323 prüfen, Notfallblatt halbjährlich.',
]
NOTFALL = [
    '<b>Augenspritzer:</b> sofort lange spülen, bei Säuren mindestens 15, bei Laugen 20 Minuten, dann ärztlich untersuchen lassen.',
    '<b>Verbrennung:</b> mindestens 10 Minuten mit fliessendem Wasser kühlen.',
    '<b>Stromunfall:</b> Person nicht berühren, zuerst Strom aus, dann 112.',
    '<b>Bereit im Raum:</b> Telefon, Notfallblatt, Erste-Hilfe-Kasten, Augendusche, Feuerlöscher, Löschdecke, freie Fluchtwege.',
]

picto = ''.join('<div class="p"><img src="%s" alt=""><div><b>%s</b><span>%s</span></div></div>' % (svg(f), t, x) for f, t, x in ALLE)

html = '''<!doctype html>
<html lang="de-CH"><head><meta charset="utf-8">
<title>Sicherheit im TTG auf einen Blick</title>
<style>%(font)s
@page{size:A4;margin:0}
*{box-sizing:border-box}
html,body{margin:0;background:#fff;color:#111}
body{font-family:"IBM Plex Sans","Helvetica Neue",Arial,sans-serif;font-size:9pt;line-height:1.38}
.blatt{width:210mm;height:297mm;padding:11mm 12mm 9mm;display:grid;grid-template-rows:auto auto 1fr auto auto auto;gap:4.5mm;margin:0 auto}
@media screen{body{background:#e9e9e6}.blatt{background:#fff;margin:8mm auto;box-shadow:0 1px 6px rgba(0,0,0,.15)}}
h1{font-size:19pt;line-height:1.1;margin:0;font-weight:600}
.kopf{display:flex;justify-content:space-between;align-items:end;border-bottom:2px solid #111;padding-bottom:2.5mm}
.kopf p{margin:1mm 0 0;color:#555}
.kopf .stand{text-align:right;color:#555;font-size:7.5pt}
h2{font-size:10.5pt;margin:0 0 2mm;font-weight:600;letter-spacing:.01em}
.tag{display:inline-block;font-size:7pt;font-weight:600;text-transform:uppercase;letter-spacing:.06em;background:#111;color:#fff;padding:.3mm 1.6mm;border-radius:1mm;margin-right:1.5mm;vertical-align:1px}
.alle{background:#f3f3f1;border-radius:2mm;padding:3.5mm 4mm}
.pgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:3mm 3.5mm}
.p{display:grid;grid-template-columns:10mm 1fr;gap:2mm;align-items:center}
.p img{width:10mm;height:10mm}
.p b{display:block;font-size:9pt}
.p span{display:block;color:#333}
.zwei{display:grid;grid-template-columns:1fr 1fr;gap:6mm}
ul{margin:0;padding-left:4mm}
li{margin:0 0 1.9mm}
.ampel{display:grid;grid-template-columns:auto 1fr 1fr 1fr;gap:2mm;align-items:stretch}
.ampel h2{align-self:center;margin:0 1mm 0 0;font-size:10pt}
.amp{border-radius:1.5mm;padding:2mm 2.6mm;font-size:8pt}
.amp b{display:block;font-size:8.8pt}
.ghs{display:flex;gap:1mm;margin-top:1.4mm}
.ghs img{width:8mm;height:8mm}
.g{background:#dcefdc}.y{background:#fbefc8}.r{background:#f6d9d6}
.notfall{border:2px solid #b3261e;border-radius:2mm;padding:3mm 4mm;display:grid;grid-template-columns:44mm 1fr;gap:5mm}
.notfall h2{color:#b3261e}
.nr{display:grid;grid-template-columns:auto 1fr;gap:.6mm 3mm;align-content:start;font-size:8.6pt}
.nr b{font-size:13pt;line-height:1.05}
.nr b.gross{font-size:22pt}
.nr span{align-self:center}
.fuss{display:grid;grid-template-columns:1fr auto;gap:5mm;align-items:end;border-top:1px solid #bbb;padding-top:2.5mm;font-size:7pt;color:#555}
.fuss p{margin:0 0 .8mm}
.fuss img{width:19mm;height:19mm;display:block}
.fuss .qr{text-align:center;font-size:6.5pt}
</style></head><body>
<main class="blatt">
<header class="kopf"><div><h1>Sicherheit im TTG auf einen Blick</h1><p>Das Wichtigste für Schülerinnen und Schüler, Lehrpersonen und Schulleitung</p></div><div class="stand">Stand November 2026<br>nach bfu, chemsuisse und Suva</div></header>

<section class="alle"><h2><span class="tag">alle</span>Im Fachraum gilt für alle</h2><div class="pgrid">%(picto)s</div></section>

<section class="zwei">
<div><h2><span class="tag">Lehrperson</span>Im Unterricht</h2>%(lp)s</div>
<div><h2><span class="tag">Schule</span>Schulleitung und Schulträger</h2>%(schule)s</div>
</section>

<section class="ampel"><h2>Stoffe:<br>Etikette lesen</h2>
<div class="amp g"><b>Einsetzen</b>ohne Gefahrenpiktogramm, z. B. Weissleim, Acryl- und Dispersionsfarben</div>
<div class="amp y"><b>Ersatz prüfen, sonst schützen</b>ätzend, hautsensibilisierend, giftig, extrem entzündbar, Verdacht auf Krebs%(gelb)s</div>
<div class="amp r"><b>Nicht verwenden</b>explosiv, akut stark giftig, krebserzeugend, erbgutverändernd, fortpflanzungsgefährdend%(rot)s</div>
</section>

<section class="notfall">
<div><h2>Im Notfall</h2><div class="nr"><b class="gross">112</b><span>Notruf</span><b>145</b><span>Tox Info Suisse, bei Vergiftung oder Verätzung</span></div></div>
<div>%(notfall)s</div>
</section>

<footer class="fuss"><div>
<p><b>Grundlagen:</b> bfu-Plakat 4.301 «Umgang mit Maschinen und Anlagen», bfu 2.524, 4.302 und 4.323, chemsuisse-Leitfaden TTG (2024), Suva-Checklisten, NIV, ChemG. Diese Übersicht ersetzt die Originale nicht, massgebend sind sie und die Vorgaben des Kantons.</p>
<p>Alle Regeln mit Begründung und Quelle: %(seite)s</p>
<p>Lukas Jordi, in Co-Autorschaft mit Claude (KI-Assistent von Anthropic). Lizenz CC BY-NC-SA 4.0, ausgenommen die Piktogramme nach ISO 7010 und GHS.</p>
</div><div class="qr"><img src="%(qr)s" alt="QR-Code zur Website">Website</div></footer>
</main></body></html>''' % dict(font=font, picto=picto, lp=liste(LP), schule=liste(SCHULE), notfall=liste(NOTFALL), seite=SEITE, qr=qr, gelb=ghs('ghs05-acid.svg','ghs07-exclam.svg','ghs06-skull.svg','ghs02-flamme.svg','ghs08-silhouette.svg'), rot=ghs('ghs01-explos.svg','ghs06-skull.svg','ghs08-silhouette.svg'))

open(HIER + 'sicherheit-ttg-a4.html', 'w', encoding='utf-8').write(html)
print('ok', len(html) // 1024, 'KB')
