import { CRMValueObject, CRMValueObjectProps } from "./crm.valueobject";

describe("CRM", () => {
  it("should create a valid CRM entity", () => {
    const input: CRMValueObjectProps = {
      number: "123456",
      uf: "SP",
    };

    const crm = new CRMValueObject(input);

    expect(crm).toBeDefined();
    expect(crm.getNumber()).toBe("123456");
    expect(crm.getUF()).toBe("SP");
  });
});
