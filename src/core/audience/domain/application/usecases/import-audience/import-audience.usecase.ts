import { Audience } from "../../../audience.entity";
import { AudienceGateway } from "../../audience.gateway";
import { ImportAudienceInputDTO } from "./import-audience.dto";
import { AddressValueObject } from "../../../value-objects/address/address.valueobject";
import { CRMValueObject } from "../../../value-objects/crm/crm.valueobject";

export class ImportAudienceUseCase {
  constructor(private readonly audienceRepository: AudienceGateway) {}

  async execute(input: ImportAudienceInputDTO[]): Promise<void> {
    if (!Array.isArray(input) || input.length === 0) {
      throw new Error("O array de audiências não pode estar vazio.");
    }
    const audienceList = input.map((data) => {
      return new Audience({
        ...data,
        address: data.address
          ? new AddressValueObject({
              city: data.address.getCity(),
              state: data.address.getState(),
              country: data.address.getCountry(),
            })
          : undefined,
        crm: data.crm
          ? new CRMValueObject({
              number: data.crm.getNumber(),
              uf: data.crm.getUF(),
            })
          : undefined,
      });
    });

    await this.audienceRepository.import(audienceList);
  }
}
