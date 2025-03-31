import * as fs from "fs";
import * as path from "path";
import * as glob from "glob";
import { Testregel } from "../src/interface/Testregel";
import { Steg } from "../src/interface/Steg";
import { Regel } from "../src/interface/Regel";
import { Handling } from "../src/interface/Handling";
import { Delutfall } from "../src/interface/Delutfall";

// Få listen over JSON-filer rekursivt i mappen
const dataFolder = "./Testreglar";
const excludeFolder: string = "felles/**";
const files = glob.sync("**/*.json", {
  cwd: dataFolder,
  ignore: [excludeFolder],
});

test("Sjekker at Testregelmappe finnes", () => {
  expect(fs.existsSync("./Testreglar")).toBe(true);
});

// Iterer gjennom hver JSON-fil
files.forEach((file) => {
  const filePath = path.join(dataFolder, file);
  const testregel: Testregel = JSON.parse(fs.readFileSync(filePath, "utf8"));

  // Lag tester for hver JSON-fil
  test(`${file} har definert eit namn`, () => {
    expect(testregel.namn).toBeDefined();
  });

  test(`${file} har definert ein id`, () => {
    expect(testregel.id).toBeDefined();
    expect(testregel.id.length).toBeGreaterThan(0);
  });

  test(`${file} har testregel.id som filnamn`, () => {
    expect(path.basename(file).replace(".json", "")).toEqual(testregel.id);
  });

  test(`${file} har definert ein testlab-id`, () => {
    expect(testregel.testlabId).toBeDefined();
    expect(testregel.testlabId).toBeGreaterThan(0);
  });

  test(`${file} har definert ein gyldig type`, () => {
    expect(testregel.type).toBeDefined();
    expect(testregel.type).toMatch(/(App|Automat|Nett|Dokument)/i);
  });

  test(`${file} har definert eit gyldig språk`, () => {
    expect(testregel.spraak).toBeDefined();
    expect(testregel.spraak).toMatch(/(nb|nn|en)/i);
  });

  test(`${file} har eit krav til samsvar`, () => {
    expect(testregel.kravTilSamsvar.length).toBeGreaterThan(0);
  });

  test(`${file} har definert gyldig steg for side`, () => {
    expect(testregel.side.length).toBeGreaterThan(0);
    expect(stegFinst(testregel.side, testregel.steg)).toBe(true);
  });

  test(`${file} har definert gyldig steg element`, () => {
    expect(testregel.element.length).toBeGreaterThan(0);
    if (testregel.element !== "Side") {
      expect(stegFinst(testregel.element, testregel.steg)).toBe(true);
    }
  });

  test(`${file} har steg`, () => {
    expect(testregel.steg).toBeDefined();
    expect(testregel.steg.length).toBeGreaterThan(1);
  });

  testregel.steg.forEach((steg: Steg) => {
    test(`${file} har gyldig steg ${steg.stegnr}`, () => {
      /** Sjekker at stegnr er lengre enn null */
      expect(steg.stegnr.length).toBeGreaterThan(0);
      /** Sjekker at steg-nr er et gyldig tall */
      expect(isNaN(parseFloat(steg.stegnr))).toBeFalsy();
      expect(steg.spm.length).toBeGreaterThan(0);
      expect(steg.ht).toBeDefined();
      // Forventer at hjelpeteksten IKKE har tomme avsnitt på slutten (<p> </p>)
      expect(steg.ht).not.toMatch(/<p> <\/p>$/);
      // Forventer at hjelpetekst ikke skal ha javascript-kode
      expect(steg.ht.includes("javascript:")).toBeFalsy();
      expect(steg.type).toBeDefined();
      expect(steg.type).toMatch(/(jaNei|radio|tekst|instruksjon)/i);

      if (typeof steg.kilde !== "undefined") {
        expect(typeof steg.kilde).toEqual("object");
      }

      if (steg.type === "tekst") {
        expect(steg.label).toBeDefined();
        expect(steg.label?.length).toBeGreaterThan(0);
        if (typeof steg.filter !== "undefined") {
          expect(steg.filter).toMatch(/(tal)/i);
        }

        if (typeof steg.datalist !== "undefined") {
          expect(steg.datalist).toMatch(/(side)/i);
        }
      }

      if (steg.type === "radio") {
        expect(steg.svarArray).toBeDefined();
        expect(steg.svarArray?.length).toBeGreaterThan(1);
      }
    });

    test(`${file} har gyldig ruting på steg ${steg.stegnr}`, () => {
      expect(Object.keys(steg.ruting).length).toBeGreaterThan(0);

      Object.entries(steg.ruting).forEach((ruting: [string, Handling]) => {
        const rutingTrigger = ruting[0];
        expect(rutingTrigger).toMatch(
          /(ja|nei|alle|alt0|alt1|alt2|alt3|alt4|alt5|alt5|alt6|alt7|alt8|alt9|alt10|alt11|alt12)/i
        );

        const handling: Handling = ruting[1];
        expect(handling.type).toMatch(
          /(gaaTil|regler|avslutt|ikkjeForekomst)/i
        );
        if (handling.type === "gaaTil") {
          expect(handling.steg).toBeDefined;
          if (typeof handling.steg !== "undefined") {
            // Sjekker at steget finnes
            expect(stegFinst(handling.steg, testregel.steg)).toBe(true);
            // Sjekker at det blir referert til et steg lengre fremme
            expect(stegnrErStorreEnn(handling.steg, steg.stegnr)).toBeTruthy();
            if (typeof handling.delutfall !== "undefined") {
              vurderDelutfall(handling.delutfall);
            }
          }
        } else if (handling.type === "regler") {
          expect(handling.regler).toBeDefined();
          expect(handling.regler).toBeInstanceOf(Object);
          if (typeof handling.regler === "object") {
            expect(Object.keys(handling.regler).length).toBeGreaterThan(0);
            vurderRegel(handling.regler, testregel.steg, steg);
          }
        } else if (handling.type === "avslutt") {
          vurderRutingAvslutt(handling);
        } else if (handling.type === "ikkjeForekomst") {
          vurderRutingIkkjeForekomst(handling);
        }
      });
    });
  });
});

