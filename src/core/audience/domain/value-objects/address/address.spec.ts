import {
  AddressValueObject,
  AddressValueObjectProps,
} from "./address.valueobject";

describe("Address", () => {
  it("should create a valid Address entity", () => {
    const input: AddressValueObjectProps = {
      city: "São Paulo",
      state: "SP",
      country: "Brazil",
    };

    const address = new AddressValueObject(input);

    expect(address).toBeDefined();
    expect(address.getCity()).toBe("São Paulo");
    expect(address.getState()).toBe("SP");
    expect(address.getCountry()).toBe("Brazil");
  });
});
