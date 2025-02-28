import { AudienceGateway } from "../../audience.gateway";
import { FindAllAudienceOutputDTO } from "./find-all-audience.dto";

export class FindAllAudienceUseCase {
  constructor(private readonly audienceRepository: AudienceGateway) {}

  async execute(): Promise<FindAllAudienceOutputDTO[]> {
    const audiences = await this.audienceRepository.findAll();

    return audiences.map((audicence) => ({
      id: audicence.getId(),
      name: audicence.getName(),
      cpf: audicence.getCpf(),
      email: audicence.getEmail(),
      phone: audicence.getPhone(),
      cellphone: audicence.getCellphone(),
      birth: audicence.getBirth(),
      certificate: audicence.getCertificate(),
      confirmed: audicence.isConfirmed(),
      address: {
        city: audicence.getAddress().getCity(),
        state: audicence.getAddress().getState(),
        country: audicence.getAddress().getCountry(),
      },
      crm: {
        number: audicence.getCrm().getNumber(),
        uf: audicence.getCrm().getUF(),
      },
    }));
  }
}
