import type { ListItem, RecipientInformation, SupportedCountry } from "@/types";
import { type Faker, faker, fakerEN_CA, fakerFR, fakerPT_BR } from "@faker-js/faker";
import { faker_MiddleEarth } from "@/faker-middle-earth";
import Settings from "@/settings";

export class FakerWrapper {
  listItems(): ListItem[] {
    return [
      { quantity: 1, name: "Mouse", priceInCents: 780 },
      { quantity: 2, name: "MousePad", priceInCents: 500 },
      { quantity: 1, name: "Monitor", priceInCents: 14500 },
      { quantity: 3, name: "USB Type C cable", priceInCents: 700 },
    ];
  }

  deliveryDate(): string {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
    }).format(new Date());
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
