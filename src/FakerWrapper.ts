import type { ListItem, RecipientInformation } from "@/types";
import { faker } from "@faker-js/faker";

export class FakerWrapper {
  additionalNotes(): string {
    return faker.lorem.paragraph();
  }

  estimatedDeliveryDate(): string {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
    }).format(new Date());
  }

  items(): ListItem[] {
    return [
      { quantity: 1, name: "Mouse", priceInCents: 780 },
      { quantity: 2, name: "MousePad", priceInCents: 500 },
      { quantity: 1, name: "Monitor", priceInCents: 14500 },
      { quantity: 3, name: "USB Type C cable", priceInCents: 700 },
    ];
  }

  recipientInformation(): RecipientInformation {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      country: "United States",
      stateProvince: faker.location.state(),
      city: faker.location.city(),
      streetAddress: faker.location.streetAddress({ useFullAddress: true }),
      zipPostalCode: faker.location.zipCode(),
    };
  }
}
