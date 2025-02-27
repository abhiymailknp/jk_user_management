
import { Role } from "src/constants/constants";
import { encryptHashPassword, genRandomString } from "src/utils/appUtil";
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    userId: string;

    @Column()
    fullName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.viewer
    })
    role: Role;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @BeforeInsert()
    async hashPassword() {
        const salt = this.salt = await genRandomString(10);
		this.salt = salt;
		this.password = await encryptHashPassword(this.password, salt);
    }

    @BeforeUpdate()
    async hashPasswordUpdate() {
        if (this.password) {
            this.password = await encryptHashPassword(this.password, this.salt);
        }
    }
}