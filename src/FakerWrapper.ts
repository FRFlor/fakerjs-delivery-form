import type { ListItem, RecipientInformation } from "@/types";
import { Faker, faker, fakerEN_CA, fakerFR, fakerPT_BR } from "@faker-js/faker";
import Settings from "@/settings";
import { faker_MiddleEarth } from "@/faker-middle-earth";

export class FakerWrapper {
  additionalNotes(): string {
    return faker.lorem.paragraph();
  }

  estimatedDeliveryDate(): string {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
    }).format(faker.date.soon({ days: 30 }));
  }

  items(): ListItem[] {
    return faker.helpers.uniqueArray(faker.commerce.productName, 4).map(
      (name: string): ListItem => ({
        name,
        priceInCents: faker.number.int({ min: 50, max: 100_00, multipleOf: 25 }),
        quantity: faker.number.int({ min: 1, max: 6 }),
      }),
    );
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

  private localFaker(country: string): Faker {
    return (
      {
        Brazil: fakerPT_BR,
        Canada: fakerEN_CA,
        France: fakerFR,
        "United States": faker,
        "Middle-earth": faker_MiddleEarth,
      }[country] ?? faker
    );
  }
}
