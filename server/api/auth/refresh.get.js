import { parseCookies, sendError } from "h3"
import { getRefreshTokenByToken } from "~/server/db/refreshTokens"
import { decodeRefreshToken, generateTokens } from "../../utils/jwt"
import { getUserById } from "~/server/db/users"

export default defineEventHandler(async (event) => {
    const cookies = parseCookies(event)

    const refreshToken = cookies.refresh_token

    if (!refreshToken) {
        return sendError(event, createError({
            statusMessage: "Refresh token is invalid",
            statusCode: 401
        }))
    }

    const rToken = await getRefreshTokenByToken(refreshToken)

    if (!rToken) {
        return sendError(event, createError({
            statusMessage: "Refresh token is invalid",
            statusCode: 401
        }))
    }

    const token = decodeRefreshToken(refreshToken)

    try {
        const user = await getUserById(token.userId)

        const { accessToken } = generateTokens(user)

        return { access_token: accessToken }
    } catch (error) {
        return sendError(event, createError({
            statusMessage: "Something went wrong",
            statusCode: 500
        }))
    }
})