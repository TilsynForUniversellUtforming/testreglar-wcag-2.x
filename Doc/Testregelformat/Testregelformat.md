Testregelformat
===============
Generell info om testreglar
---------------------------

- Namn
- Id
- TestlabId
- Type
- Versjon
- Språk
- Side
- Element

## Namn
Namn på testregel.
### Eksempel
```json
"namn": "1.1.1a Bilde har tekstalternativ"
```
## Id
Id er ein unik identifikator for kvar testregel.
### Eksempel
```json
"id": "1.4.2a"
```

## TestlabId
TestlabId er ein unik id i tilsynets system for testing.
### Eksempel
```json
"testlabId": 153
```

## Type
Type er kategori av testregel. Dei aktuelle typane er: 
- App
- Automat
- Dokument
- Nett
### Eksempel

```json
"type": "web"
```

## Versjon
Kva versjon av testregelen det er snakk om.
### Eksempel
```json
"versjon": "1.0"
```

## Språk
Språket i testregelen (ISO 639-1).
- nb - Bokmål
- nn - Nynorsk
- en - Engelsk
### Eksempel
```json
"spraak" : "nn"
```

## Side
Referanse til kva steg (stegnr) som registerer informasjon om side.
### Eksempel
```json
"side": "2.1"
```

## Element
Referanse til kva steg (stegnr) som registerer informasjon om element. 
Dersom det er sida som er elementet skriv "Side"
### Eksempel
```json
"element": "2.1"
```

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
Stegnummeret er ein identifikator for eit steg innanfor ein testregel. Den må
være unik innanfor same testregel og skal vere på formatet «tal.tal»
#### Eksempel
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
"stegnr": "3.1"
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

#### Ekstra eigenskapar for type tekst
##### Multilinje
Type: boolean

Set om eit tekstfelt skal gå over fleire linjer. Dersom den ikke er angitt vil den som standard vere sett til false.
~~~~~~~~~~~~~~~~~~
"multilinje": true
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
##### Filter
Type: string

Set tekstfeltet til eit bestemt filter.
| Verdi |Omtale   | Eksempel |
|---|---|---|
|  tal |  Tekstfelt skal berre akseptere tal. |  `"filter": "tall"`|

##### datalist
Type: string
| Verdi |Omtale   | Eksempel |
|---|---|---|
|  Sideutvalg |  Tekstfeltet skal ha autocomplete på sideutvalg. |  `"datalist": "Sideutvalg"`|

### Kilde

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
"kilde": ["G131", "G167", "H44"]
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Type: Array

Kilde er kva kjelder eit steg bygger på. Eit steg kan bygge på fleire
kjelder.

### Ruting
Ruting er logikk for kva som skjer etter svar. Ruting har fleire underetypar, som er nærare omtalt i dette kapitelet.
#### Eksempel
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
### Typar Ruting

"Ruting til" er det øverste nivået i en ruting. Den vanlege alternativa er  
-   [Alle](#ruting-alle)
-   [Ja/Nei](#ruting-ja-og-nei)
-   [Alternativ frå radioboks](#ruting-frå-radioboks)
-  [Reglar](https://github.com/TilsynForUniversellUtforming/Testregler-2.1/blob/master/Doc/Testregelformat/Rutingreglar.md).

### Ruting Alle
Ruting alle betyr at den valte rutinga skal nyttast ved alle svar. 
#### Eksempel
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
"ruting": {
              "alle": {
                    "type": "gaaTil",
                    "steg": "3.3"
                }
            }
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
### Ruting Ja og nei
Ruting Ja og  Nei gjer ulik ruting for Ja og Nei spørsmål.
#### Eksempel
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

### Ruting frå radioboks
Ved ruting frå radioboks vil rutinga vere basert på kva alternativ du vel. Dei ulike alternativa skal spesifiserast i matrisa "svarArray", og blir referert til frå 0 til tal alternativ (For eksempel "alt0" vil då vise til det fyrste elementet i matrisa)
#### Eksempel
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
            }
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


### Reglar for ruting
Det kan òg nyttast reglar til å gje ein meir kraftig ruting. [Meir om dei ulike ruting-reglane finn du her](https://github.com/TilsynForUniversellUtforming/Testregler-2.1/blob/master/Doc/Testregelformat/Rutingreglar.md).


(c) 2018-2023 Tilsyn for universell utforming



