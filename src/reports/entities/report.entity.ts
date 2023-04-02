import { AutoMap } from '@automapper/classes';
import { Exclude } from 'class-transformer';
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
import { HashEntity } from './hash.entity';
import { AddressEntity } from 'src/addresses/entities/address.entity';

@Entity({ name: 'reports', synchronize: true })
export class ReportEntity {
    @AutoMap()
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @AutoMap()
    @Column({ type: 'varchar', nullable: false })
    public address_id: string;

    @ManyToOne(
        () => AddressEntity,
        (AddressEntity) => AddressEntity.report,
    )
    @JoinColumn()
    public address: AddressEntity;    

    @AutoMap()
    @Column({ default: 'pendiente', nullable: false })
    public status: string;

    @AutoMap()
    @Column({ default: false, nullable: false })
    public is_payed: boolean;

    @OneToMany(
        () => HashEntity,
        (HashEntity) => HashEntity.report,
        { eager: true },
    )
    @JoinColumn()
    @Exclude()
    public hashes: HashEntity[];

    @AutoMap()
    @Exclude()
    @Column({ length: 10000, nullable: true })
    public refreshToken: string;

    @CreateDateColumn({ type: 'timestamptz', precision: 1 })
    // @Exclude()
    public created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz', precision: 1 })
    @Exclude()
    public updated_at: Date;

    @DeleteDateColumn({ type: 'timestamptz', precision: 1 })
    @Exclude()
    public deleted_at: Date;
}