import "reflect-metadata";
import { DataSource } from "typeorm";
import { randomUUID } from "node:crypto";
import { AudienceRepository } from "./audience.repository";
import AppDataSource from "@infra/database/data-source";
import {
  AddressValueObject,
  AddressValueObjectProps,
} from "@core/audience/domain/value-objects/address/address.valueobject";
import {
  CRMValueObject,
  CRMValueObjectProps,
} from "@core/audience/domain/value-objects/crm/crm.valueobject";
import { Audience, AudienceProps } from "@core/audience/domain/audience.entity";

describe("AudienceRepository (Integration)", () => {
  let repository: AudienceRepository;
  let dataSource: DataSource;

  beforeAll(async () => {
    dataSource = AppDataSource;
    await dataSource.initialize();
    repository = new AudienceRepository();
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  beforeEach(async () => {
    await dataSource.synchronize(true);
  });

  it("deve criar uma nova audiência no banco de dados", async () => {
    const address: AddressValueObjectProps = {
      city: "São Paulo",
      state: "SP",
      country: "Brasil",
    };

    const crm: CRMValueObjectProps = {
      number: "123456",
      uf: "SP",
    };

    const input: AudienceProps = {
      id: randomUUID(),
      name: "João Silva",
      cpf: "123.456.789-00",
      email: "tetse@teste.com",
      cellphone: "11999999999",
      birth: new Date(),
      address: new AddressValueObject(address),
      crm: new CRMValueObject(crm),
      phone: "1122222222",
      certificate: "certificate",
      confirmed: false,
    };

    const audience = new Audience(input);
    const createdAudience = await repository.create(audience);

    expect(createdAudience).toBeDefined();
    expect(createdAudience.getId()).toBeDefined();
    expect(createdAudience.getName()).toBe("João Silva");
    expect(createdAudience.getEmail()).toBe("tetse@teste.com");
  });
});
