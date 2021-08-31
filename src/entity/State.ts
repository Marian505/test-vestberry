import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, UpdateDateColumn, CreateDateColumn, ManyToOne } from "typeorm";
import { Book } from "./Book";

@Entity()
export class State extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    state: string;

    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Book, book => book.states, {onDelete:'CASCADE'})
    book: Book;
}
