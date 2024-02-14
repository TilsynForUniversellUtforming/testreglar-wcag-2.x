Testregelformat
===============
Format for testreglar Tilsynet for universell utforming av ikt. 
## Testregel
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
 	<td>versjon</td>
 	<td>string</td>
 	<td>Kva versjon av testregelen det er snakk om.</td>
 	<td><pre lang="json">"versjon": "1.0"</pre></td>	
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
 	<td><pre lang="json">"type": "web"</pre></td>	 	 
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
	 <td>kravTilSamsvar</td>
	 <td>string[HTML]</td>
  	 <td>Definisjon av testregelen sitt krav til samsvar.</td>
         <td><pre lang="json">"kravTilSamsvar": "Visuelle overskrifter koda."</pre></td>	
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
	<tr>
		 <td>steg</td>
	 <td>Array[<a href="#steg">Steg</a>]</td>
  	 <td>Array med stega i testregelen.</td>
         <td><pre lang="json">"steg":[{"stegnr":"3.1"}]</pre></td>	
</tr>	 
</table>

Steg
----
Eit steg er kvar instruksjon i test-prosedyren. Eit steg kan vere av desse typane:
- [jaNei](#steg-av-typen-janei)
- [radio](#steg-av-typen-radio)
- [tekst](#steg-av-typen-tekst)
- [instruksjon](#steg-av-typen-instruksjon)


### Steg av typen jaNei
Steg som bare skal ha Ja og Nei som sine mulige valg.

<table>
	<tr>
        <th>Felt</th>
	<th>Type</th>
	<th>Obligatorisk</th>
	<th>Omtale</th>
	<th>Eksempel</th>
		</tr>
	 <tr>
 	<td>type</td>
	<td>"jaNei"</td>
	<td>Ja</td>
 	<td>Set stegtype til jaNei.</td>
 	<td><pre lang="json">"type": "jaNei"</pre></td>	
</tr>
 <tr>
 	<td>stegnr</td>
	<td>string</td>
	<td>Ja</td>
 	<td>Stegnummeret er ein identifikator for eit steg innanfor ein testregel. Den må
            være unik innanfor same testregel og skal vere på formatet «tal.tal»</td>
 	<td><pre lang="json">"stegnr": "3.1"</pre></td>	
</tr>
<tr>
 	<td>spm</td>
	<td>string</td>
	<td>Ja</td>
 	<td>Spørsmål som kan svarast på med Ja og Nei som alternativ.</td>
 	<td><pre lang="json">"spm": "Inneheld feilmeldinga tekst?"</pre></td>	
</tr>
<tr>
 	<td>ht</td>
	<td>string[HTML]</td>
	<td>Ja</td>
 	<td>Steget sin hjelpetekst</td>
 	<td><pre lang="json">"ht": "&lt;p&gt;Sjekk om feilmeldinga inneheld tekst.&lt;/p&gt;"</pre></td>	
</tr>
<tr>
 	<td>ruting</td>
	<td>[string, Handling]</td>
	<td>Ja</td>
 	<td>Steget sin <a href="#ruting">ruting.</a></td>
 	 <td><pre lang="json">"ruting": {
              "ja": {
                    "type": "gaaTil",
                    "steg": "3.3"
                },
               "nei": {
                    "type": "gaaTil",
                    "steg": "3.6"
                }
            }</pre></td>	
</tr>
<tr>
 	<td>kilde</td>
	<td>string</td>
	<td>Nei</td>
 	<td>Kilde er kva kjelder eit steg bygger på. Eit steg kan bygge på fleire
            kjelder.</td>
 	<td><pre lang="json">"kilde": ["G131", "G167", "H44"]</pre></td>	
</tr>
<tr>
 	<td>image</td>
	<td>string</td>
	<td>Nei</td>
 	<td>Valgfritt bilde som kan brukes til hjelp på steget</td>
 	<td><pre lang="json">"image": "/.jpg"</pre></td>	
</tr>
		
</table>

#### Eksempel på steg av typen jaNei
```json
{
	"stegnr": "3.6",
	"spm": "Er det meningsbærende bildet en test eller et sanseinntrykk?",
	"ht": "<p><strong>Test:</strong> Bilde som er en del av en test eller prøve, er bilde der innholdet vil bli ugyldig dersom det blir presentert som tekst. Hensikten med testen forsvinner dersom svaret gis av tekstalternativet </p>\n<p><strong>Merk:</strong> Hvis dette er et komplekst bilde, så testes det i steg 3.9.</p>\n<p><strong>Sanseinntrykk:</strong> Bilde som skal gi et sanseinntrykk er for eksempel et maleri eller andre typer kunst.</p>",
	"type": "jaNei",
	"ruting": {
		"ja": {
			"type": "gaaTil",
			"steg": "3.7"
			},
		"nei": {
			"type": "gaaTil",
			"steg": "3.8"
			}
		}
}
```

### Steg av typen radio
Steg med egendefinerte valg i form av radio-knapper.
<table>
	<tr>
        	<th>Felt</th>
		<th>Type</th>
		<th>Obligatorisk</th>
		<th>Omtale</th>
		<th>Eksempel</th>
	</tr>
	<tr>
 		<td>type</td>
		<td>"radio"</td>
		<td>Ja</td>
 		<td>Set stegtypen til radio.</td>
 		<td><pre lang="json">"type": "radio"</pre></td>	
       </tr>
 	<tr>
 		<td>stegnr</td>
		<td>string</td>
		<td>Ja</td>
 		<td>Stegnummeret er ein identifikator for eit steg innanfor ein testregel. Den må
            	være unik innanfor same testregel og skal vere på formatet «tal.tal»</td>
 		<td><pre lang="json">"stegnr": "3.1"</pre></td>	
	</tr>
	<tr>
 		<td>spm</td>
		<td>string</td>
		<td>Ja</td>
 		<td>Spørsmål som kan svarast på med radioknappar som alternativ.</td>
 		<td><pre lang="json">"spm": "Kva type funksjonalitet er elementet ein del av?"</pre></td>	
	</tr>
	<tr>
 		<td>ht</td>
		<td>string[HTML]</td>
		<td>Ja</td>
 		<td>Steget sin hjelpetekst</td>
 		<td><pre lang="json">"ht": "&lt;p&gt;Velg frå alternativa under.&lt;/p&gt;"</pre></td>	
	</tr>
		<tr>
 		<td>ruting</td>
		<td>[string, Handling]</td>
		<td>Ja</td>
 		<td>Steget sin <a href="#ruting">ruting.</a></td>
 	 <td><pre lang="json">"ruting": {
              "alt0": {
                    "type": "gaaTil",
                    "steg": "3.5"
                },
               "alt1": {
                    "type": "gaaTil",
                    "steg": "3.6"
                }
            }</pre></td>	
		</td>	
	</tr>
	<tr>
 		<td>svarArray</td>
		<td>Array[string]</td>
		<td>Ja</td>
 		<td>Liste med svar-alternativ for radio-knapper.</td>
 		<td><pre lang="json">"svarArray": ["Skjema","Mediaspelar","Meny"]</pre></td>	
	</tr>
	<tr>
 		<td>kilde</td>
		<td>string</td>
		<td>Nei</td>
 		<td>Kilde er kva kjelder eit steg bygger på. Eit steg kan bygge på fleire
            kjelder.</td>
 		<td><pre lang="json">"kilde": ["G131", "G167", "H44"]</pre></td>	
	</tr>
	<tr>
 		<td>image</td>
		<td>string</td>
		<td>Nei</td>
 		<td>Valgfritt bilde som kan brukes til hjelp på steget.</td>
 		<td><pre lang="json">"image": "/.jpg"</pre></td>	
	</tr>
		
</table>

#### Eksempel på steg av typen radio
```json
{
	"stegnr": "3.1",
	"spm": "Korleis er nettsida koda?",
	"ht": "<p>Du kan bruke kodeverktøyet i nettlesaren for å sjekke dette. Du finn det i <code>&lt;!DOCTYPE&gt;</code>-elementet, som er det første elementet i koden.</p>\n<ul>\n<li>HTML5 er koda som <code>&lt;!DOCTYPE html&gt;</code></li>\n<li>I HTML 4, står det \"HTML 4.01\" ein stad i <code>&lt;!DOCTYPE&gt;</code>-elementet.</li>\n<li>I XHTML 1.0, står det \"XHTML 1.0\" ein stad i <code>&lt;!DOCTYPE&gt;</code>-elementet.</li>\n<li>I XHTML 1.1, står det \"XHTML 1.1\" eller \"XHTML Basic 1.1\" ein stad i <code>&lt;!DOCTYPE&gt;</code>-elementet.</li>\n</ul>\n<p><strong>Merk:</strong> HTML-elementet kan innehalde annan tekst før avsluttande &gt; i elementet <code>&lt;!DOCTYPE&gt;</code>.</p>",
	"type": "radio",
	"ruting": {
		"alt0": {
			"type": "gaaTil",
			"steg": "3.2"
			},
		"alt1": {
			"type": "gaaTil",
			"steg": "3.2"
			},
		"alt2": {
			"type": "gaaTil",
			"steg": "3.3"
			},
		"alt3": {
			"type": "gaaTil",
			"steg": "3.4"
			},
		"alt4": {
			"type": "gaaTil",
			"steg": "3.3"
			}
		},
		"svarArray": [
			"HTML 5",
			"HTML 4",
			"XHTML 1.0",
			"XHTML 1.1",
			"Anna"
			]
}
```

### Steg av typen tekst
Steg med input i form av tekst eller tall.
<table>
	<tr>
        	<th>Felt</th>
		<th>Type</th>
		<th>Obligatorisk</th>
		<th>Omtale</th>
		<th>Eksempel</th>
	</tr>
	<tr>
 		<td>type</td>
		<td>"tekst"</td>
		<td>Ja</td>
 		<td>Set stegtypen til tekst.</td>
 		<td><pre lang="json">"type": "tekst"</pre></td>	
       </tr>
 	<tr>
 		<td>stegnr</td>
		<td>string</td>
		<td>Ja</td>
 		<td>Stegnummeret er ein identifikator for eit steg innanfor ein testregel. Den må
            	være unik innanfor same testregel og skal vere på formatet «tal.tal»</td>
 		<td><pre lang="json">"stegnr": "3.1"</pre></td>	
	</tr>
	<tr>
 		<td>spm</td>
		<td>string</td>
		<td>Ja</td>
 		<td>Spørsmål som kan svarast på i form av tekst eller tall.</td>
 		<td><pre lang="json">"spm": "Kva element testar du?"</pre></td>	
	</tr>
	<tr>
 		<td>ht</td>
		<td>string[HTML]</td>
		<td>Ja</td>
 		<td>Steget sin hjelpetekst</td>
 		<td><pre lang="json">"ht": "&lt;p&gt;Beskriv elementet.&lt;/p&gt;"</pre></td>	
	</tr>
		<tr>
 		<td>ruting</td>
		<td>[string, Handling]</td>
		<td>Ja</td>
 		<td>Steget sin <a href="#ruting">ruting.</a></td>
 	 <td><pre lang="json">"ruting": {
              "alle": {
                    "type": "gaaTil",
                    "steg": "3.3"
                }
            }</pre></td>	
		</td>	
	</tr>
	<tr>
 		<td>label</td>
		<td>string</td>
		<td>Ja</td>
 		<td>Label (Ledetekst) til tekstfeltet.</td>
 		<td><pre lang="json">"label": "Element:"</pre></td>	
	</tr>
	<tr>
 		<td>kilde</td>
		<td>string</td>
		<td>Nei</td>
 		<td>Kilde er kva kjelder eit steg bygger på. Eit steg kan bygge på fleire
            kjelder.</td>
 		<td><pre lang="json">"kilde": ["G131", "G167", "H44"]</pre></td>	
	</tr>
	<tr>
 		<td>image</td>
		<td>string</td>
		<td>Nei</td>
 		<td>Valgfritt bilde som kan brukes til hjelp på steget.</td>
 		<td><pre lang="json">"image": "/.jpg"</pre></td>	
	</tr>
 <tr>
 		<td>multilinje</td>
		<td>boolean</td>
		<td>Nei</td>
 		<td>Valgfritt parameter for om tekstfeltet skal gå over fleire linjer. Dersom den ikke er angitt vil den som standard vere sett til false.</td>
 		<td><pre lang="json">"multilinje": true</pre></td>	
	</tr>
 <tr>
 		<td>filter</td>
		<td>string</td>
		<td>Nei</td>
 		<td>Valgfritt filter på tekst-feltet.<ul>
			<li>tal - Tekstfeltet skal bare godta tall.</li>
		</ul>
		</td>
 		<td><pre lang="json">"filter": "tal"</pre></td>	
	</tr>
 <tr>
 		<td>datalist</td>
		<td>string</td>
		<td>Nei</td>
 		<td>Valgfritt felt for å koble på en datalist.<ul>
			<li>Sideutvalg - datalist med sideutvalg.</li>
		</ul></td>
 		<td><pre lang="json">"datalist": "Sideutvalg"</pre></td>	
	</tr>
		
</table>

#### Eksempel på steg av typen tekst
```json
{
	"stegnr": "3.7",
	"spm": "Hvor mange tilstander har brukergrensesnittkomponenten? ",
	"ht": "<p>Registrer antall tilstander.</p>\n<p>Eksempel: en avkryssingsboks kan ha to tilstander avkrysset eller ikke avkrysset</p>",
	"type": "tekst",
	"ruting": {
		"alle": {
			"type": "gaaTil",
			"steg": "3.8"
			}
		},
	"label": "Antall tilstander:",
	"filter": "tal"
}
```

### Steg av typen instruksjon
Steg med ein instruksjon som skal gjennomføres uten at det skal registeres data.
<table>
	<tr>
        	<th>Felt</th>
		<th>Type</th>
		<th>Obligatorisk</th>
		<th>Omtale</th>
		<th>Eksempel</th>
	</tr>
	<tr>
 		<td>type</td>
		<td>"instruksjon"</td>
		<td>Ja</td>
 		<td>Set stegtypen til instruksjon.</td>
 		<td><pre lang="json">"type": "instruksjon"</pre></td>	
       </tr>
 	<tr>
 		<td>stegnr</td>
		<td>string</td>
		<td>Ja</td>
 		<td>Stegnummeret er ein identifikator for eit steg innanfor ein testregel. Den må
            	være unik innanfor same testregel og skal vere på formatet «tal.tal»</td>
 		<td><pre lang="json">"stegnr": "3.1"</pre></td>	
	</tr>
	<tr>
 		<td>spm</td>
		<td>string</td>
		<td>Ja</td>
 		<td>Spørsmål som kan svarast på med radioknappar som alternativ.</td>
 		<td><pre lang="json">"spm": "Opne nettsida i eit nytt nettlesarvindauge."</pre></td>	
	</tr>
	<tr>
 		<td>ht</td>
		<td>string[HTML]</td>
		<td>Ja</td>
 		<td>Steget sin hjelpetekst</td>
 		<td><pre lang="json">"ht": "&lt;p&gt;Du kan holde ned CTRL-tasten og klikke (Windows).&lt;/p&gt;"</pre></td>	
	</tr>
		<tr>
 		<td>ruting</td>
		<td>[string, Handling]</td>
		<td>Ja</td>
 		<td>Steget sin <a href="#ruting">ruting.</a></td>
 	 <td><pre lang="json">"ruting": {
              "ja": {
                    "type": "gaaTil",
                    "steg": "3.3"
                },
               "nei": {
                    "type": "gaaTil",
                    "steg": "3.6"
                }
            }</pre></td>	
		</td>	
	</tr>
	<tr>
 		<td>kilde</td>
		<td>string</td>
		<td>Nei</td>
 		<td>Kilde er kva kjelder eit steg bygger på. Eit steg kan bygge på fleire
            kjelder.</td>
 		<td><pre lang="json">"kilde": ["G131", "G167", "H44"]</pre></td>	
	</tr>
	<tr>
 		<td>image</td>
		<td>string</td>
		<td>Nei</td>
 		<td>Valgfritt bilde som kan brukes til hjelp på steget.</td>
 		<td><pre lang="json">"image": "/.jpg"</pre></td>	
	</tr>
		
</table>


#### Eksempel på steg av typen instruksjon

```json
{
	"stegnr": "3.9",
	"spm": "Finn/identifiser elementet i koden.",
	"ht": "<p>Sjå i koden og finn det aktuelle elementet.</p><p>Elementet kan for eksempel vere koda som</p><ul><li>&#x3C;img&#x3E;</li><li>&#x3C;i&#x3E;</li><li>&#x3C;span&#x3E;</li><li>&#x3C;div&#x3E;</li></ul>",
	"type": "instruksjon",
	"kilde": [],
	"ruting": {
		"alle": {
			"type": "gaaTil",
			"steg": "3.10"
			}
		}
}
```


# Ruting
Ruting er logikk for kva som skjer etter svar. Ruting har fleire underetypar, som er nærare omtalt i dette kapitelet.
#### Eksempel
```json
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
```
### Typar Ruting triggere

En ruting kan bli trigga av:
-   [Alle](#ruting-alle)
-   [Ja/Nei](#ruting-ja-og-nei)
-   [Alternativ frå radioboks](#ruting-frå-radioboks)
-   [Reglar](https://github.com/TilsynForUniversellUtforming/Testregler-2.1/blob/master/Doc/Testregelformat/Rutingreglar.md)

### Ruting Alle
Ruting alle betyr at den valte rutinga skal nyttast ved alle svar. 
#### Eksempel
```json
"ruting": {
              "alle": {
                    "type": "gaaTil",
                    "steg": "3.3"
                }
            }
```
### Ruting Ja og nei
Ruting Ja og  Nei gjer ulik ruting for Ja og Nei spørsmål.
#### Eksempel
```json
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
```

### Ruting frå radioboks
Ved ruting frå radioboks vil rutinga vere basert på kva alternativ du vel. Dei ulike alternativa skal spesifiserast i matrisa "svarArray", og blir referert til frå 0 til tal alternativ (For eksempel "alt0" vil då vise til det fyrste elementet i matrisa)
#### Eksempel
```json
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
```


### Reglar for ruting
Det kan òg nyttast reglar til å gje ein meir kraftig ruting. [Meir om dei ulike ruting-reglane finn du her](https://github.com/TilsynForUniversellUtforming/Testregler-2.1/blob/master/Doc/Testregelformat/Rutingreglar.md).


## Delutfall
Delutfall er når du har behov får lage et mellombels resultat som du til slutt set saman til eit endeleg utfall. Dette er særleg aktuelt der det er mange måtar å oppfylle kravet på og alle skal verifiserast i same testregel. 

| Felt  | Type | Omtale | Eksempel |
|---|---|---|---|
|  nr     | number |  Unikt tal for delutfall. Dersom det samme talet brukes i flere etterfølgende steg skal delutfallet overskrives. |  <pre lang="json">"nr": 0</pre>|
|  fasit  | string | Fasit for delutfallet. {Ja, Nei,Ikkje testbart, Ikkje forekomst} |  <pre lang="json">"fasit": "Ja"</pre>|
|  tekst  | string | Innhald / tekstleg omtalte av delutfallet. | <pre lang="json">"tekst": "Bilde-CAPTCHA har ikkje alt-attributt."</pre>|

### Sette delutfall

Delutfall blir lagt til gjennom å legge til eit delutfall-objekt på rutingen.
```json
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
```

### Bruke delutfall

Når du skal skrive ut deleutfall brukes følgende syntaks #delutfall(nr,filter) eller #delutfal(nr).
- nr - Nummer på delutfallet
- filter - (frivillig parameter)  Kan settes til "Ja" eller "Nei", og betyr at delutfallet **bare skal skrives ut** dersom fasit på delutfallet matcher filteret. 


#### Eksempel på delutfall i utfall
```json
"utfall": "#delutfall(0) #delutfall(1) CAPTCHA i form av lyd, manglar tekstleg beskriving av formålet."
```

```json
"utfall": "Visuell tabelltittel er ikkje koda med &#x3C;caption&#x3E;. #delutfall(0,Nei)"
```

#### Bruke delutfall til å sette fasit

Ved å sette `"fasit": "sjekkDelutfall"` i ei ruting av typen "avslutt" kan du bruke fasit på delutfalla til å bestemme fasit. Alle delutfall med "Ja" og "Nei" blir då vurdert og fasit blir set til:
- "Ja" dersom alle delutfalla er "Ja"
- "Nei" dersom eit eller fleire delutfall har fasit "Nei".

#### Eksempel på delutfall til å sette fasit
```json
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
```
(c) 2018-2024 Tilsyn for universell utforming



