import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { UserTokenEntity } from '../entities';

@EntityRepository(UserTokenEntity)
export class UserTokensRepository extends Repository<UserTokenEntity> {}
