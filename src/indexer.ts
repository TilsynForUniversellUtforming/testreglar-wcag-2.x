import fg from 'fast-glob';
import fs from 'fs/promises';
import path from 'path';
import { Testregel } from './interface/Testregel';

const testregelFolder = './Testreglar';
const utdaterteFolder = './Utdatert';
const excludePattern = 'felles/**';
const outData: OutData = {
  gjeldane: [],
  utdaterte: []
};

async function processFiles(folder: string, key: keyof OutData): Promise<void> {
  try {
    const files: string[] = await fg('**/*.json', {
      cwd: folder,
      ignore: [excludePattern]
    });

    for (const file of files) {
      const filePath: string = path.join(folder, file);
      const data: string = await fs.readFile(filePath, 'utf8');
      const testregel: Testregel = JSON.parse(data);
      const relativePath: string = `/${path.basename(folder)}/${file.replace(/\\/g, '/')}`;
      outData[key].push({ id: testregel.id, file: relativePath });
    }
  } catch (err) {
    console.error(`En feil oppstod under behandling av filer i ${folder}:`, err);
  }
}

async function main(): Promise<void> {
  await Promise.all([
    processFiles(testregelFolder, 'gjeldane'),
    processFiles(utdaterteFolder, 'utdaterte')
  ]);

  try {
    const jsonData: string = JSON.stringify(outData, null, 2);
    await fs.writeFile('index.json', jsonData, 'utf8');
    console.log('Indeksfilen er lagret.');
  } catch (err) {
    console.error('En feil oppstod under skriving av JSON til fil:', err);
  }
}

main();

interface FileEntry {
  id: string;
  file: string;
}

interface OutData {
  gjeldane: FileEntry[];
  utdaterte: FileEntry[];
}
