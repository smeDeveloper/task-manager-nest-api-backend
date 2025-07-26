import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "../user/user.entity";

@Entity("tasks")

export class TaskEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 100, nullable: false,})
    title: string;

    @Column({type: "text", nullable: true,})
    description: string;

    @Column({ type: "varchar" , length: 15, })    
    createdAt: string ;

    @Column({type: "enum",enum:["Low" , "Medium" , "High"],})
    priority: string;

    @Column({type: "boolean", nullable: false,})
    completed: boolean;

    @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user', referencedColumnName: 'id' })
    user: UserEntity;
}; 