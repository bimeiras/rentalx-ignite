import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../../../errors/AppError";
import { UsersRepository } from "../../../../modules/accounts/infra/repositories/UsersRepository";

interface IPayload {
    sub: string
}

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization

    if (!authHeader) {
        throw new AppError("Missing token!", 401)
    }

    const [, token] = authHeader.split(" ")

    try { 
        const { sub: user_id } = verify(token, "9a887b47a529519a8e1ab388eabc25c1") as IPayload

        const usersRepository = new UsersRepository()

        const user = usersRepository.findById(user_id)

        if(!user) {
            throw new AppError("User does not exists!", 401)
        }

        request.user = { 
            id: user_id
        }

        next()

    } catch {
        throw new AppError("Invalid token", 401)
    }

}