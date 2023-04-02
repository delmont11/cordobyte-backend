import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { ResetTokenEntity } from '../entities/reset-token.entity';

@EntityRepository(ResetTokenEntity)
export class ResetTokensRepository extends Repository<ResetTokenEntity> {}
