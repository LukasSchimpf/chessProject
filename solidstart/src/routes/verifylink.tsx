import { APIEvent, redirect } from "solid-start";
import { prisma } from "~/../prisma/prisma";
import { storage } from "~/server/auth";

export async function GET({ request }: APIEvent) {
    const token = new URL(request.url).searchParams.get("token");
    if (!token) {
        return new Error("No token supplied");
    }
    const user = await prisma.user.findFirst({
        where: {
            challenge: token
        }
    });
    if (!user) {
        return new Error("An Error Occurred");
    }
    if (!user.challengeExpiry) {
        return new Error("An Error Occurred");
    }
    if (user.challengeExpiry < Date.now()) {
        await prisma.user.update({
            data: {
                challenge: null,
                challengeExpiry: null
            },
            where: {
                id: user.id
            }
        });
        return new Error("Link Expired");
    }
    const session = await storage.getSession();
    session.set("userId", user.id);
    const currentsession = await storage.commitSession(session);
    return redirect("/app", {
        headers: {
            "Set-Cookie": currentsession
        }
    });
}
