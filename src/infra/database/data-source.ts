import "reflect-metadata";
import { DataSource } from "typeorm";
import { AudienceEntity } from "../entities/audience.entity";

const isTestEnv = process.env.NODE_ENV === "test";

const AppDataSource = new DataSource({
  type: "postgres",
  host: isTestEnv ? "localhost" : process.env.DB_HOST || "localhost",
  port: isTestEnv ? 5433 : Number(process.env.DB_PORT) || 5432,
  username: isTestEnv ? "test_user" : process.env.DB_USER || "postgres",
  password: isTestEnv ? "test_pass" : process.env.DB_PASS || "postgres",
  database: isTestEnv ? "test_db" : process.env.DB_NAME || "credentials_events",
  synchronize: false,
  logging: false,
  entities: [AudienceEntity],
  migrations: ["src/infra/database/migrations/*.ts"],
});

export default AppDataSource;
