import { faker } from "@faker-js/faker";

export type Data = {
    firstName: string;
    lastName: string;
    postalCode: string;
};

export function generateRandomData(): Data {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        postalCode: faker.location.zipCode("#####"),
    };
}