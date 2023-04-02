import { AutoMap } from '@automapper/classes';
import { Exclude } from 'class-transformer';
import { ReportEntity } from 'src/reports/entities/report.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    RelationId,
    UpdateDateColumn,
} from 'typeorm';

@Entity('addresses')
export class AddressEntity {
    @AutoMap()
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @AutoMap()
    @Column({ type: 'varchar'})
    public address: string;

    @OneToMany(
        () => ReportEntity,
        (ReportEntity) => ReportEntity.address,
        { eager: true },
    )
    @JoinColumn()
    @Exclude()
    public report: ReportEntity[];

    @AutoMap()
    @Exclude()
    @Column({ length: 10000, nullable: true })
    public refreshToken: string;

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
