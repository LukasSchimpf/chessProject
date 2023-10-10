import {
    StartServer,
    createHandler,
    renderAsync,
} from "solid-start/entry-server";
import { getUserId, storage } from "~/server/auth";
import { redirect } from "solid-start";
const protectedPaths: string[] = [];
export default createHandler(
    ({ forward }) => {
        return async event => {
            if (protectedPaths.includes(new URL(event.request.url).pathname)) {
                const user = await getUserId(event.request);
                if (!user) {
                    return redirect("/login"); // a page for a non logged in user
                }
            }
            return forward(event); // if we got here, and the pathname is inside the `protectedPaths` array - a user is logged in
        };
    },

    renderAsync((event) => <StartServer event={event} />)
);
