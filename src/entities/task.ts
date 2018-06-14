import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Project} from './project';

@Entity()
export class Task extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({type: 'text', nullable: true})
    description: string;

    @Column({type: 'date', nullable: true})
    date: Date;

    @Column({type: 'boolean', default: false})
    done: boolean;

    @ManyToOne(type => Project, project => project.tasks, {
        cascade: ['remove']
    })
    project: Project;
}