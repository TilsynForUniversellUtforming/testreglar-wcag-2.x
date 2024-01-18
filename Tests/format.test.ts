import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';

// Få listen over JSON-filer rekursivt i mappen
const dataFolder = './Testreglar';
const excludeFolder: string = 'felles/**';
const files = glob.sync('**/*.json', { cwd: dataFolder, ignore: [excludeFolder] });

test('Sjekker at Testregelmappe finnes', () => {
  expect(fs.existsSync("./Testreglar")).toBe(true);
});

// Iterer gjennom hver JSON-fil
files.forEach(file => {
  const filePath = path.join(dataFolder, file);
  const testregel: Testregel = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Lag tester for hver JSON-fil
  test(`${file} har definert eit namn`, () => {
    expect(testregel.namn).toBeDefined();
  });

  test(`${file} har definert ein id`, () => {
    expect(testregel.id).toBeDefined();
    expect(testregel.id.length).toBeGreaterThan(0);
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
    expect(testregel.spraak).toMatch(/(nb|nn|en)/i)
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

  testregel.steg.forEach(steg => {
    test(`${file} har gyldig steg ${steg.stegnr}`, () => {
      expect(steg.stegnr.length).toBeGreaterThan(0);
      expect(steg.spm.length).toBeGreaterThan(0);
      expect(steg.ht).toBeDefined();
      expect(steg.type).toBeDefined();
      expect(steg.type).toMatch(/(jaNei|radio|tekst|instruksjon)/i);

      if (steg.type === "tekst") {
        expect(steg.label).toBeDefined();
        expect(steg.label.length).toBeGreaterThan(0);
      }
    });

    test(`${file} har gyldig ruting på steg ${steg.stegnr}`, () => {
      expect(Object.keys(steg.ruting).length).toBeGreaterThan(0);

      Object.entries(steg.ruting).forEach((ruting) => {
        expect(ruting[1].type).toMatch(/(gaaTil|regler|avslutt|ikkjeForekomst)/i);
        if (ruting[1].type === "gaaTil") {
          expect(stegFinst(ruting[1].steg, testregel.steg)).toBe(true);
        } else if (ruting[1].type === "regler") {
          expect(ruting[1].regler).toBeDefined();
          vurderRegel(ruting[1].regler, testregel.steg);
        } else if (ruting[1].type === "avslutt") {
          vurderRutingAvslutt(ruting[1]);
        } else if (ruting[1].type === "ikkjeForekomst") {
          vurderRutingIkkjeForekomst(ruting[1]);
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
function vurderRegel(reglar, testregelSteg: Array<Steg>) {
  expect(reglar).toBeDefined;
  const reglarArray: Array<Regel> = Object.values(reglar);
  expect(reglarArray.length).toBeGreaterThan(0);
  reglarArray.forEach((regel: Regel) => {
    expect(regel.handling).toBeDefined();
    expect(regel.handling.type).toBeDefined();
    expect(regel.handling.type).toMatch(/(gaaTil|regler|avslutt|ikkjeForekomst)/i);

    if (regel.handling.type === "gaaTil") {
      expect(regel.handling.steg).toBeDefined();
      expect(regel.handling.steg.length).toBeGreaterThan(0);
      expect(stegFinst(regel.handling.steg, testregelSteg)).toBe(true);
    } else if (regel.handling.type === "regler") {
      expect(regel.handling.regler).toBeDefined();
      vurderRegel(regel.handling.regler, testregelSteg);
    } else if (regel.handling.type === "avslutt") {
      vurderRutingAvslutt(regel.handling);
    } else if(regel.handling.type ==="ikkjeForekomst"){
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
  expect(rutningAvslutt.fasit).toMatch(/(Ja|Nei|Ikkje testbart|sjekkDelutfall)/i);
  expect(rutningAvslutt.utfall).toBeDefined();
  if (typeof (rutningAvslutt.utfall) === "string") {
    expect(rutningAvslutt.utfall.length).toBeGreaterThan(0);
  } else if (typeof (rutningAvslutt.utfall) === "object") {
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

type Testregel = {
  namn: string,
  id: string;
  testlabId: number,
  type: string;
  spraak: string;
  kravTilSamsvar: string;
  side: string;
  element: string;
  steg: Array<Steg>;
}

type Steg = {
  stegnr: string,
  spm: string,
  ht: string,
  type: string,
  label: string,
  ruting: object
}

type Regel = {
  type: string
  handling: Handling
  regler: Array<Regel>
}

type Handling = {
  type: string
  gaaTil: string
  regler: Array<Regel>
  steg: string
}
