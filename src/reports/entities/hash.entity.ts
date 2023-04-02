import { AutoMap } from "@automapper/classes";
import { Exclude } from "class-transformer";
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    RelationId,
    UpdateDateColumn,
} from 'typeorm';
import { ReportEntity } from "./report.entity";

@Entity({ name: 'hashes', synchronize: true })
export class HashEntity {
    @AutoMap()
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @AutoMap()
    @Column({ type: 'varchar', length: 255, nullable: false })
    public hash: string;

    @AutoMap()
    @Column()
    public report_id: string;

    @ManyToOne(
        () => ReportEntity,
        (ReportEntity) => ReportEntity.hashes,
    )
    @JoinColumn()
    public report: ReportEntity;

    @CreateDateColumn({ type: 'timestamptz', precision: 1 })
    @Exclude()
    public created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz', precision: 1 })
    @Exclude()
    public updated_at: Date;

    @DeleteDateColumn({ type: 'timestamptz', precision: 1 })
    @Exclude()
    public deleted_at: Date;
}