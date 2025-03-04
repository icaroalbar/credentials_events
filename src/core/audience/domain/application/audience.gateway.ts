import { Audience } from "../audience.entity";

export interface AudienceGateway {
  create(audience: Audience): Promise<Audience>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Audience>;
  findAll(): Promise<Audience[]>;
  // update(id: string, audience: Audience): Promise<Audience>;
  // import(audience: Audience[]): Promise<void>;
}
