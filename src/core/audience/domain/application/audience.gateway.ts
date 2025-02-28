import { Audience } from "../audience.entity";

export interface AudienceGateway {
  create(audience: Audience): Promise<Audience>;
  import(audience: Audience[]): Promise<void>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Audience[]>;
  findById(id: string): Promise<Audience>;
  update(audience: Audience): Promise<Audience>;
}
