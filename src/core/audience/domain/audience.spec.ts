import { randomUUID } from "node:crypto";
import {
  AddressValueObject,
  AddressValueObjectProps,
} from "./value-objects/address/address.valueobject";
import {
  CRMValueObject,
  CRMValueObjectProps,
} from "./value-objects/crm/crm.valueobject";
import { Audience, AudienceProps } from "./audience.entity";

describe("Create Audience", () => {
  it("should create a valid Audience entity", () => {
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
      name: "John Doe",
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
    expect(audience).toBeDefined();
    expect(audience.getId()).toBe(input.id);
    expect(audience.getName()).toBe(input.name);
    expect(audience.getCpf()).toBe(input.cpf);
    expect(audience.getEmail()).toBe(input.email);
    expect(audience.getCellphone()).toBe(input.cellphone);
    expect(audience.getBirth()).toBe(input.birth);
    expect(audience.getAddress().getCity()).toBe(input.address?.getCity());
    expect(audience.getAddress().getCountry()).toBe(
      input.address?.getCountry()
    );
    expect(audience.getAddress().getState()).toBe(input.address?.getState());
    expect(audience.getCrm().getNumber()).toBe(input.crm?.getNumber());
    expect(audience.getCrm().getUF()).toBe(input.crm?.getUF());
    expect(audience.getPhone()).toBe(input.phone);
    expect(audience.getCertificate()).toBe(input.certificate);
    expect(audience.isConfirmed()).toBe(input.confirmed);
  });
});

describe("Confirmed Audience", () => {
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
    name: "John Doe",
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
  it("should confirm an Audience", () => {
    const audience = new Audience(input);
    audience.confirmed();
    expect(audience.isConfirmed()).toBe(true);
  });

  it("should disconfirm an Audience", () => {
    const audience = new Audience(input);

    audience.confirmed();
    expect(audience.isConfirmed()).toBe(true);

    audience.disconfirmed();
    expect(audience.isConfirmed()).toBe(false);
  });
});
