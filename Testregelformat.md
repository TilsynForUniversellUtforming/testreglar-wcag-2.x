Under arbeid (!)  Innhaldet i dette dokumentet er under arbeid og kan endre seg uten forvarsel.


# Testregelformat
## Innhald i formatet
## Steg
Eit steg er kvar instruksjon i test-prosedyren. Den består av fleire underelement:
- stegnr - Identifikator for steget
- spm - Spørsmål / Instruksjon
- Ht - Hjelpetekst
- Type - Type steg
- Ruting

Dei ulike typane er forklart under.

### Stegnr
```
"stegnr": "3.1"
```
Stegnummeret er ein identifikator for eit steg innanfor ein testregel. Den må være unik innanfor same testregel og skal vere på formatetet «tall.tall»

### Spørsmål / Instruksjon

```
"spm": "Inneheld feilmeldinga tekst som identifiserer kvar feilen har oppstått?"
```
Spørsmål / Instruksjon forklarar kva testaren skal svare på eller gjere.

### Hjelpetekst
```
 "ht": "Feilmeldinga må innehalde informasjon som identifiserer skjemaelementet som feilutfylt.",
 ```