/**
 * Vurderar reglar
 * @param reglar Reglar
 * @param testregelSteg Steg i testregel
 */
function vurderRegel(
  reglar: { [regelId: string]: Regel },
  testregelSteg: Array<Steg>,
  steg: Steg
) {
  expect(reglar).toBeDefined;
  const reglarArray: Array<Regel> = Object.values(reglar);
  expect(reglarArray.length).toBeGreaterThan(0);
  reglarArray.forEach((regel: Regel) => {
    expect(regel.type).toBeDefined();
    expect(regel.type).toMatch(/(lik|ulik|mellom|talDersom|vurderDelutfall)/i);
    expect(regel.handling).toBeDefined();
    expect(regel.handling.type).toBeDefined();
    expect(regel.handling.type).toMatch(
      /(gaaTil|regler|avslutt|ikkjeForekomst)/i
    );

    if (regel.type === "lik" || regel.type === "ulik") {
      expect(typeof regel.sjekk).toBe("string");
      expect(regel.sjekk?.length).toBeGreaterThan(0);
      expect(typeof regel.verdi).toBe("string");
      expect(regel.verdi?.length).toBeGreaterThan(0);
    }

    if (regel.type === "mellom") {
      expect(typeof regel.sjekk).toBe("string");
      expect(regel.sjekk?.length).toBeGreaterThan(0);
      expect(typeof regel.verdi).toBe("number");
      expect(typeof regel.verdi2).toBe("number");
    }

    if (regel.type === "talDersom") {
      expect(Array.isArray(regel.sjekk)).toBe(true);
      expect(regel.sjekk?.length).toBeGreaterThan(0);
      expect(typeof regel.verdi).toBe("string");
      expect(regel.verdi?.length).toBeGreaterThan(0);
      expect(typeof regel.mellom1).toBe("number");
      expect(regel.mellom1).toBeGreaterThanOrEqual(0);
      expect(typeof regel.mellom2).toBe("number");
      expect(regel.mellom2).toBeGreaterThanOrEqual(0);
    }

    if (regel.type === "vurderDelutfall") {
      expect(typeof regel.id).toBe("number");
      expect(typeof regel.verdi).toBe("string");
      expect(regel.verdi).toMatch(/(Ja|Nei|Ikkje testbart|Ikkje forekomst)/i);

    }

    if (regel.handling.type === "gaaTil") {
      expect(regel.handling.steg).toBeDefined();
      if (typeof regel.handling.steg !== "undefined") {
        expect(regel.handling.steg.length).toBeGreaterThan(0);
        expect(stegFinst(regel.handling.steg, testregelSteg)).toBe(true);
        // Sjekker at det blir referert til et steg lengre fremme
        expect(stegnrErStorreEnn(regel.handling.steg, steg.stegnr)).toBeTruthy();
        if (typeof regel.handling.delutfall !== "undefined") {
          vurderDelutfall(regel.handling.delutfall);
        }
      }
    } else if (regel.handling.type === "regler") {
      expect(regel.handling.regler).toBeDefined();
      if (typeof regel.handling.regler === "object") {
        vurderRegel(regel.handling.regler, testregelSteg, steg);
      }
    } else if (regel.handling.type === "avslutt") {
      vurderRutingAvslutt(regel.handling);
    } else if (regel.handling.type === "ikkjeForekomst") {
      vurderRutingIkkjeForekomst(regel.handling);
    }
  });
}

