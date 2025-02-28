import { AudienceGateway } from "../../audience.gateway";
import { DisconfirmedAudienceOutputDTO } from "./disconfirmed-audience.dto";

export class DisconfirmedAudienceUseCase {
  constructor(private readonly audienceRepository: AudienceGateway) {}

  async execute(id: string): Promise<DisconfirmedAudienceOutputDTO> {
    const audience = await this.audienceRepository.findById(id);
    audience.disconfirmed();

    const result = await this.audienceRepository.update(audience);

    return {
      id: result.getId(),
      name: result.getName(),
      cpf: result.getCpf(),
      email: result.getEmail(),
      phone: result.getPhone(),
      cellphone: result.getCellphone(),
      birth: result.getBirth(),
      certificate: result.getCertificate(),
      confirmed: result.isConfirmed(),
      address: {
        city: result.getAddress().getCity(),
        state: result.getAddress().getState(),
        country: result.getAddress().getCountry(),
      },
      crm: {
        number: result.getCrm().getNumber(),
        uf: result.getCrm().getUF(),
      },
    };
  }
}
