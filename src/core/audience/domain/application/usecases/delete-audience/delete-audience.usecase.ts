import { AudienceGateway } from "../../audience.gateway";

export class DeleteAudienceUseCase {
  constructor(private readonly audienceRepository: AudienceGateway) {}

  async execute(id: string): Promise<void> {
    const audience = await this.audienceRepository.findById(id);

    await this.audienceRepository.delete(audience.getId());
  }
}
