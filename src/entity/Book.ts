import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm";
import { State } from "./State";

@Entity()
export class Book extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column()
    year: number;

    @Column()
    genres: string;

    @Column()
    rating: number;

    @OneToMany(() => State, state => state.book)
    states: State[];

}
