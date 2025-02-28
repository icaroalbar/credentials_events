import { AddressValueObject } from "./value-objects/address/address.valueobject";
import { CRMValueObject } from "./value-objects/crm/crm.valueobject";

export type AudienceProps = {
  readonly id: string;
  name?: string;
  cpf?: string;
  email?: string;
  phone?: string;
  cellphone?: string;
  birth?: Date;
  certificate?: string;
  address?: AddressValueObject;
  crm?: CRMValueObject;
  confirmed: boolean;
};

export class Audience {
  private _audience: AudienceProps;

  constructor(audience: AudienceProps) {
    this._audience = audience;
  }

  getId(): string {
    return this._audience.id;
  }

  getName(): string | undefined {
    return this._audience.name;
  }

  getCpf(): string | undefined {
    return this._audience.cpf;
  }

  getEmail(): string | undefined {
    return this._audience.email;
  }

  getPhone(): string | undefined {
    return this._audience.phone;
  }

  getCellphone(): string | undefined {
    return this._audience.cellphone;
  }

  getBirth(): Date | undefined {
    return this._audience.birth;
  }

  getCertificate(): string | undefined {
    return this._audience.certificate;
  }

  getAddress(): AddressValueObject {
    return this._audience.address!;
  }

  getCrm(): CRMValueObject {
    return this._audience.crm!;
  }

  isConfirmed(): boolean {
    return this._audience.confirmed;
  }

  confirmed(): void {
    this._audience.confirmed = true;
  }

  disconfirmed(): void {
    this._audience.confirmed = false;
  }
}
