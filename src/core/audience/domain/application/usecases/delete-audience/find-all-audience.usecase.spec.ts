import { DeleteAudienceUseCase } from "./delete-audience.usecase";
import { AudienceGateway } from "../../audience.gateway";
import { Audience } from "../../../audience.entity";
import { randomUUID } from "node:crypto";

const mockAudienceRepository: jest.Mocked<AudienceGateway> = {
  create: jest.fn().mockResolvedValue(undefined),
  import: jest.fn().mockResolvedValue(undefined),
  delete: jest.fn().mockResolvedValue(undefined),
  findAll: jest.fn().mockResolvedValue([]),
  findById: jest.fn().mockResolvedValue(undefined),
  update: jest.fn().mockResolvedValue(undefined),
};

describe("DeleteAudienceUseCase", () => {
  let deleteAudienceUseCase: DeleteAudienceUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    deleteAudienceUseCase = new DeleteAudienceUseCase(mockAudienceRepository);
  });

  it("should delete an audience successfully", async () => {
    const audience = new Audience({
      id: randomUUID(),
      name: "John Doe",
      email: "john@example.com",
      confirmed: true,
    });

    mockAudienceRepository.findById.mockResolvedValueOnce(audience);

    await deleteAudienceUseCase.execute(audience.getId());

    expect(mockAudienceRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockAudienceRepository.findById).toHaveBeenCalledWith(
      audience.getId()
    );

    expect(mockAudienceRepository.delete).toHaveBeenCalledTimes(1);
    expect(mockAudienceRepository.delete).toHaveBeenCalledWith(
      audience.getId()
    );
  });
});
