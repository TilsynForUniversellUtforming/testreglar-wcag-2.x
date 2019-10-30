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
- "sjekk" : "StegId"  Referanse til steg-id, der svar skal sjekkast.
- "type"  : "Lik"     Spesifiserer at det er snakk om ein lik regel.
- "verdi" : "Verdi"   Kva verdi regelen skal sjekke mot.
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
- "sjekk" : "StegId"  Referanse til steg-id, der svar skal sjekkast.
- "type"  : "Lik"     Spesifiserer at det er snakk om ein lik regel.
- "verdi" : "Verdi"   Kva verdi regelen skal sjekke mot.
- "handling" : ["Handling"] Kva handling som regelen, dersom sann, skal uløyse.
