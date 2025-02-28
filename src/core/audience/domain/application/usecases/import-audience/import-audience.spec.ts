import { ImportAudienceUseCase } from "./import-audience.usecase";
import { AudienceGateway } from "../../audience.gateway";
import { ImportAudienceInputDTO } from "./import-audience.dto";
import { AddressValueObject } from "../../../value-objects/address/address.valueobject";
import { CRMValueObject } from "../../../value-objects/crm/crm.valueobject";

describe("ImportAudienceUseCase", () => {
  let useCase: ImportAudienceUseCase;
  let audienceRepository: jest.Mocked<AudienceGateway>;

  beforeEach(() => {
    audienceRepository = {
      import: jest.fn(),
    } as unknown as jest.Mocked<AudienceGateway>;

    useCase = new ImportAudienceUseCase(audienceRepository);
  });

  it("deve importar múltiplas audiências com endereço e CRM válidos", async () => {
    const input: ImportAudienceInputDTO[] = [
      {
        id: "1",
        name: "João Silva",
        cpf: "12345678900",
        email: "joao@example.com",
        phone: "1111-1111",
        cellphone: "99999-9999",
        birth: new Date("1990-01-01"),
        certificate: "CERT123",
        confirmed: true,
        address: new AddressValueObject({
          city: "São Paulo",
          state: "SP",
          country: "Brasil",
        }),
        crm: new CRMValueObject({
          number: "12345",
          uf: "SP",
        }),
      },
      {
        id: "2",
        name: "Maria Oliveira",
        cpf: "98765432100",
        email: "maria@example.com",
        phone: "2222-2222",
        cellphone: "88888-8888",
        birth: new Date("1995-05-05"),
        certificate: "CERT456",
        confirmed: false,
        address: new AddressValueObject({
          city: "Rio de Janeiro",
          state: "RJ",
          country: "Brasil",
        }),
        crm: new CRMValueObject({
          number: "67890",
          uf: "RJ",
        }),
      },
    ];

    await useCase.execute(input);

    expect(audienceRepository.import).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          _audience: expect.objectContaining({
            id: "1",
            address: expect.any(AddressValueObject),
            crm: expect.any(CRMValueObject),
          }),
        }),
        expect.objectContaining({
          _audience: expect.objectContaining({
            id: "2",
            address: expect.any(AddressValueObject),
            crm: expect.any(CRMValueObject),
          }),
        }),
      ])
    );
  });

  it("deve importar uma audiência sem endereço e CRM", async () => {
    const input: ImportAudienceInputDTO[] = [
      {
        id: "2",
        name: "Maria Oliveira",
        cpf: "98765432100",
        email: "maria@example.com",
        phone: "2222-2222",
        cellphone: "88888-8888",
        birth: new Date("1995-05-05"),
        certificate: "CERT456",
        confirmed: false,
        address: undefined,
        crm: undefined,
      },
    ];

    await useCase.execute(input);

    expect(audienceRepository.import).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          _audience: expect.objectContaining({
            id: "2",
            address: undefined,
            crm: undefined,
          }),
        }),
      ])
    );
  });

  it("deve lançar erro se o array de audiências estiver vazio", async () => {
    await expect(useCase.execute([])).rejects.toThrow(
      "O array de audiências não pode estar vazio."
    );
  });

  it("deve lançar erro se a entrada não for um array", async () => {
    await expect(useCase.execute(undefined as any)).rejects.toThrow(
      "O array de audiências não pode estar vazio."
    );
  });
});
