import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'reset_tokens' })
export class ResetTokenEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  // @ManyToOne(() => UserEntity)
  // @JoinColumn()
  // public user: number;

  @Column({ nullable: false })
  public token_signature: string;

  @Column({ default: false })
  public used_token: boolean;

  @CreateDateColumn({ nullable: false })
  public expired_at: Date;

  @CreateDateColumn()
  @Exclude()
  public createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  public updatedAt: Date;
}
