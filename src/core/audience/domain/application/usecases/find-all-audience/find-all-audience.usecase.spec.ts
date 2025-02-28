import { FindAllAudienceUseCase } from "./find-all-audience.usecase";
import { AudienceGateway } from "../../audience.gateway";
import {
  AddressValueObject,
  AddressValueObjectProps,
} from "../../../value-objects/address/address.valueobject";
import {
  CRMValueObject,
  CRMValueObjectProps,
} from "../../../value-objects/crm/crm.valueobject";
import { Audience } from "../../../audience.entity";
import { randomUUID } from "node:crypto";

const mockAudienceRepository: jest.Mocked<AudienceGateway> = {
  create: jest.fn().mockResolvedValue(undefined),
  import: jest.fn().mockResolvedValue(undefined),
  delete: jest.fn().mockResolvedValue(undefined),
  findAll: jest.fn().mockResolvedValue([]), // Retorno inicial vazio
  findById: jest.fn().mockResolvedValue(undefined),
  update: jest.fn().mockResolvedValue(undefined),
};

describe("FindAllAudienceUseCase", () => {
  let findAllAudienceUseCase: FindAllAudienceUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    findAllAudienceUseCase = new FindAllAudienceUseCase(mockAudienceRepository);
  });

  it("should return all audiences successfully", async () => {
    const address: AddressValueObjectProps = {
      city: "São Paulo",
      state: "SP",
      country: "Brasil",
    };

    const crm: CRMValueObjectProps = {
      number: "123456",
      uf: "SP",
    };

    const audience1 = new Audience({
      id: randomUUID(),
      name: "John Doe",
      cpf: "123.456.789-00",
      email: "teste@teste.com",
      cellphone: "11999999999",
      birth: new Date(),
      address: new AddressValueObject(address),
      crm: new CRMValueObject(crm),
      phone: "1122222222",
      certificate: "certificate",
      confirmed: false,
    });

    const audience2 = new Audience({
      id: randomUUID(),
      name: "Jane Doe",
      cpf: "987.654.321-00",
      email: "jane@teste.com",
      cellphone: "11988888888",
      birth: new Date(),
      address: new AddressValueObject(address),
      crm: new CRMValueObject(crm),
      phone: "1133333333",
      certificate: "certificado2",
      confirmed: true,
    });

    mockAudienceRepository.findAll.mockResolvedValueOnce([
      audience1,
      audience2,
    ]);

    const result = await findAllAudienceUseCase.execute();

    expect(mockAudienceRepository.findAll).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(2);

    expect(result[0].id).toBe(audience1.getId());
    expect(result[0].name).toBe(audience1.getName());
    expect(result[0].cpf).toBe(audience1.getCpf());
    expect(result[0].email).toBe(audience1.getEmail());
    expect(result[0].cellphone).toBe(audience1.getCellphone());
    expect(result[0].phone).toBe(audience1.getPhone());
    expect(result[0].certificate).toBe(audience1.getCertificate());
    expect(result[0].confirmed).toBe(audience1.isConfirmed());
    expect(result[0].address?.city).toBe(audience1.getAddress().getCity());
    expect(result[0].address?.state).toBe(audience1.getAddress().getState());
    expect(result[0].address?.country).toBe(
      audience1.getAddress().getCountry()
    );
    expect(result[0].crm?.number).toBe(audience1.getCrm().getNumber());
    expect(result[0].crm?.uf).toBe(audience1.getCrm().getUF());

    expect(result[1].id).toBe(audience2.getId());
    expect(result[1].name).toBe(audience2.getName());
    expect(result[1].cpf).toBe(audience2.getCpf());
    expect(result[1].email).toBe(audience2.getEmail());
    expect(result[1].cellphone).toBe(audience2.getCellphone());
    expect(result[1].phone).toBe(audience2.getPhone());
    expect(result[1].certificate).toBe(audience2.getCertificate());
    expect(result[1].confirmed).toBe(audience2.isConfirmed());
    expect(result[1].address?.city).toBe(audience1.getAddress().getCity());
    expect(result[1].address?.state).toBe(audience1.getAddress().getState());
    expect(result[1].address?.country).toBe(
      audience1.getAddress().getCountry()
    );
    expect(result[1].crm?.number).toBe(audience1.getCrm().getNumber());
    expect(result[1].crm?.uf).toBe(audience1.getCrm().getUF());
  });
});
