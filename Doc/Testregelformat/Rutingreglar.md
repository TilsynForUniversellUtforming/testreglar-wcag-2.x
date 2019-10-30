# Reglar for ruting

Reglar for ruting er reglar du kan nytte i ein testregel for å legge på vilkår for at ein ruting skal skje. Ein regel skal alltid plasserast i ruting eller handling delen av eit steg. Ein ruting kan ha flere reglar og det er mogeleg å nøste reglar.

## Typar reglar
- [Lik](#lik)
- [Ulik](#ulik)
- [Mellom](#mellom)
- [Tal dersom](#tal-dersom)

## Lik
Ein lik regel sjekkar om eit svar frå eit Steg.svar er lik ein gitt verdi (sann) og utfører då ei handling.

### Eksempel
```Json
{ 
   "ruting":{ 
      "ja":{ 
         "type":"regler",
         "regler":{ 
            "1":{ 
               "sjekk":"3.12",
               "type":"lik",
               "verdi":"Ja",
               "handling":{ 
                  "type":"avslutt",
                  "fasit":"Ja",
                  "utfall":"CAPTCHA med fleire utformingar, har beskrivande tekstalternativ."
               }
            }
         }
      }
   }
}
```
### Parameter
Følgjande parameter må settast.
- "sjekk" : "steg-id"  Referanse til steg-id, der svar skal sjekkast.
- "type"  : "lik"     Spesifiserer at det er snakk om ein lik regel.
- "verdi" : "verdi"   Kva verdi regelen skal sjekke mot.
- "handling" : ["Handling"] Kva handling som regelen, dersom sann, skal uløyse.

## Ulik
Ein ulik regel går motsett veg av ein lik regel og utfører handlinga dersom den er usann.
### Eksempel
```Json
{ 
   "ruting":{ 
      "ja":{ 
         "type":"regler",
         "regler":{ 
            "1":{ 
               "sjekk":"3.12",
               "type":"ulik",
               "verdi":"Ja",
               "handling":{ 
                  "type":"avslutt",
                  "fasit":"Ja",
                  "utfall":"CAPTCHA med fleire utformingar, har beskrivande tekstalternativ."
               }
            }
         }
      }
   }
}
```
### Parameter
Følgjande parameter må settast.
- "sjekk" : "steg-id"  Referanse til steg-id, der svar skal sjekkast.
- "type"  : "ulik"     Spesifiserer at det er snakk om ein ulik regel.
- "verdi" : "verdi"   Kva verdi regelen skal sjekke mot.
- "handling" : ["Handling"] Kva handling som regelen, dersom sann, skal uløyse.

## Mellom
Ein ruting regel som sjekkar om eit Steg.svar er mellom to gitte verdiar.

``` NB! For å nytte mellom-regel må du sørge for at steget du hentar verdi frå berre lagar tal, dersom ikkje vil du risikere at rutinga ikkje fungerer.```

## Eksempel
```Json
{ 
   "ruting":{ 
      "alle":{ 
         "type":"regler",
         "regler":{ 
            "1":{ 
               "sjekk":"3.3",
               "type":"mellom",
               "verdi":0,
               "verdi2":2.99,
               "handling":{ 
                  "type":"gaaTil",
                  "steg":"3.7"
               }
            }
         }
      }
   }
}
```
### Parameter
Følgjande parameter må settast.
- "sjekk" : "steg-id"  Referanse til steg-id, der svar skal sjekkast.
- "type"  : "mellom"     Spesifiserer at det er snakk om ein "mellom"-regel.
- "verdi" : tall   Den lågaste verdien det skal sjekkast mot.
- "verdi2" :tall   Den høgaste verdien det skal sjekkast mot.
- "handling" : ["Handling"] Kva handling som regelen, dersom verdien ligg mellom verdi1 og verdi2.

## Tal dersom
Tal dersom sjekkar kor mange Steg.svar som samsvarar med ein gitt verdi.

### Eksempel
```Json
{ 
   "ruting":{ 
      "alle":{ 
         "type":"regler",
         "regler":{ 
            "1":{ 
               "sjekk":[ "3.2", "3.3", "3.4", "3.5"],
               "type":"talDersom",
               "verdi":"0",
               "mellom1":4,
               "mellom2":4,
               "handling":{ 
                  "type":"avslutt",
                  "fasit":"Ja",
                  "utfall":"Testsida har ikkje syntaksfeil."
               }
            }
         }
      }
   }
}
```

### Parameter
Følgjande parameter må settast.
- "sjekk" : ["steg-id1","steg-id2"] Matrise med steg-idar som som skal sjekkast-
- "type" : "talDersom" Spesifiserer at det er snakk om ein "tal dersom"-regel.
- "verdi" : Verdi som svar skal vere lik for å teljast med.
- "mellom1" :tal svar  Den lågaste verdien av tal svar som skal utløyse regelen.
- "mellom2" :tall svar Den høgaste veriden av tal svar som ska utløyse regelen.
- "handling" : ["Handling"] Kva handling som regelen, dersom tal steg med lik verdi er mellom "mellom1" og "mellom2"


# Eksempel med fleire ruting testreglar
```JSON
{ 
   "stegnr":"3.6",
   "spm":"Får du ein \"Fatal Error\" ved validering av nettsida?",
   "ht":"<p>Ein \"Fatal Error\" gjer at validatoren stoppar opp og ikkje får til å validere resten av koden på nettsida. \"Fatal Error\" kan for eksempel oppstå på grunn av script.</p><p>Det kan hende at det ligg fleire syntaksfeil etter ein \"Fatal Error\", men dei er ikkje mogleg å oppdage.</p>",
   "type":"jaNei",
   "kilde":["G134"],
   "ruting":{ 
      "alle":{ 
         "type":"regler",
         "regler":{ 
            "1":{ 
               "type":"talDersom",
               "sjekk":["3.2","3.3","3.4","3.5"],
               "verdi":"0",
               "mellom1":4,
               "mellom2":4,
               "handling":{ 
                  "type":"avslutt",
                  "fasit":"Ja",
                  "utfall":"Testsida har ikkje syntaksfeil."
               }
            },
            "2":{ 
               "type":"talDersom",
               "sjekk":["3.2","3.3","3.4","3.5"],
               "verdi":"0",
               "mellom1":0,
               "mellom2":3,
               "handling":{ 
                  "type":"avslutt",
                  "fasit":"Nei",
                  "utfall":"Testside med syntaksfeil av typen #delutfall(0)#delutfall(1)#delutfall(2)#delutfall(3)."
               }
            }
         }
      }
   }
}
```
