import { CreateAudienceUseCase } from "./create-audience.usecase";
import { AudienceGateway } from "../../audience.gateway";
import { CreateAudienceInputDTO } from "./create-audience.dto";
import { Audience } from "../../../audience.entity";
import {
  AddressValueObject,
  AddressValueObjectProps,
} from "../../../value-objects/address/address.valueobject";
import {
  CRMValueObject,
  CRMValueObjectProps,
} from "../../../value-objects/crm/crm.valueobject";
import { randomUUID } from "node:crypto";

const mockEventRepository: jest.Mocked<AudienceGateway> = {
  create: jest.fn().mockResolvedValue(undefined),
  import: jest.fn().mockResolvedValue(undefined),
  delete: jest.fn().mockResolvedValue(undefined),
  findAll: jest.fn().mockResolvedValue([]),
  findById: jest.fn().mockResolvedValue(undefined),
  update: jest.fn().mockResolvedValue(undefined),
};

describe("CreateAudienceUseCase", () => {
  let createAudienceUseCase: CreateAudienceUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    createAudienceUseCase = new CreateAudienceUseCase(mockEventRepository);
  });

  it("should create an audience successfully", async () => {
    const address: AddressValueObjectProps = {
      city: "São Paulo",
      state: "SP",
      country: "Brasil",
    };

    const crm: CRMValueObjectProps = {
      number: "123456",
      uf: "SP",
    };

    const input: CreateAudienceInputDTO = {
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

    mockEventRepository.create.mockImplementationOnce((input: Audience) => {
      return Promise.resolve(input);
    });

    const result = await createAudienceUseCase.execute(input);

    expect(mockEventRepository.create).toHaveBeenCalledTimes(1);
    expect(result.name).toBe(input.name);
    expect(result.cpf).toBe(input.cpf);
    expect(result.email).toBe(input.email);
    expect(result.cellphone).toBe(input.cellphone);
    expect(result.address?.city).toBe(input.address?.getCity());
    expect(result.address?.state).toBe(input.address?.getState());
    expect(result.address?.country).toBe(input.address?.getCountry());
    expect(result.crm?.number).toBe(input.crm?.getNumber());
    expect(result.crm?.uf).toBe(input.crm?.getUF());
    expect(result.phone).toBe(input.phone);
    expect(result.certificate).toBe(input.certificate);
    expect(result.confirmed).toBe(input.confirmed);
  });
});
