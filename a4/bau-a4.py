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
    ('iso-M004.svg', 'Schutzbrille', 'an der Bohrmaschine immer, sonst bei Spänen, Splittern und Spritzern'),
    ('iso-P028.svg', 'Keine Handschuhe', 'an drehenden Maschinen, sie werden erfasst und eingezogen'),
    ('iso-M010.svg', 'Kleidung, Haare, Schmuck', 'eng anliegend, lange Haare binden, Schmuck ablegen'),
    ('iso-M008.svg', 'Geschlossene Schuhe', 'auch für Lehrpersonen'),
    ('iso-M003.svg', 'Gehörschutz', 'an lauten Maschinen, ab 85&nbsp;dB(A) verlangt ihn die Suva'),
    ('iso-P022.svg', 'Nicht essen und trinken', 'im Fachraum, Hände waschen vor Pausen und am Schluss'),
    ('iso-M017.svg', 'Staub vermeiden', 'absaugen oder lüften, sonst Atemschutz'),
    ('iso-W001.svg', 'Maschinen erst nach Einführung', 'und mit Freigabe der Lehrperson, Schutzeinrichtungen nie entfernen'),
]
def ghs(*n): return '<span class="ghs">' + ''.join('<img src="%s" alt="">' % svg(x) for x in n) + '</span>'

def liste(xs): return '<ul>' + ''.join('<li>%s</li>' % x for x in xs) + '</ul>'

