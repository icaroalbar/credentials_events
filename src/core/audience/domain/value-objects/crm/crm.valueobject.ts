import { BrazilianStates } from "./states-crm";

export type CRMValueObjectProps = {
  number?: string;
  uf?: BrazilianStates;
};

export class CRMValueObject {
  private _crm: CRMValueObjectProps;

  constructor(props: CRMValueObjectProps) {
    this._crm = props;
  }

  getNumber(): string | undefined {
    return this._crm.number;
  }

  getUF(): BrazilianStates | undefined {
    return this._crm.uf;
  }
}
