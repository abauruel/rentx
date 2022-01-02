import { AppError } from "@errors/AppError"
import { ICreateUserDTO } from "../dtos/ICreateUserDTO"
import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-Memory/UsersRepositoryInMemory"
import { AuthenticateUserUseCase } from "./authenticateUserUseCase"
import { CreateUserUseCase } from "./CreateUser/CreateUserUseCase"

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UserRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UserRepositoryInMemory()
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory)
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "000123",
      email: "user@teste.com",
      password: "1234",
      name: "User test"
    }

    await createUserUseCase.execute(user)
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    })
    expect(result).toHaveProperty("token")
  })

  it("should not to be able to authenticate an nonexistent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "user@teste.com",
        password: "12354365"
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to authenticate with incorrect password", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "000123",
        email: "user@teste.com",
        password: "1234",
        name: "User test"
      }

      await createUserUseCase.execute(user)
      await authenticateUserUseCase.execute({
        email: user.email,
        password: "1111"
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})