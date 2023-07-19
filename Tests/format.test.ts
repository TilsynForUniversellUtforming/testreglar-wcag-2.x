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

    console.log(filer);

    // Applies only to tests in this descrisbe block



    

    test('Sjekker at Testregelmappe finnes', async() => {

        filer.forEach(async (f) => {

            const file = fs.readFileSync(f, 'utf8')
            const testregel = JSON.parse(fs.readFileSync(f, 'utf8'));

            if (testregel.id == null) {
                console.log(testregel.id);
            } else {
                expect(typeof testregel.id).toBe("string");
            }
            

            
            //expect(typeof(testregel.id)).toBe("string");
            
        });
            

     
        
    });

    /**filer.forEach((e) => {


        test('Sjekker at Testregelmappe finnes', () => {
            expect(true).toBe(true);
        });

    });*/

    
});




async function hentFiler() {
    filer = await glob('Testreglar/**/*.json');
    return filer;

}

async function lesFiler() {
    let check;
    await filer.forEach(async (f: string) => {
        check = await test_fil(f);
    }, check);

    return check;

}


async function test_fil(f) {



    const obj = JSON.parse(fs.readFileSync(f, 'utf8'));

    if (typeof (obj.id) === "string") {
        return true;
    } else {
        return false;
    }
}








