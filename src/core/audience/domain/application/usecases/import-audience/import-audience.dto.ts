import { AddressValueObject } from "../../../value-objects/address/address.valueobject";
import { CRMValueObject } from "../../../value-objects/crm/crm.valueobject";

export interface ImportAudienceInputDTO {
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
