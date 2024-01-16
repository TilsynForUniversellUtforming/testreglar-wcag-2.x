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
  test(`${file} har definert et namn`, () => {
    expect(testregel.namn).toBeDefined();
  });

  test(`${file} har definert en id`, () => {
    expect(testregel.namn).toBeDefined();
  });

  test(`${file} har definert en type`, () => {
    expect(testregel.type).toBeDefined();
  });

  test(`${file} har definert et språk`, () => {
    expect(testregel.spraak).toBeDefined();
    expect(testregel.spraak).toMatch(/(nb|nn|en)/i)
  });

  test(`${file} har et krav til samsvar`, () => {
    expect(testregel.kravTilSamsvar.length).toBeGreaterThan(0);
  });

  test(`${file} har satt et steg for side`, () => {
    expect(testregel.side.length).toBeGreaterThan(0);
  });

  test(`${file} har satt ett test element`, () => {
    expect(testregel.element.length).toBeGreaterThan(0);
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
      expect(steg.type).toMatch(/(jaNei|radio|tekst|instruksjon)/i)
      expect(Object.keys(steg.ruting).length).toBeGreaterThan(0);

      if(steg.type==="tekst") {
        expect(steg.label).toBeDefined();
        expect(steg.label.length).toBeGreaterThan(0) ;
      }

    });
  });
});


type Testregel = {
  namn: string,
  id: string;
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

