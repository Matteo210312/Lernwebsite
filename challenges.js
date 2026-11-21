const CHALLENGES=[
{id:'c1',area:'Programming',t:'Einfacher Taschenrechner',task:'Schreibe in Python oder JavaScript einen Taschenrechner für +, −, × und ÷.',goals:'Variablen, Funktionen, Eingaben.',crit:'Alle 4 Rechenarten funktionieren; Division durch 0 wird abgefangen; Code ist kommentiert.'},
{id:'c2',area:'Programming',t:'Kleine Website',task:'Baue eine Seite über dein Hobby mit HTML und CSS und veröffentliche sie mit GitHub Pages.',goals:'HTML, CSS, Git und GitHub.',crit:'Mindestens 3 Abschnitte; auf dem Handy gut lesbar; online erreichbar.'},
{id:'c3',area:'AI',t:'Prompt-Challenge',task:'Entwickle einen Prompt, der eine KI als Lerntrainer arbeiten lässt, und teste ihn dreimal.',goals:'Prompt Engineering.',crit:'Rolle, Ziel und Format sind genannt; Ergebnis wurde geprüft; Verbesserung dokumentiert.'},
{id:'c4',area:'Business',t:'Geschäftsmodell skizzieren',task:'Beschreibe eine fiktive Geschäftsidee mit Kunde, Problem, Einnahmen und Kosten.',goals:'Geschäftsmodelle, Marktdenken.',crit:'Echtes Problem benannt; Einnahmen größer als Kosten gezeigt; Konkurrenz genannt.'},
{id:'c5',area:'E-Commerce',t:'Dropshipping-Kalkulation',task:'Kalkuliere ein fiktives Produkt mit Einkauf, Versand, Werbung und Retouren.',goals:'Marge, Wirtschaftlichkeit.',crit:'Alle Kosten enthalten; Marge in Prozent berechnet; Annahmen erklärt.'},
{id:'c6',area:'Marketing',t:'Produktbeschreibung',task:'Schreibe eine Produktbeschreibung nach AIDA für ein fiktives Produkt.',goals:'Copywriting, Nutzen statt Eigenschaften.',crit:'Alle 4 AIDA-Schritte; Nutzen wird genannt; keine falschen Versprechen.'}
];
// Neue Challenges: [id, Bereich, Stufe, Titel, Aufgabe, Lernziele, Bewertung]. id eindeutig, später nie ändern!
[['m1','Mathe','Beginner','Prozent-Rechner','Schreibe ein Programm, das Rabatt und Endpreis berechnet.','Prozentrechnung, Variablen.','Ergebnis stimmt bei 3 Testfällen; Eingaben werden geprüft.'],
['m2','Mathe','Intermediate','Gleichungs-Löser','Programmiere einen Löser für ax + b = c und gib eine Probe aus.','Gleichungen, Funktionen.','a = 0 wird abgefangen; Probe stimmt.'],
['l1','Logik','Beginner','Wahrheitstabelle','Erstelle die Tabelle für (A UND B) ODER NICHT C von Hand und per Programm.','UND, ODER, NICHT.','Alle 8 Zeilen richtig; Hand und Programm stimmen überein.'],
['l2','Logik','Intermediate','Halbaddierer','Entwirf einen Halbaddierer aus XOR und UND und teste alle Eingaben.','Schaltlogik, Binärzahlen.','Tabelle vollständig; Schaltplan gezeichnet.'],
['h1','Hardware','Beginner','Bauteil-Steckbrief','Beschreibe Widerstand, LED und Taster mit Schaltzeichen, Aufgabe und Beispiel.','Bauteile, Schaltzeichen.','Symbole richtig; Funktion verständlich erklärt.'],
['h2','Hardware','Intermediate','Ampelschaltung','Plane eine Ampel mit 3 LEDs samt Vorwiderständen und Schaltplan.','Ohmsches Gesetz, Schaltplan.','Widerstände berechnet; Plan nachbaubar; nur Batterie oder USB verwendet.'],
['p1','Physik','Beginner','Geschwindigkeit messen','Miss 10 m Gehen mit der Stoppuhr und rechne v in m/s und km/h.','Größen, Einheiten.','Einheiten korrekt; Messung 3-mal wiederholt.'],
['p2','Physik','Intermediate','Fallversuch','Lass einen Ball aus 1 m fallen, miss die Zeit und vergleiche mit der Theorie.','Messen, Auswerten.','Messreihe dokumentiert; Abweichung begründet.'],
['d1','Deutsch','Beginner','Formelle E-Mail','Schreibe eine formelle E-Mail mit Betreff, Anrede, Hauptteil und Gruß.','Sachlich schreiben.','Aufbau vollständig; keine Umgangssprache; fehlerfrei.'],
['e1','Englisch','Beginner','Vokabeltrainer','Programmiere ein Quiz, das 10 Technik-Vokabeln abfragt.','Vokabeln, Programmieren.','10 Wörter; Antwort wird geprüft; Punktestand wird angezeigt.'],
['g1','Geographie','Beginner','Länder-Steckbrief','Erstelle einen Steckbrief mit Karte, Lage, Hauptstadt und Fläche.','Karten lesen.','Quellen genannt; Daten richtig; übersichtlich.'],
['k1','Konstruktion','Beginner','Gehäuse-Skizze','Zeichne ein Gehäuse für einen Mikrocontroller in zwei Ansichten mit Maßen.','Technisches Zeichnen.','Ansichten stimmen; Maße vollständig; Linienarten richtig.'],
['w1','Werkstoffe','Beginner','Materialvergleich','Vergleiche 3 Werkstoffe für ein Smartphone-Gehäuse in einer Tabelle.','Werkstoffeigenschaften.','3 Eigenschaften je Werkstoff; Empfehlung begründet.'],
['cc1','C','Beginner','Hello World in C','Schreibe, kompiliere und starte dein erstes C-Programm mit eigener Ausgabe.','Compiler, printf.','Programm läuft; Ausgabe selbst geändert.'],
['cc2','C','Intermediate','Primzahlen','Gib alle Primzahlen bis 100 aus.','Schleifen, Bedingungen.','Alle Primzahlen richtig; keine Duplikate.'],
['cc3','C','Advanced','Tauschen per Pointer','Schreibe eine Funktion, die zwei int-Werte per Pointer vertauscht.','Pointer, Funktionen.','Werte sind nach dem Aufruf getauscht; Code kommentiert.'],
['cc4','C','Expert','Dynamische Liste','Baue eine verkettete Liste mit malloc und gib den Speicher wieder frei.','Speicherverwaltung.','Kein Speicherleck; Einfügen und Ausgeben funktionieren.'],
['pr1','Programming','Advanced','Bankkonto-Klasse','Programmiere eine Klasse Konto mit Einzahlen, Abheben und Kontostand.','Objektorientierung.','Überziehen nicht möglich; Methoden getestet.'],
['pr2','Programming','Expert','Mini-Web-API','Baue eine kleine API, die To-do-Einträge speichert und ausgibt.','APIs, Datenbanken.','GET und POST funktionieren; Daten bleiben gespeichert.'],
['a1','AI','Intermediate','KI-Anwendungsfall','Beschreibe einen echten KI-Einsatz: Daten, Nutzen und Risiken.','AI verstehen.','Daten genannt; Risiken erklärt; Quelle angegeben.'],
['a2','AI','Advanced','Chatbot-Prototyp','Plane einen Chatbot für deine Klasse: Fragen, Antworten und Grenzen.','Prompt Engineering, Planung.','Zielgruppe klar; Beispiel-Dialoge; Grenzen genannt.']
].forEach(([id,area,lv,t,task,goals,crit])=>CHALLENGES.push({id,area,lv,t,task,goals,crit}));
