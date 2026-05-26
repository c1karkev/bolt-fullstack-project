import jwt from "jsonwebtoken";

// TODO: .env

export function createAccessToken(userId) {
    return jwt.sign(
        {
            userId: userId,
        },
        //process.env.JWT_SECRET,
        "SECRET",
        {
            expiresIn: "15m",
        },
    );
}

export function createRefreshToken(userId) {
    return jwt.sign(
        {
            userId: userId,
        },
        //process.env.REFRESH_SECRET,
        "REFRESHSECRET",
        {
            expiresIn: "7d",
        },
    );
}

export function refreshToken(token) {
    try {
        const decoded = jwt.verify(token, "REFRESHSECRET");
        const accessToken = createAccessToken(decoded.userId);
        return accessToken;
    } catch (err) {
        throw new Error(err);
    }
}

export function verifyToken(token) {
    const payload = jwt.verify(token, "SECRET");
    return payload;
}
