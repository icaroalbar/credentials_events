import { Audience } from "../../../audience.entity";
import { AudienceGateway } from "../../audience.gateway";
import {
  CreateAudienceInputDTO,
  CreateAudienceOutputDTO,
} from "./create-audience.dto";

export class CreateAudienceUseCase {
  constructor(private readonly audienceRepository: AudienceGateway) {}

  async execute(
    input: CreateAudienceInputDTO
  ): Promise<CreateAudienceOutputDTO> {
    const audience = new Audience(input);
    const createdAudience = await this.audienceRepository.create(audience);

    return {
      id: createdAudience.getId(),
      name: createdAudience.getName(),
      cpf: createdAudience.getCpf(),
      email: createdAudience.getEmail(),
      phone: createdAudience.getPhone(),
      cellphone: createdAudience.getCellphone(),
      birth: createdAudience.getBirth(),
      certificate: createdAudience.getCertificate(),
      confirmed: createdAudience.isConfirmed(),
      address: {
        city: createdAudience.getAddress().getCity(),
        state: createdAudience.getAddress().getState(),
        country: createdAudience.getAddress().getCountry(),
      },
      crm: {
        number: createdAudience.getCrm().getNumber(),
        uf: createdAudience.getCrm().getUF(),
      },
    };
  }
}
