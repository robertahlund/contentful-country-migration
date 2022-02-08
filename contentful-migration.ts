import { CountryData } from "./index";
import { Entry, Environment, Space } from "contentful-management";
const contentful = require("contentful-management");
require("dotenv").config();

export interface IContentfulMigration {
  syncCountries(countries: CountryData[]): Promise<void>;
}

export class ContentfulMigration implements IContentfulMigration {
  private contentfulSpaceId: string = process.env.CONTENTFUL_SPACE_ID;
  private contentfulEnvironment: string = process.env.CONTENTFUL_ENVIRONMENT;
  private contentfulApiKey: string = process.env.CONTENTFUL_MANAGEMENT_KEY;
  private contentfulContentTypeId: string =
    process.env.CONTENTFUL_CONTENT_TYPE_ID;
  private client = contentful.createClient({
    accessToken: this.contentfulApiKey,
  });
  private space: Space;
  private environment: Environment;

  static init() {
    return (async function () {
      const contentfulMigration = new ContentfulMigration();
      await contentfulMigration.build();
      return contentfulMigration;
    })();
  }

  private async build() {
    this.space = await this.client.getSpace(this.contentfulSpaceId);
    this.environment = await this.space.getEnvironment(
      this.contentfulEnvironment
    );
  }

  async syncCountries(countries: CountryData[]): Promise<void> {
    for (const country of countries) {
      try {
        const entry: Entry = await this.environment.createEntry(
          this.contentfulContentTypeId,
          {
            fields: {
              id: {
                sv: country.id,
              },
              name: {
                sv: country.sv,
                en: country.en,
                da: country.da,
              },
              code: {
                sv: country.code,
              },
            },
          }
        );
        console.log(entry);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