/**
 *
 * @param stegnr Stegnr som skal sjekkast
 * @param TestregelSteg Samling med testregelsteg
 * @returns Om steget finnes
 */
function stegFinst(stegnr: string, TestregelSteg: Array<Steg>) {
  let stegFinst: boolean = false;
  TestregelSteg.forEach((steg: Steg) => {
    if (steg.stegnr === stegnr) {
      stegFinst = true;
    }
  });
  return stegFinst;
}

/**
 * Sjekker ruting av typen avslutt
 * @param rutningAvslutt  Ruting av typen avslutt
 */
function vurderRutingAvslutt(rutningAvslutt) {
  expect(rutningAvslutt.fasit).toBeDefined();
  expect(rutningAvslutt.fasit).toMatch(
    /(Ja|Nei|Ikkje testbart|sjekkDelutfall)/i
  );
  expect(rutningAvslutt.utfall).toBeDefined();
  if (typeof rutningAvslutt.utfall === "string") {
    expect(rutningAvslutt.utfall.length).toBeGreaterThan(0);
  } else if (typeof rutningAvslutt.utfall === "object") {
    expect(rutningAvslutt.utfall.ja).toBeDefined();
    expect(rutningAvslutt.utfall.ja.length).toBeGreaterThan(0);
    expect(rutningAvslutt.utfall.nei).toBeDefined();
    expect(rutningAvslutt.utfall.nei.length).toBeGreaterThan(0);
  }
}

/**
 * Sjekker ruting av typen ikkje forekomst
 * @param runtingIkkjeForekomst  Ruting av typen ikkje forekomst
 */
function vurderRutingIkkjeForekomst(runtingIkkjeForekomst) {
  expect(runtingIkkjeForekomst.utfall).toBeDefined();
  expect(runtingIkkjeForekomst.utfall.length).toBeGreaterThan(0);
}

/**
 * Sjekker delutfall
 * @param delutfall
 */
function vurderDelutfall(delutfall: Delutfall) {
  expect(delutfall).toBeInstanceOf(Object);
  if (typeof delutfall === "object") {
    expect(delutfall.nr).toBeDefined();
    expect(typeof delutfall.nr).toEqual("number");
    expect(delutfall.fasit).toBeDefined();
    expect(typeof delutfall.fasit).toEqual("string");
    expect(delutfall.fasit).toMatch(/(Ja|Nei|Ikkje testbart|Ikkje forekomst)/i);
    expect(delutfall.tekst).toBeDefined();
  }
}



/**
 * Sjekker om et stegnummer er større enn et annet
 * @param stegNr1 Stegnummer som skal sjekkes
 * @param stegNr2 Stegnummer det skal sjekkes mot
 * @returns 
 */
function stegnrErStorreEnn(stegNr1: string, stegNr2: string): boolean {
  const regex = /^(\d+)\.(\d+)$/;

  if (stegNr1.match(regex) && stegNr2.match(regex)) {
    const [helTall1, des1] = stegNr1.split('.');
    const [helTall2, des2] = stegNr2.split('.');
    if (helTall1 === helTall2) {
      return parseInt(des1) > parseInt(des2);
    } else return (parseInt(helTall1) > parseInt(helTall2))
  }

  return false;
}