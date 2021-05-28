import { EntityRepository, Repository } from 'typeorm';
import { CredentialsAuthDTO } from '../dto/credentials-auth.dto';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createAndSave(credentialsAuthDTO: CredentialsAuthDTO): Promise<void> {
    const { username, password } = credentialsAuthDTO;

    const newUser = this.create({
      username,
      password,
    });

    await this.save(newUser);
  }

  async findUserByUsername(username: string): Promise<User | undefined> {
    return this.findOne({ username });
  }
}
