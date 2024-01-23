Testregelformat
===============
Generell info om testreglar
---------------------------

<table>
<tr>
	<th>Felt</th>
	<th>Type</th>
	<th>Omtale</th>
	<th>Eksempel</th>
</tr>
<tr>
 	<td>namn</td>
	<td>string</td>
 	<td>Namn på testregel.</td>
 	<td><pre lang="json">"namn": "1.1.1a Bilde har tekstalternativ"</pre></td>	
</tr>
 <tr>
 	<td>id</td>
	<td>string</td>
 	<td>Id er ein unik identifikator for kvar testregel.</td>
 	<td><pre lang="json">"id": "1.4.2a"</pre></td>	
</tr>
 <tr>
 	<td>testlabId</td>
	<td>number</td>
 	<td>TestlabId er ein unik id i tilsynets system for testing.</td>
 	<td><pre lang="json">"testlabId": 153</pre></td>	
</tr>
 <tr>
	 <td>type</td>
	 <td>string</td>
	 <td><p>Type er kategori av testregel. Dei aktuelle typane er: </p>
	 <ul>
		 <li>App</li>
		 <li>Automat</li>
		 <li>Dokument</li>
		 <li>Nett</li>
	 </ul>
 <td> 
	 
```json
"type": "web"
```

 </td>	
</tr>
</tr>
 <tr>
 <td>versjon</td>
 <td>string</td>
 <td>Kva versjon av testregelen det er snakk om.</td>
 <td><pre lang="json">"versjon": "1.0"</pre></td>	
</tr>
 <tr>
	 <td>spraak</td>
	 <td>string</td>
	 <td><p>Språket i testregelen (ISO 639-1).</p>
	<ul>
		 <li>nb - Bokmål</li>
		 <li>nn - Nynorsk</li>
		 <li>en - Engelsk.</li>
	</ul>
	 </td>
	 <td><pre lang="json">"spraak": "1.4.2a"</pre></td>	
</tr>
 <tr>
	 <td>side</td>
	 <td>string</td>
  	 <td>Referanse til kva steg (stegnr) som registerer informasjon om side.</td>
         <td><pre lang="json">"side": "2.1"</pre></td>	
</tr>
 <tr>
	 <td>element</td>
	 <td>string</td>
  	 <td>Referanse til kva steg (stegnr) som registerer informasjon om element. 
Dersom det er sida som er elementet skriv "Side"</td>
         <td><pre lang="json">"element": "2.1"</pre></td>	
</tr>
</table>

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


## Delutfall
Delutfall er når du har behov får lage et mellombels resultat som du til slutt set saman til eit endeleg utfall. Dette er særleg aktuelt der det er mange måtar å oppfylle kravet på og alle skal verifiserast i same testregel. 

| Felt |Omtale   | Eksempel |
|---|---|---|
|  nr |  Unikt tal for delutfall. Dersom det samme talet brukes i flere etterfølgende steg skal delutfallet overskrives. |  `"nr": 0`|
|  fasit | Fasit for delutfallet. {Ja, Nei,Ikkje testbart, Ikkje forekomst} |  `"fasit": "Ja"`|
|  tekst | Innhald / tekstleg omtalte av delutfallet. |  `"tekst": "Bilde-CAPTCHA har ikkje alt-attributt."`|

### Sette delutfall

Delutfall blir lagt til gjennom å legge til eit delutfall-objekt på rutingen.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
{
			"stegnr": "3.8",
			"spm": "Har bilde eit alt-attributt?",
			"ht": "Du kan nytte kodeverktøyet i nettlesaren til å sjekke dette.",
			"type": "jaNei",
			"kilde": [],
			"ruting": {
				"nei": {
					"type": "gaaTil",
					"steg": "3.13",
					"delutfall": {
						"nr": 0,
						"fasit": "Nei",
						"tekst": "CAPTCHA i form av bilde, manglar alt-attributt."
					}
				}
			}
		}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

### Bruke delutfall

Delutfalla blir brukt for å lage ferdige/fullstendige utfall. Delutfalle blir lagt til i utfallet ved å bruke #dellutfall(nr på delutfall), for eksempel `#delutfall(0)`. `#delutfall(0)` blir da erstatta av den faktiske teksten til delutfall 0.  

#### Eksempel på delutfall i utfall
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
"ruting": {
				"nei": {
					"type": "avslutt",
					"fasit": "Nei",
					"utfall": "#delutfall(0) #delutfall(1) CAPTCHA i form av lyd, manglar tekstleg beskriving av formålet."
				}
			}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#### Bruke delutfall til å sette fasit

Ved å sette `"fasit": "sjekkDelutfall"` i ei ruting av typen "avslutt" kan du bruke delutfalla til å bestemme fasit. Alle delutfall med "Ja" og "Nei" blir då vurdert og fasit blir set til:
- "Ja" dersom alle delutfalla er "Ja"
- "Nei" dersom eit eller fleire delutfall har fasit "Nei".

#### Eksempel på delutfall til å sette fasit
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
{
			"stegnr": "3.19",
			"spm": "Gir teksten saman med konteksten ein beskrivande identifikasjon av hensikten med CAPTCHAen?",
			"ht": "<p>Teksten skal identifisere at det handlar om ein test, kode eller utfordring for å verifisere at brukaren er eit menneske.</p><p>Kontekst kan for eksempel vere tekstalternativ i andre former for CAPTCHA, og nærliggande tekst.</p><p>Vi vurderer at berre ordet \"CAPTCHA\" ikkje er tilstrekkeleg.</p>",
			"type": "jaNei",
			"kilde": [],
			"ruting": {
				"ja": {
					"type": "avslutt",
					"fasit": "sjekkDelutfall",
					"utfall": {
						"nei": "#delutfall(0) #delutfall(1)",
						"ja": "CAPTCHA med fleire utformingar, har beskrivande tekstalternativ."
					}
				},
				"nei": {
					"type": "avslutt",
					"fasit": "Nei",
					"utfall": "#delutfall(0) #delutfall(1) CAPTCHA i form av lyd, manglar tekstleg beskriving av formålet."
				}
			}
		}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
(c) 2018-2024 Tilsyn for universell utforming



