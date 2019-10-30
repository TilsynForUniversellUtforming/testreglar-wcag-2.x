# Reglar for ruting

Reglar for ruting er reglar du kan nytte i ein testregel til å legge på vilkår for at ein ruting skal skje.

## Typar reglar
- Lik
- Ulik
- Mellom
- Tal Dersom

## Lik
Ein lik regel sjekkar om eit svar frå ein testregel er lik ein gitt verdi (sann) og utfører då ei handling.

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
Ein ruting regel som sjekkar om eit testregel-svar er mellom to gitte verdiar.

``` NB!  For å nytte mellom-regel må du sørge for at steget du hentar verdi frå kun lagar tal, ellers vil du risikere at rutinga ikkje fungerer.```

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
- "verdi" : tall   Den lågaste verdien det skal sjekkast mot
- "verdi2" :tall   Den høgaste verdien det skal sjekkast mot
- "handling" : ["Handling"] Kva handling som regelen, dersom verdien ligg mellom verdi1 og verdi2

