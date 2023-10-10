import nodemailer from "nodemailer";
import { randomBytes } from "crypto";
import { createSessionStorage, redirect } from 'solid-start';
import { prisma } from "~/../prisma/prisma";

export const storage = createSessionStorage({
    cookie: {
        name: "session",
        secure: import.meta.env.PROD,
        secrets: [import.meta.env.VITE_SESSION_SECRET],
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
        httpOnly: true
    },
    async createData(data: any, expires) {
        const id = randomBytes(32).toString('hex');
        await prisma.session.create({ data: { id, ...data, expires } });
        return id;
    },
    async updateData(id, data, expires) {
        await prisma.session.update({ where: { id }, data: { ...data, expires } });
    },
    async deleteData(id) {
        try {

            await prisma.session.delete({ where: { id } });
        } catch (e) {
            console.log(e);
        }
    },
    async readData(id) {
        return await prisma.session.findFirst({ where: { id } });
    }
});
const transporter = nodemailer.createTransport({
    host: "smtp.zoho.eu",
    port: 587,
    auth: {
        user: import.meta.env.VITE_EMAIL_USER, //user: "apikey", // use "apikey" instead of the username
        pass: import.meta.env.VITE_EMAIL_APP_PASSWORD, // your API key as the password
    },
});

export async function sendSignupVerificationEmail(email: string, link: string) {
    const mailOptions = {
        from: import.meta.env.VITE_EMAIL_USER,
        to: email,
        subject: "Email Verification and Login",
        text: "Paste this link into your browser to verify your email and login: \n" + link + "\n",
        html: "Click the link below to verify your email and login: <br/> <a href=\"" + link + "\">" + link + "</a> <br/> Or paste this link into your browser.",
    };
    transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
            console.log("Error occurred: ", error);
        } else {
            console.log("Message sent: ", info.messageId);
        }
    });
}

export async function sendLoginVerificationEmail(email: string, link: string) {
    const mailOptions = {
        from: import.meta.env.VITE_EMAIL_USER,
        to: email,
        subject: "Login Authorization",
        text: "Paste this link into your browser to login: \n" + link + "\n",
        html: "Click the link below to login: <br/> <a href=\"" + link + "\">" + link + "</a> <br/> Or paste this link into your browser.",
    };
    transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
            console.log("Error occurred: ", error);
        } else {
            console.log("Message sent: ", info.messageId);
        }
    });
}
export async function getUserId(request: Request) {
    const session = await storage.getSession(
        request.headers.get("Cookie")
    );
    const userId = session.get("userId");
    return userId;

}

export async function signup(email?: string) {
    console.log("working till here");
    if (!email) {
        return Error();
    }
    if (typeof email !== "string") {
        return Error();
    }
    if (!email.includes("@") || !email.includes(".")) {
        return Error("Malformed Email Address");
    }
    const challenge = randomBytes(32).toString("hex");
    const challengeExpiry = Date.now() + 15 * 60 * 1000;
    try {
        const user = await prisma.user.create({
            data: {
                email,
                challenge,
                challengeExpiry
            }
        });
        sendSignupVerificationEmail(email, (import.meta.env.PROD ? "https://" : "http://") + import.meta.env.VITE_HOST_NAME + "/verifylink?token=" + challenge);
        return redirect("/checkmail");
    } catch (e) {
        return Error();
    }
}
export async function login(email?: string) {
    if (!email) {
        return Error();
    }
    if (typeof email !== "string") {
        return Error();
    }
    if (!email.includes("@") || !email.includes(".")) {
        return Error("Malformed Email Address");
    }
    const challenge = randomBytes(32).toString("hex");
    const challengeExpiry = Date.now() + 15 * 60 * 1000;
    const user = await prisma.user.update({
        data: {
            challenge,
            challengeExpiry
        },
        where: {
            email
        }
    });
    if (!user) {
        return Error();
    }
    await sendLoginVerificationEmail(email, (import.meta.env.PROD ? "https://" : "http://") + import.meta.env.VITE_HOST_NAME + "/verifylink?token=" + challenge);
    return redirect("/checkmail");
}
export async function logout(request: Request) {
    const session = await storage.getSession(
        request.headers.get("Cookie")
    );
    const currentsession = await storage.destroySession(session);
    return redirect("/login", {
        headers: {
            "Set-Cookie": currentsession
        }
    });
}
