import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAudienceTable1740706557369 implements MigrationInterface {
    name = 'CreateAudienceTable1740706557369'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "audience" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "cpf" character varying, "email" character varying, "phone" character varying, "cellphone" character varying, "birth" date, "certificate" character varying, "confirmed" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_967377f436607e43829d4511ac0" UNIQUE ("cpf"), CONSTRAINT "UQ_b429208a68691b4c3e01b89cd27" UNIQUE ("email"), CONSTRAINT "PK_2ecf18dc010ddf7e956afd9866b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "audience"`);
    }

}
