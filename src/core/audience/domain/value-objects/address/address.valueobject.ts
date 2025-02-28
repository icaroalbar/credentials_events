export type AddressValueObjectProps = {
  city?: string;
  state?: string;
  country?: string;
};

export class AddressValueObject {
  private _address: AddressValueObjectProps;

  constructor(props: AddressValueObjectProps) {
    this._address = props;
  }

  getCity(): string | undefined {
    return this._address.city;
  }

  getState(): string | undefined {
    return this._address.state;
  }

  getCountry(): string | undefined {
    return this._address.country;
  }
}
