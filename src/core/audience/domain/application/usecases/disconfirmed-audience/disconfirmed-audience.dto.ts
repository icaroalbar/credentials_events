import { BrazilianStates } from "../../../value-objects/crm/states-crm";

export interface DisconfirmedAudienceOutputDTO {
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
