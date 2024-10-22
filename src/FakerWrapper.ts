import type { ListItem, RecipientInformation, SupportedCountry } from "@/types";
import { type Faker, faker, fakerEN_CA, fakerFR, fakerPT_BR } from "@faker-js/faker";
import { faker_MiddleEarth } from "@/faker-middle-earth";
import Settings from "@/settings";

export class FakerWrapper {
  listItems(): ListItem[] {
    return faker.helpers.uniqueArray(faker.commerce.productName, 4).map(
      (name: string): ListItem => ({
        name,
        priceInCents: faker.number.int({ min: 50, max: 1e4, multipleOf: 25 }),
        quantity: faker.number.int({ min: 1, max: 6 }),
      }),
    );
  }

  deliveryDate(): string {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
    }).format(faker.date.soon({ days: 30 }));
  }

  additionalNotes(): string {
    return faker.lorem.paragraph();
  }

  recipientInformation(): RecipientInformation {
    const country = faker.helpers.arrayElement(Settings.COUNTRIES);
    const localFaker = this.localFaker(country);

    return {
      name: localFaker.person.fullName(),
      email: localFaker.internet.email(),
      country: country,
      stateProvince: localFaker.location.state(),
      city: localFaker.location.city(),
      streetAddress: localFaker.location.streetAddress({ useFullAddress: true }),
      zipPostalCode: localFaker.location.zipCode(),
    };
  }

  localFaker(countryName: SupportedCountry): Faker {
    return (
      {
        Brazil: fakerPT_BR,
        Canada: fakerEN_CA,
        "United States": faker,
        France: fakerFR,
        "Middle-earth": faker_MiddleEarth,
      }[countryName] ?? faker
    );
  }
}
