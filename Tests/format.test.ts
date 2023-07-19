import * as fs from 'fs';
import { glob } from 'glob';



test('Sjekker at Testregelmappe finnes', () => {
    expect(fs.existsSync("./Testreglar")).toBe(true);
});


test('Sjekker dataformat', async () => {


    const a = await lesFiler();


    expect(a).toBe(true);
});




async function hentFiler() {
    const jsfiles = await glob('Testreglar/**/*.json');
    return jsfiles;


}

async function lesFiler() {
    let check;
    const filer = await hentFiler();
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








