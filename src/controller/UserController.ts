import { AppDataSource } from '../data-source'
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { genSalt, hash, compare } from 'bcrypt'
import { Res } from '..'

export class UserController {

    private userRepository = AppDataSource.getRepository(User)

    async login(request: Request, response: Response, next: NextFunction): Promise<Res> {
        try {
            const { username, password } = request.body;

            const user = await this.userRepository.findOneBy({ username }) // Select * from User where username = username

            // Comparing password
            const isValid = await compare(password, user.password)
            if (!isValid) {
                return {
                    data: null,
                    error: 'Username or password is not valid !',
                    status: 401
                }
            }

            return {
                data: user,
                error: null,
                status: 401
            }
            
        } catch (error) {
            return {
                data: null,
                error: 'Username or password is not valid !',
                status: 401
            }
        }
    }

    async register(request: Request, response: Response, next: NextFunction): Promise<Res> {
        try {
            const { fullname, username, password, email, address } = request.body;

            // Hasing password
            const saltRounds = 10;
            const salt = await genSalt(saltRounds);
            const hashedPassword = await hash(password, salt);

            const user = Object.assign(new User(), {
                fullname,
                username,
                email,
                address,
                password: hashedPassword
            })

            const newUser =  await this.userRepository.save(user)
            return {
                data: newUser,
                error: 'Username or password is not valid !',
                status: 201
            }
        } catch (error) {
            return {
                data: null,
                error: 'Create failed !',
                status: 201
            }
        }
    }

    // async all(request: Request, response: Response, next: NextFunction) {
    //     return this.userRepository.find()
    // }

    // async one(request: Request, response: Response, next: NextFunction) {
    //     const id = parseInt(request.params.id)


    //     const user = await this.userRepository.findOne({
    //         where: { id }
    //     })

    //     if (!user) {
    //         return "unregistered user"
    //     }
    //     return user
    // }

    // async save(request: Request, response: Response, next: NextFunction) {
    //     const { firstName, lastName, age } = request.body;

    //     const user = Object.assign(new User(), {
    //         firstName,
    //         lastName,
    //         age
    //     })

    //     return this.userRepository.save(user)
    // }

    // async remove(request: Request, response: Response, next: NextFunction) {
    //     const id = parseInt(request.params.id)

    //     let userToRemove = await this.userRepository.findOneBy({ id })

    //     if (!userToRemove) {
    //         return "this user not exist"
    //     }

    //     await this.userRepository.remove(userToRemove)

    //     return "user has been removed"
    // }

}