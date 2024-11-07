import { getUserByUsername } from "~/server/db/users"
import bcrypt from "bcrypt"
import { generateTokens } from "~/server/utils/jwt"
import { createRefreshToken } from "~/server/db/refreshTokens"
import { userTransformer } from "~/server/transformers/user"
import { sendError } from "h3"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { username, password } = body

    if (!username || !password) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: "invalild param"
        }))
    }

    // Is user registered
    const user = await getUserByUsername(username)

    if (!user) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: "Username or password is invalid"
        }))
    }

    // compare password
    const doesThePasswordMatch = await bcrypt.compare(password, user.password
    )

    if (!doesThePasswordMatch) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: "Username or password is invalid"
        }))
    }

    // Generate token
    // Access token
    // Refresh token
    const { accessToken, refreshToken } = generateTokens(user)

    // Save it inside db
    await createRefreshToken({
        token: refreshToken,
        userId: user.id
    })

    // Add http only cookie
    sendRefreshToken(event, refreshToken)

    return {
        access_token: accessToken, user: userTransformer(user)
    }
})