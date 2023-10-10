import { APIEvent, redirect } from "solid-start";
import { storage } from "~/server/auth";

export async function GET({ request, }: APIEvent) {
    const session = await storage.getSession(
        request.headers.get("Cookie")
    );
    return redirect("/", {
        headers: {
            "Set-Cookie": await storage.destroySession(session)
        }
    });
}
