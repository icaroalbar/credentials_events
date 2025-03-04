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

  async delete(id: string): Promise<void> {
    const audience = await this.repository.findOne({ where: { id } });

    if (!audience) {
      throw new Error(`Convidado não existe`);
    }

    await this.repository.delete(id);
  }

  async findById(id: string): Promise<Audience> {
    const audience = await this.repository.findOne({ where: { id } });

    if (!audience) {
      throw new Error(`Convidado não existe`);
    }

    return new Audience({
      id: audience.id,
      name: audience.name,
      cpf: audience.cpf,
      email: audience.email,
      phone: audience.phone,
      cellphone: audience.cellphone,
      birth: audience.birth,
      certificate: audience.certificate,
      address: audience.address,
      crm: audience.crm,
      confirmed: audience.confirmed,
    });
  }

  async findAll(): Promise<Audience[]> {
    const audiences = await this.repository.find();

    return audiences.map(
      (audience) =>
        new Audience({
          id: audience.id,
          name: audience.name,
          cpf: audience.cpf,
          email: audience.email,
          phone: audience.phone,
          cellphone: audience.cellphone,
          birth: audience.birth,
          certificate: audience.certificate,
          address: audience.address,
          crm: audience.crm,
          confirmed: audience.confirmed,
        })
    );
  }

  // async update(id: string, audience: Partial<Audience>): Promise<Audience> {
  //   const existingAudience = await this.repository.findOne({ where: { id } });

  //   if (!existingAudience) {
  //     throw new Error("Convidado não existe");
  //   }

  //   const updatedData = {
  //     name: audience.getName?.() ?? existingAudience.name,
  //     cpf: audience.getCpf?.() ?? existingAudience.cpf,
  //     email: audience.getEmail?.() ?? existingAudience.email,
  //     phone: audience.getPhone?.() ?? existingAudience.phone,
  //     cellphone: audience.getCellphone?.() ?? existingAudience.cellphone,
  //     birth: audience.getBirth?.() ?? existingAudience.birth,
  //     certificate: audience.getCertificate?.() ?? existingAudience.certificate,
  //     address: audience.getAddress?.() ?? existingAudience.address,
  //     crm: audience.getCrm?.() ?? existingAudience.crm,
  //     confirmed: audience.isConfirmed?.() ?? existingAudience.confirmed,
  //     updatedAt: new Date(),
  //   };

  //   const updatedAudience = this.repository.merge(
  //     existingAudience,
  //     updatedData
  //   );
  //   const savedAudience = await this.repository.save(updatedAudience);

  //   return new Audience({
  //     id: savedAudience.id,
  //     name: savedAudience.name,
  //     cpf: savedAudience.cpf,
  //     email: savedAudience.email,
  //     phone: savedAudience.phone,
  //     cellphone: savedAudience.cellphone,
  //     birth: savedAudience.birth,
  //     certificate: savedAudience.certificate,
  //     address: savedAudience.address,
  //     crm: savedAudience.crm,
  //     confirmed: savedAudience.confirmed,
  //   });
  // }
}
