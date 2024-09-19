import { User } from "@/user/user.entity";
import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUser1726758633412 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.save(
            queryRunner.manager.create(User, {
                email: 'henriquetsi@gmail.com',
                name: 'Henrique Souza',
                password: '1597bdd3b2fb5b7e478b80b073b5d6cc094f4471566388f9899b9f4317c04709',
                username: 'henriquetsi',
                isActive: true,
                firstLogin: true,
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE * FROM users`);
    }
}
