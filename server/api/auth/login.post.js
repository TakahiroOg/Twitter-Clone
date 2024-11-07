import { getUserByUsername } from "~/server/db/users"

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

    // Generate token

    return {
        user: user
    }
})