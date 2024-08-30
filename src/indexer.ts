import * as glob from "glob";
import * as fs from "fs";
import { Testregel } from "./interface/Testregel";
import path from "path";
const dataFolder = "./Testreglar";
const excludeFolder: string = "felles/**";
const files = glob.sync("**/*.json", {
  cwd: dataFolder,
  ignore: [excludeFolder],
});

const a:{id:string,file:string}[] = [] ;


files.forEach((file) => {
    const filePath = path.join(dataFolder, file);
    const testregel: Testregel = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const folder = "/Testreglar/" ;
    a.push({id:testregel.id,file:`${folder}${file.replace(/\\/g, '/')}`});

});



const jsonData = JSON.stringify(a, null, 2);

fs.writeFile('index.json', jsonData, 'utf8', (err) => {
    if (err) {
      console.error("An error occurred while writing JSON to file:", err);
    } else {
      console.log("Index-file has been saved.");
    }
  });

