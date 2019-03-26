Under arbeid (!)  Innhaldet i dette dokumentet er under arbeid og kan endre seg uten forvarsel.


# Testregelformat
## Innhald i formatet

## Generell info om testreglar
### Id
```
"id": "1.4.2a"
```
Id er ein unik indetifikator for kvar testregel.  


### Type
```
"type": "web"
```
Type er kategori av testregel. Dei aktuelle typane er:
- web
- mobilapplikasjon

## Steg
Eit steg er kvar instruksjon i test-prosedyren. Den består av fleire underelement:
- stegnr - Identifikator for steget
- spm - Spørsmål / Instruksjon
- Ht - Hjelpetekst
- Type - Type steg
- Ruting

Dei ulike typane er forklart under.

Eksempel på steg
```
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
```
"stegnr": "3.1"
```
Stegnummeret er ein identifikator for eit steg innanfor ein testregel. Den må være unik innanfor same testregel og skal vere på formatet «tall.tall»

### Spørsmål / Instruksjon

```
"spm": "Inneheld feilmeldinga tekst som identifiserer kvar feilen har oppstått?"
```
Spørsmål / Instruksjon forklarar kva testaren skal svare på eller gjere.

### Hjelpetekst
```
 "ht": "Feilmeldinga må innehalde informasjon som identifiserer skjemaelementet som feilutfylt."
```
Hjelpetekst er støtte eller innheld oppklarande informasjon til Spørsmål / Instruksjon på eit steg

### Type 
```
"type": "jaNei"
```
Type steg. Et steg kan vere av desse typane :
- jaNei 
- radio
- tekst

### Kilde
```
"kilde": ["G131", "G167", "H44"]
```
Type: Array

Kilde er kva dokumentasjon eit steg bygger på. Eit steg kan bygge på fleire krav.

## Ruting
```
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
Ruting er logikk for kva som skjer etter svar. Ruting har flere underetyper.

### Ruting til
Ruting til er det øverste nivået i en ruting. Den vanlige alternativene er 
- Alle (Ruting unansett svar)
- Ja 
- Nei
- [Alternativ fra radioboks]


