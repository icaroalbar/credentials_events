import { AddressValueObject } from "../../../value-objects/address/address.valueobject";
import { CRMValueObject } from "../../../value-objects/crm/crm.valueobject";
import { BrazilianStates } from "../../../value-objects/crm/states-crm";

export interface CreateAudienceInputDTO {
  id: string;
  name?: string;
  cpf?: string;
  email?: string;
  phone?: string;
  cellphone?: string;
  birth?: Date;
  certificate?: string;
  confirmed: boolean;
  address?: AddressValueObject;
  crm?: CRMValueObject;
}

export interface CreateAudienceOutputDTO {
  id: string;
  name?: string;
  cpf?: string;
  email?: string;
  phone?: string;
  cellphone?: string;
  birth?: Date;
  certificate?: string;
  confirmed: boolean;
  address?: {
    city?: string;
    state?: string;
    country?: string;
  };
  crm?: {
    number?: string;
    uf?: BrazilianStates;
  };
}
