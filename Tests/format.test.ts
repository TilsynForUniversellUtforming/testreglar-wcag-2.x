import * as fs from 'fs';
import { glob } from 'glob';



let filer;

beforeAll(async () => {
    filer = await hentFiler();
});


test('Sjekker at Testregelmappe finnes', () => {
    expect(fs.existsSync("./Testreglar")).toBe(true);
});




describe('Sjekk av testregelformat', () => {


    test('Testregelformat er korrekt', async () => {

        let format_sjekk = true;
       

        

        filer.forEach(async (f: string) => {

            if (!sjekk_format(f)) {
                format_sjekk = false;
            }  
         
           
        });
        expect(format_sjekk).toEqual(true);
        
    });
});





async function hentFiler() {
    filer = await glob('Testreglar/**/*.json');
    return filer;

}



function sjekk_format(file):boolean {
    if (!file.startsWith("Testreglar\\felles\\")) {
        const testregel = JSON.parse(fs.readFileSync(file, 'utf8'));

        if (typeof (testregel.id) !== "string") {
            console.log("Filen " + file + " mangler id-felt");
            return false
        } else if (typeof (testregel.type) !== "string") {
            console.log("Filen " + file + " mangler type felt");
            return false
        } else if (typeof (testregel.spraak) !== "string") {
            console.log("Filen " + file + " mangler spraak felt");
            return false
        }

        
    }

    return true;
}
