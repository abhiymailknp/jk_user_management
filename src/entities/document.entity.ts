import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Entity()
export class Document {
    @PrimaryGeneratedColumn('uuid')
    documentId: string;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    user: User;

    @Column()
    filePath : string;
}