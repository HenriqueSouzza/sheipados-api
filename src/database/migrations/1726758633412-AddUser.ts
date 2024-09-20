import { User } from "../../user/user.entity";
import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUser1726758633412 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.save(
            queryRunner.manager.create(User, {
                email: 'henriquetsi@gmail.com',
                name: 'Henrique Souza',
                password: process.env.PASSWORD_DEFAULT,
                username: 'henriquetsi',
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE * FROM users`);
    }
}
