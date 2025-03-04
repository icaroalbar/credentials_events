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
import { AudienceEntity } from "@infra/entities/audience.entity";

describe("Create Audience", () => {
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

describe("Delete Audience", () => {
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

  it("deve deletar uma audiência no banco de dados", async () => {
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
      email: "teste@teste.com",
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

    await repository.delete(createdAudience.getId());

    const deletedAudience = await dataSource
      .getRepository(AudienceEntity)
      .findOne({ where: { id: createdAudience.getId() } });

    expect(deletedAudience).toBeNull();
  });

  it("deve lançar erro ao deletar um ID inexistente", async () => {
    await expect(repository.delete(randomUUID())).rejects.toThrow(
      "Convidado não existe"
    );
  });
});

describe("Find Audience by ID", () => {
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

  it("deve encontrar uma audiência pelo ID", async () => {
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
      email: "teste@teste.com",
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

    const foundAudience = await repository.findById(createdAudience.getId());

    expect(foundAudience).toBeDefined();
    expect(foundAudience.getId()).toBe(createdAudience.getId());
    expect(foundAudience.getName()).toBe(createdAudience.getName());
  });

  it("deve lançar um erro ao tentar encontrar uma audiência inexistente", async () => {
    await expect(repository.findById(randomUUID())).rejects.toThrow(
      "Convidado não existe"
    );
  });
});

describe("Find All Audiences", () => {
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

  it("deve retornar todas as audiências do banco", async () => {
    const address: AddressValueObjectProps = {
      city: "São Paulo",
      state: "SP",
      country: "Brasil",
    };

    const crm: CRMValueObjectProps = {
      number: "123456",
      uf: "SP",
    };

    const input1: AudienceProps = {
      id: randomUUID(),
      name: "João Silva",
      cpf: "123.456.789-00",
      email: "joao@teste.com",
      cellphone: "11999999999",
      birth: new Date(),
      address: new AddressValueObject(address),
      crm: new CRMValueObject(crm),
      phone: "1122222222",
      certificate: "certificate",
      confirmed: false,
    };

    const input2: AudienceProps = {
      id: randomUUID(),
      name: "Maria Souza",
      cpf: "987.654.321-00",
      email: "maria@teste.com",
      cellphone: "11988888888",
      birth: new Date(),
      address: new AddressValueObject(address),
      crm: new CRMValueObject(crm),
      phone: "1123333333",
      certificate: "certificate",
      confirmed: true,
    };

    await repository.create(new Audience(input1));
    await repository.create(new Audience(input2));

    const audiences = await repository.findAll();

    expect(audiences).toHaveLength(2);
    expect(audiences[0].getName()).toBe("João Silva");
    expect(audiences[1].getName()).toBe("Maria Souza");
  });

  it("deve retornar um array vazio quando não houver audiências", async () => {
    const audiences = await repository.findAll();
    expect(audiences).toHaveLength(0);
  });
});

describe("Update Audience", () => {
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

  it("deve atualizar uma audiência no banco de dados", async () => {
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
      email: "teste@teste.com",
      cellphone: "11999999999",
      birth: new Date(),
      address: new AddressValueObject(address),
      crm: new CRMValueObject(crm),
      phone: "1122222222",
      certificate: "certificate",
      confirmed: true,
    };

    const audience = new Audience(input);
    const createdAudience = await repository.create(audience);

    expect(createdAudience).toBeDefined();
    expect(createdAudience.getName()).toBe("João Silva");

    const newBirthDate = new Date();

    const updatedAudience = await repository.update(createdAudience.getId(), {
      getName: () => "Carlos Souza",
      getCpf: () => "11111111111",
      getEmail: () => "carlos@teste.com",
      getCellphone: () => "21999999999",
      getBirth: () => newBirthDate,
      getAddress: () =>
        new AddressValueObject({
          city: "Rio de Janeiro",
          state: "RJ",
          country: "Brasil",
        }),
      getCrm: () => new CRMValueObject({ number: "654321", uf: "RJ" }),
      getPhone: () => "21999999999",
      getCertificate: () => "new-certificate",
      isConfirmed: () => false,
    } as Partial<Audience>);

    console.log(updatedAudience.getCrm());

    expect(updatedAudience).toBeDefined();
    expect(updatedAudience.getName()).toBe("Carlos Souza");
    expect(updatedAudience.getCpf()).toBe("11111111111");
    expect(updatedAudience.getEmail()).toBe("carlos@teste.com");
    expect(updatedAudience.getCellphone()).toBe("21999999999");
    expect(updatedAudience.getBirth()).toEqual(newBirthDate);
    expect(updatedAudience.getPhone()).toBe("21999999999");
    expect(updatedAudience.getCertificate()).toBe("new-certificate");
    expect(updatedAudience.isConfirmed()).toBe(false);
    expect(updatedAudience.getCrm().getNumber()).toBe("654321");
    expect(updatedAudience.getCrm().getUF()).toBe("RJ");
    expect(updatedAudience.getAddress().getCity()).toBe("Rio de Janeiro");
    expect(updatedAudience.getAddress().getState()).toBe("RJ");
  });

  it("deve lançar erro ao tentar atualizar um ID inexistente", async () => {
    await expect(
      repository.update(randomUUID(), {
        getName: () => "Novo Nome",
      } as Partial<Audience>)
    ).rejects.toThrow("Convidado não existe");
  });
});
