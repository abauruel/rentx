import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UserRepositoryInMemory implements IUsersRepository {
  users: User[] = []

  async create(data: ICreateUserDTO): Promise<void> {
    const user = new User()
    Object.assign(user, {
      ...data
    })

    this.users.push(user)
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find(u => u.email == email)
  }

  async findById(user_id: string): Promise<User> {
    return this.users.find(user => user.id == user_id)
  }

}

export { UserRepositoryInMemory }