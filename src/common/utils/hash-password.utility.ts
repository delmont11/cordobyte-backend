import * as argon2 from 'argon2';

export function hashPassword(data: string){
  return argon2.hash(data);
}