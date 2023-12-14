# 3.3.3 Forslag ved feil

## Om suksesskriteriet
- **Kravet gjelder for:** Nettsteder, apper og dokumenter
- **Lenke til kravet på norsk:** https://www.w3.org/Translations/WCAG21-no/#error-suggestion 
- **Forståartikkel:** https://www.w3.org/WAI/WCAG21/Understanding/error-suggestion.html 
- **Tolkning sist oppdatert:** dd.mm.åååå

### Formål
Hensikten med kravet er at brukeren skal få hjelp gjennom forslag til å korrigere feil, når inndatafeil oppdages automatisk. 

### Brukerbehov
- Personer med nedsatt kognisjon
- Personer som er blinde eller har nedsatt syn
- Personer med nedsatt motorikk

## Tolkning av suksesskriteriet
### Tilsynets tolkning
Suksesskriteriet gjelder kun i situasjoner der inndatafeil blir oppdaget automatisk. Etter ordlyden skal forslag til hvordan inndatafeil kan rettes presenteres for brukeren
Forutsetningen er etter ordlyden videre at det finnes en kjent måte å korrigere feilen på, for eksempel format eller verdi, som for eksempel gyldig format for e-post eller verdiene 1-12 for måneder

Etter ordlyden er det unntak dersom forslag til feilretting er en risiko for sikkerheten eller formålet med det aktuelle innholdet, for eksempel et passord eller svar i en quiz.
Det er ikke spesifisert nærmere hva «oppdages automatisk» betyr. Etter tilsynets tolkning innebærer det at innholdet er programmert på en måte som avdekker feil inndata, uten at brukeren er involvert.

Begrepet Inndatafeil er definert i WCAGs ordliste, og ifølge definisjonen er «inndatafeil informasjon angitt av brukeren, som ikke godkjennes.» Videre er det presisert i merknaden til definisjonen at inndatafeil blant annet inkluderer to situasjoner

-	informasjon som nettsiden krever, men som brukeren har utelatt 
-	informasjon som er gitt i feil dataformat eller med feil verdi. Eksempel på inndatafeil med feil format eller feil verdi er
  - Postnummer som inneholder bokstaver
  - Navn som inneholder tall eller spesialtegn
  - Ugyldig e-postformat
  -	Ugyldig datoformat
  -	Data utenfor grenseverdi 

Forståartikkelen viser til teknikker for tre ulike situasjoner: 
-	Situasjon A: Brukeren har ikke fylt ut obligatoriske inndatafelt 
-	Situasjon B: Inndatafeltet krever et bestemt dataformat
-	Situasjon C: Brukeren har fylt ut informasjon med feil format eller verdi. 
Ifølge forståartikkelen, kan forslaget til retting av feil enten gis av innholdsprodusenten eller av brukeragenten, basert på programmatisk bestemt informasjon. 

Forslag til retting av feil kan ifølge forståartikkelen for eksempel være: 
- forslag om rett stavemåte eller rett format
-	forslag om tilsvarende tekst 
-	beskrivelse av eller liste over hva som er rett inndata
-	et spørsmål på formen «Mente du…?» eller tilsvarende

Forslag til retting kan etter teknikk G177 vises i form av tekst på flere måter, for eksempel

-	i et modalvindu
-	i ledeteksten til skjemaelementet, 
-	annet sted i skjemaet eller på nettsiden, for eksempel på toppen

Forslag til retting skal være tydelig og det skal være enkelt for brukeren å navigere til forslaget, jamfør teknikkene G48 og G85. Det er ikke nok å identifisere forslaget med for eksempel bare med et symbol i ledeteksten, bare med å endre farge eller bare visuell plassering av forslaget.

Informasjon som brukeren har lagt inn, skal som hovedregel bli liggende i skjemaet, til tross for at det er avdekket en inndatafeil. 
Dette gjelder med mindre informasjonen er knyttet til personvern eller sikkerhet, som for eksempel et passord. Dette bygger på at formålet med suksesskriteriet er å hjelpe brukeren å fylle ut skjemaet riktig, samt teknikkene G83, G84 og G85. 

Det er flere måter å oppfylle kravet på.

#### Krav til samsvar

-	For alle inndataelement der inndatafeil blir oppdaget automatisk, og det finnes kjente forslag til retting, får brukeren et forslag som gir tilstrekkelig informasjon om hvordan feil kan rettes og
-	Forslaget er kodet som tekst og 
-	Det er enkelt for brukeren å navigere til feilen og
-	Informasjonen blir liggende i skjemaet, med mindre informasjonen er knyttet til personvern eller sikkerhet

#### Kommentar
(Tekst)

## Forholdet til EN 301 549
**Referanse til kravet i EN 301 549**: 9.3.3.3, 10.3.3.3 og 11.3.3.3

**Brukerbehov (funksjonell ytelsesevne)**
Primær relasjon: 
-	Bruk uten syn 
-	Bruk med nedsatt syn 
-	Bruk med nedsatt kognisjon

Sekundær relasjon: 
-	Bruk uten taleevne 
-	Bruk med nedsatt bevegelighet eller styrke

