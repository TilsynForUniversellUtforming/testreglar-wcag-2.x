import * as fs from 'fs';
import { glob } from 'glob'


let filer;

beforeAll(async () => {
    filer = await hentFiler();
});


test('Sjekker at Testregelmappe finnes', () => {
    expect(fs.existsSync("./Testreglar")).toBe(true);
});


test('Testregelformat er korrekt', async () => {
    let format_sjekk = true;

    filer.forEach((f: string) => {
        if (!sjekk_format(f)) {
            format_sjekk = false;
        }
    });
    expect(format_sjekk).toEqual(true);
});



async function hentFiler() {
    filer = await glob('Testreglar/**/*.json');
    return filer;
}


function sjekk_format(file:string): boolean {
    if (!file.includes("felles")) {
        const testregel:Testregel = JSON.parse(fs.readFileSync(file, 'utf8'));

        if (typeof (testregel.id) !== "string") {
            console.log("Filen " + file + " mangler id-felt");
            return false
        } else if (typeof (testregel.type) !== "string") {
            console.log("Filen " + file + " mangler type felt");
            return false
        } else if (typeof (testregel.spraak) !== "string") {
            console.log("Filen " + file + " mangler spraak felt");
            return false
        } else if (typeof (testregel.kravTilSamsvar) !== "string") {
            console.log("Filen " + file + " mangler feltet kravTilSamsvar");
            return false
        } else if (typeof (testregel.side) !== "string") {
            console.log("Filen " + file + " mangler feltet side");
            return false
        } else if (typeof (testregel.element) !== "string") {
            console.log("Filen " + file + " mangler feltet side");
            return false
        } else if (typeof (testregel.namn) !== "string") {
            console.log("Filen " + file + " mangler feltet namn");
            return false
        } else if (!Array.isArray(testregel.kolonner)) {
            console.log("Filen " + file + " mangler feltet kolonner");
            return false
        } else if (!Array.isArray(testregel.steg)) {
            console.log("Filen " + file + " mangler feltet steg");
            return false
        }
    }

    return true;
}


type Testregel = {
    namn: string;
    id: string;
    type: string;
    spraak: string;
    kravTilSamsvar: string;
    side: string;
    element: string;
    kolonner: Array<string>;
    steg: Array<object>;

}