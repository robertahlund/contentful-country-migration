import {
  ContentfulMigration,
  IContentfulMigration,
} from "./contentful-migration";

const fs = require("fs").promises;

const svPath = "./data/sv/world.json";
const daPath = "./data/da/world.json";
const enPath = "./data/en/world.json";
const outputPath = "./output/output.json";

interface JSONData {
  id: number;
  code: string;
  name: string;
}

export interface CountryData {
  id: number;
  code: string;
  sv: string;
  en: string;
  da: string;
}

async function getSwedish(): Promise<JSONData[]> {
  return JSON.parse((await fs.readFile(svPath)).toString()).map((data) => {
    return {
      id: data.id,
      code: data.alpha2,
      name: data.name,
    };
  });
}

async function getEnglish(): Promise<JSONData[]> {
  return JSON.parse((await fs.readFile(enPath)).toString()).map((data) => {
    return {
      id: data.id,
      code: data.alpha2,
      name: data.name,
    };
  });
}

async function getDanish(): Promise<JSONData[]> {
  return JSON.parse((await fs.readFile(daPath)).toString()).map((data) => {
    return {
      id: data.id,
      code: data.alpha2,
      name: data.name,
    };
  });
}

(async function exportFile() {
  const countryData: CountryData[] = [];
  const svData = await getSwedish();
  const enData = await getEnglish();
  const daData = await getDanish();
  let id = 1;
  for (const data of svData) {
    countryData.push({
      id: id,
      sv: data.name,
      en: enData.find((_data) => _data.code === data.code)?.name ?? "",
      da: daData.find((_data) => _data.code === data.code)?.name ?? "",
      code: data.code.toUpperCase(),
    });
    id++;
  }
  await fs.writeFile(outputPath, JSON.stringify(countryData));
  const contentfulMigration: IContentfulMigration =
    await ContentfulMigration.init();
  await contentfulMigration.syncCountries(countryData);
  process.exit(1);
})();
