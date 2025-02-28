import { AudienceGateway } from "../../audience.gateway";
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
import { DisconfirmedAudienceUseCase } from "./disconfirmed-audience.usecase";

const mockAudienceRepository: jest.Mocked<AudienceGateway> = {
  create: jest.fn().mockResolvedValue(undefined),
  import: jest.fn().mockResolvedValue(undefined),
  delete: jest.fn().mockResolvedValue(undefined),
  findAll: jest.fn().mockResolvedValue([]),
  findById: jest.fn().mockResolvedValue(undefined),
  update: jest.fn().mockResolvedValue(undefined),
};

describe("DisconfirmedAudienceUseCase", () => {
  let disconfirmedAudienceUseCase: DisconfirmedAudienceUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    disconfirmedAudienceUseCase = new DisconfirmedAudienceUseCase(
      mockAudienceRepository
    );
  });

  it("should disconfirm an audience successfully", async () => {
    const address: AddressValueObjectProps = {
      city: "São Paulo",
      state: "SP",
      country: "Brasil",
    };

    const crm: CRMValueObjectProps = {
      number: "123456",
      uf: "SP",
    };

    const audience = new Audience({
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
      confirmed: true,
    });

    mockAudienceRepository.findById.mockResolvedValueOnce(audience);
    mockAudienceRepository.update.mockResolvedValueOnce(audience);

    const result = await disconfirmedAudienceUseCase.execute(audience.getId());

    expect(result).toEqual({
      id: audience.getId(),
      name: audience.getName(),
      cpf: audience.getCpf(),
      email: audience.getEmail(),
      phone: audience.getPhone(),
      cellphone: audience.getCellphone(),
      birth: audience.getBirth(),
      certificate: audience.getCertificate(),
      confirmed: false,
      address: {
        city: audience.getAddress().getCity(),
        state: audience.getAddress().getState(),
        country: audience.getAddress().getCountry(),
      },
      crm: {
        number: audience.getCrm().getNumber(),
        uf: audience.getCrm().getUF(),
      },
    });
  });
});
