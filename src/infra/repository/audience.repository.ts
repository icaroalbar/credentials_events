import { Repository } from "typeorm";
import { Audience } from "../../core/audience/domain/audience.entity";
import { AudienceGateway } from "../../core/audience/domain/application/audience.gateway";
import { AudienceEntity } from "../entities/audience.entity";
import { randomUUID } from "node:crypto";
import AppDataSource from "../database/data-source";

export class AudienceRepository implements AudienceGateway {
  private repository: Repository<AudienceEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(AudienceEntity);
  }

  async create(audience: Audience): Promise<Audience> {
    const audienceEntity = this.repository.create({
      id: randomUUID(),
      name: audience.getName(),
      cpf: audience.getCpf(),
      email: audience.getEmail(),
      phone: audience.getPhone(),
      cellphone: audience.getCellphone(),
      birth: audience.getBirth(),
      certificate: audience.getCertificate(),
      address: audience.getAddress(),
      crm: audience.getCrm(),
      confirmed: audience.isConfirmed(),
      createdAt: new Date(),
    });

    const savedAudienceEntity = await this.repository.save(audienceEntity);
    return new Audience({
      id: savedAudienceEntity.id,
      name: savedAudienceEntity.name,
      cpf: savedAudienceEntity.cpf,
      email: savedAudienceEntity.email,
      phone: savedAudienceEntity.phone,
      cellphone: savedAudienceEntity.cellphone,
      birth: savedAudienceEntity.birth,
      certificate: savedAudienceEntity.certificate,
      address: savedAudienceEntity.address,
      crm: savedAudienceEntity.crm,
      confirmed: savedAudienceEntity.confirmed,
    });
  }
}
