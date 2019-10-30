Testregelformat
===============

Innhald i formatet
------------------

Generell info om testreglar
---------------------------

- Id
-  Type
-  Versjon
-  SistOppdatertAvDifi 

## Id
```json
"id": "1.4.2a"
```
Id er ein unik identifikator for kvar testregel.

### Type

```json
"type": "web"
```

Type er kategori av testregel. Dei aktuelle typane er: 
- web 
- mobilapplikasjon
- automat

Steg
----

Eit steg er kvar instruksjon i test-prosedyren. Den består av fleire
underelement: 
- [stegnr](#stegnr)
- [spm](#spørsmål--instruksjon) 
- [ht - Hjelpetekst](#hjelpetekst)
- [type](#type) 
- [kilde](#kilde)
- [ruting](#ruting)

I tilegg finnes desse spesialfelta:
- label
- image
- svararray


Dei ulike typane er forklart under.

Eksempel på steg

```json
{
  "stegnr": "3.2",
  "spm": "Har skjemaelementet ein tekstleg identifikasjon i form av ledetekst, tekst på knapp eller instruksjon?",
   "ht": "Dersom det står ein knapp i direkte tilknyting til eit skjemafelt, og knappen skal brukast for å sende inn skjemaet, skal knappen beskrivande tekst.Knappen fungerer då som synleg ledetekst. Eksempel på slike skjema er: Melde på nyheitsbrev, globalt søk.</p>",
   "type": "jaNei",
   "kilde": ["G131", "G167", "H44"],
   "ruting": {
              "ja": {
                    "type": "gaaTil",
                    "steg": "3.3"
                },
               "nei": {
                    "type": "gaaTil",
                    "steg": "3.6"
                }
            }
}
```

### Stegnr

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
"stegnr": "3.1"
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Stegnummeret er ein identifikator for eit steg innanfor ein testregel. Den må
være unik innanfor same testregel og skal vere på formatet «tal.tal»

### Spørsmål / Instruksjon

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
"spm": "Inneheld feilmeldinga tekst som identifiserer kvar feilen har oppstått?"
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Spørsmål / instruksjon forklarar kva testaren skal svare på eller gjere.

### Hjelpetekst

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 "ht": "Feilmeldinga må innehalde informasjon som identifiserer skjemaelementet som feilutfylt."
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Hjelpetekst er støtte eller inneheld oppklarande informasjon til spørsmål /
instruksjon på eit steg.

### Type

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
"type": "jaNei"
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Type steg. Et steg kan vere av desse typane : 
- jaNei 
- radio 
- tekst 
- instruksjon

### Kilde

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
"kilde": ["G131", "G167", "H44"]
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Type: Array

Kilde er kva kjelder eit steg bygger på. Eit steg kan bygge på fleire
kjelder.

Ruting
------

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
"ruting": {
              "ja": {
                    "type": "gaaTil",
                    "steg": "3.3"
                },
               "nei": {
                    "type": "gaaTil",
                    "steg": "3.6"
                }
            }
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Ruting er logikk for kva som skjer etter svar. Ruting har fleire underetypar, som er nærare omtalt i dette kapitelet.


### Typar Ruting

"Ruting til" er det øverste nivået i en ruting. Den vanlege alternativa er  
-   [Alle](#ruting-alle)
-   [Ja/Nei](#ruting-ja-og-nei)
-   [Alternativ frå radioboks](#ruting-frå-radioboks)
-  [Reglar](https://github.com/TilsynForUniversellUtforming/Testregler-2.1/blob/master/Doc/Testregelformat/Rutingreglar.md).

### Ruting Alle
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
"ruting": {
              "alle": {
                    "type": "gaaTil",
                    "steg": "3.3"
                }
            }
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Ruting alle betyr at den valte rutinga skal nyttast ved alle svar. 

### Ruting Ja og nei
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
"ruting": {
              "ja": {
                    "type": "gaaTil",
                    "steg": "3.3"
                },
                "nei": {
                    "type": "gaaTil",
                    "steg": "3.8"
                }
            }
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Ruting Ja og  Nei gjer ulik ruting for Ja og Nei spørsmål.

### Ruting frå radioboks
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            "svarArray": ["1-5 tabsteg", "6-10 tabsteg", "Fleire enn 10 tabsteg", "Når ikkje mekanisme med tastatur"],
            "ruting": {
                "alt0": {
                    "type": "gaaTil",
                    "steg": "3.5"
                },
                "alt1": {
                    "type": "avslutt",
                    "fasit": "Nei",
                    "utfall": "Ved tastaturnavigasjon, krevst det meir enn fem tabsteg for å nå mekanisme for styring av lyd som startar automatisk på nettsida."
                },
                "alt2": {
                    "type": "avslutt",
                    "fasit": "Nei",
                    "utfall": "Ved tastaturnavigasjon, krevst det meir enn fem tabsteg for å nå mekanisme for styring av lyd som startar automatisk på nettsida."
                },
                "alt3": {
                    "type": "avslutt",
                    "fasit": "Nei",
                    "utfall": "Ved tastaturnavigasjon, er det ikkje mogleg å slå av eller regulere lyd som startar automatisk på nettsida."
                }
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Ved ruting frå radioboks vil rutinga vere basert på kva alternativ du vel. Dei ulike alternativa skal spesifiserast i matrisa "svarArray", og blir referert til frå 0 til tal alternativ (For eksempel "alt0" vil då vise til det fyrste elementet i matrisa)

### Reglar for ruting
Det kan òg nyttast reglar til å gje ein meir kraftig ruting. [Meir om dei ulike ruting-reglane finn du her](https://github.com/TilsynForUniversellUtforming/Testregler-2.1/blob/master/Doc/Testregelformat/Rutingreglar.md).



