import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Task} from './task';

@Entity()
export class Project extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({type: 'text', nullable: true})
    description: string;

    @Column({type: 'text', nullable: true})
    color: string;

    @OneToMany(type => Task, task => task.project, {
        eager: true,
        cascade:  ['remove']
    })
    tasks: Task[];
}