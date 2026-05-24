import jwt from "jsonwebtoken";

// TODO: .env

export function createAccessToken(user) {
    return jwt.sign(
        {
            userId: user.id,
        },
        //process.env.JWT_SECRET,
        "SECRET",
        {
            expiresIn: "15m",
        },
    );
}

export function createRefreshToken(user) {
    return jwt.sign(
        {
            userId: user.id,
        },
        //process.env.REFRESH_SECRET,
        "REFRESHSECRET",
        {
            expiresIn: "7d",
        },
    );
}