LP = [
    'Maschinen nach Zyklus freigeben wie auf dem bfu-Plakat: <b>A</b> selbstständig nach Einführung, <b>B</b> nur unter Aufsicht der Lehrperson, <b>C</b> nicht für Schülerinnen und Schüler.',
    'Erst einführen, dann arbeiten lassen. Laufend beaufsichtigen, eingreifen oder abbrechen, wenn nötig.',
    'Festhalten, welche Klasse wann an welcher Maschine instruiert wurde.',
    'Maschinen mit dem Schlüsselschalter freigeben und mit Not-Aus zentral stoppen.',
    'Gefährliche Stoffe nie unbeaufsichtigt stehen lassen, auch nicht in der Pause, und nie in Getränkeflaschen umfüllen.',
    'Mit Leinöl getränkte Lappen können sich selbst entzünden: nie lose in den Abfalleimer, zuerst 48 Stunden ausgebreitet trocknen lassen.',
]
SCHULE = [
    'Fachraum ausrüsten mit FI-Schutzschalter 30 mA, Schlüsselschalter, Not-Aus und wirksamer Absaugung.',
    'Fachraumordnung mit Bekleidungs- und Verhaltensregeln festlegen, vom Team gemeinsam getragen.',
    'Chemikalien-Ansprechperson bezeichnen, Chemikalienliste führen, Sicherheitsdatenblätter zugänglich.',
    'Gefährliche Stoffe abgeschlossen lagern. Brennbare Flüssigkeiten höchstens 100 Liter pro Fachraum in feuerhemmenden Schränken, an den Arbeitsplätzen höchstens 25 Liter.',
    'Fachraum mit den bfu-Checklisten 4.323 prüfen, je Punkt im dort empfohlenen Intervall. Notfallblatt halbjährlich überprüfen.',
    'Elektroinstallation periodisch kontrollieren lassen, bei Schulhäusern alle 5 Jahre (NIV).',
]
NOTFALL = [
    '<b>Augenspritzer:</b> sofort lange spülen, bei Säuren mindestens 15, bei Laugen 20 Minuten, dann ärztlich untersuchen lassen.',
    '<b>Verbrennung:</b> sofort mindestens 10 Minuten mit fliessendem Wasser kühlen.',
    '<b>Stromunfall:</b> Person nicht berühren, zuerst Stecker ziehen oder Sicherung ausschalten, dann 112. Danach immer ärztlich untersuchen lassen.',
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
body{font-family:"IBM Plex Sans","Helvetica Neue",Arial,sans-serif;font-size:8.8pt;line-height:1.33}
.blatt{width:210mm;height:297mm;padding:9mm 12mm 7mm;display:grid;grid-template-rows:auto auto auto auto 1fr auto;gap:3.6mm;margin:0 auto}
@media screen{body{background:#e9e9e6}.blatt{background:#fff;margin:8mm auto;box-shadow:0 1px 6px rgba(0,0,0,.15)}}
h1{font-size:21pt;line-height:1.1;margin:0;font-weight:600}
.kopf{display:flex;justify-content:space-between;align-items:end;border-bottom:2px solid #111;padding-bottom:2.5mm}
.kopf p{margin:1mm 0 0;color:#555}
.kopf .stand{text-align:right;color:#555;font-size:7.5pt}
h2{font-size:12pt;margin:0 0 2mm;font-weight:600;letter-spacing:.01em}
.tag{display:inline-block;font-size:7pt;font-weight:600;text-transform:uppercase;letter-spacing:.06em;background:#111;color:#fff;padding:.3mm 1.6mm;border-radius:1mm;margin-right:1.5mm;vertical-align:1px}
.alle{background:#f3f3f1;border-radius:2mm;padding:3mm 3.5mm}
.pgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:2.4mm 3mm}
.p{display:grid;grid-template-columns:11.5mm 1fr;gap:2.5mm;align-items:start}
.p img{width:11.5mm;height:11.5mm}
.p b{display:block;font-size:9pt;line-height:1.2}
.p span{display:block;color:#333;font-size:8.2pt;line-height:1.28}
.zwei{display:grid;grid-template-columns:1fr 1fr;gap:6mm}
ul{margin:0;padding-left:4mm}
li{margin:0 0 1.1mm}
.ampel{display:grid;grid-template-columns:1fr 1fr 1fr;gap:2mm;align-items:stretch}
.ampel h2{grid-column:1/-1;margin:0}
.amp{border-radius:1.5mm;padding:2mm 2.6mm;font-size:8.6pt;border-left:2mm solid}
.amp b{display:block;font-size:9.6pt}
.ghs{display:flex;gap:1mm;margin-top:1.4mm}
.ghs img{width:7mm;height:7mm}
.g{background:#e6f3e6;border-left-color:#2e7d32}.y{background:#fbefc8;border-left:2mm dashed #b8860b}.r{background:#efc4bf;border-left:2mm double #b3261e}
.notfall{border:1mm solid #b3261e;border-radius:2mm;padding:3mm 4mm;display:grid;grid-template-columns:48mm 1fr;gap:5mm;align-self:start}
.notfall h2{background:#b3261e;color:#fff;padding:1mm 2.5mm;border-radius:1mm;display:inline-block}
.nr{display:grid;grid-template-columns:auto 1fr;gap:.6mm 3mm;align-content:start;font-size:8.6pt}
.nr b{font-size:16pt;line-height:1.05}
.nr b.gross{font-size:26pt}
.nr span{align-self:center}
.fuss{display:grid;grid-template-columns:1fr auto;gap:5mm;align-items:end;border-top:1px solid #bbb;padding-top:2.5mm;font-size:7pt;color:#555}
.fuss p{margin:0 0 .8mm}
.fuss img{width:20mm;height:20mm;display:block}
.fuss .qr{text-align:center;font-size:6.5pt}
</style></head><body>
<main class="blatt">
<header class="kopf"><div><h1>Sicherheit im TTG auf einen Blick</h1><p>Das Wichtigste für Schülerinnen und Schüler, Lehrpersonen und Schulleitung</p></div><div class="stand">Stand November 2026<br>nach bfu, chemsuisse und Suva</div></header>

<section class="alle"><h2><span class="tag">alle</span>Im Fachraum gilt für alle</h2><div class="pgrid">%(picto)s</div></section>

<section class="zwei">
<div><h2><span class="tag">Lehrperson</span>Im Unterricht</h2>%(lp)s</div>
<div><h2><span class="tag">Schulleitung</span>Mit dem Schulträger</h2>%(schule)s</div>
</section>

<section class="ampel"><h2><span class="tag">Lehrperson</span>Stoffe: Etikette und H-Sätze lesen</h2>
<div class="amp g"><b>Einsetzen</b>ohne Gefahrenpiktogramm, z. B. Weissleim, Acryl- und Dispersionsfarben. Hinweise auf der Etikette trotzdem beachten.</div>
<div class="amp y"><b>Ersatz prüfen, sonst schützen</b>ätzend, hautsensibilisierend, giftig (Kategorie 3), extrem entzündbar, Verdacht auf Krebs, Erbgut- oder Fortpflanzungsschäden, organschädigend, atemwegssensibilisierend, sehr giftig für Wasserorganismen%(gelb)s</div>
<div class="amp r"><b>Nicht verwenden</b>explosiv, akut stark giftig (Kategorie 1 und 2), krebserzeugend, erbgutverändernd, fortpflanzungsgefährdend%(rot)s</div>
</section>

<section class="notfall">
<div><h2>Im Notfall</h2><div class="nr"><b class="gross">112</b><span>Notruf</span><b>145</b><span>Tox Info Suisse, bei Vergiftung oder Verätzung</span></div></div>
<div>%(notfall)s</div>
</section>

<footer class="fuss"><div>
<p><b>Grundlagen:</b> bfu-Plakat 4.301 «Umgang mit Maschinen und Anlagen», bfu 2.524, 4.302 und 4.323, chemsuisse-Leitfaden TTG (2024), Suva-Checklisten, NIV, ChemG. Diese Übersicht ersetzt die Originale nicht, massgebend sind sie und die Vorgaben des Kantons.</p>
<p>Alle Regeln mit Begründung und Quelle: %(seite)s</p>
<p>Lukas Jordi, in Co-Autorschaft mit Claude (KI-Assistent von Anthropic). Lizenz CC BY-NC-SA 4.0, ausgenommen die Piktogramme nach ISO 7010 und GHS.</p>
</div><div class="qr"><img src="%(qr)s" alt="QR-Code zur Website">Alle Regeln mit Quellen</div></footer>
</main></body></html>''' % dict(font=font, picto=picto, lp=liste(LP), schule=liste(SCHULE), notfall=liste(NOTFALL), seite=SEITE, qr=qr, gelb=ghs('ghs05-acid.svg','ghs07-exclam.svg','ghs06-skull.svg','ghs02-flamme.svg','ghs08-silhouette.svg','ghs09-pollu.svg'), rot=ghs('ghs01-explos.svg','ghs06-skull.svg','ghs08-silhouette.svg'))

open(HIER + 'sicherheit-ttg-a4.html', 'w', encoding='utf-8').write(html)
print('ok', len(html) // 1024, 'KB')
