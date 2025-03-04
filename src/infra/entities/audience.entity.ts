import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
} from "typeorm";
import { AddressValueObject } from "../../core/audience/domain/value-objects/address/address.valueobject";
import { CRMValueObject } from "../../core/audience/domain/value-objects/crm/crm.valueobject";

@Entity("audience")
export class AudienceEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true, unique: true })
  cpf?: string;

  @Column({ nullable: true, unique: true })
  email?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  cellphone?: string;

  @Column({ type: "date", nullable: true })
  birth?: Date;

  @Column({ nullable: true })
  certificate?: string;

  @Column(() => AddressValueObject)
  address?: AddressValueObject;

  @Column(() => CRMValueObject)
  crm?: CRMValueObject;

  @Column({ default: false })
  confirmed!: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
