import { createServerAction$ } from "solid-start/server";
import { login } from "~/server/auth";

export default function Login() {
    let emailinput: any;
    const [, { Form }] = createServerAction$(async (form: FormData, { request }) => {
        const email = form.get("email");
        if (email) {
            return await login(email.toString());
        }
    });
    return (<Form class="h-full bg-sky-700 flex flex-col gap-2 items-center justify-center">
        <input ref={emailinput} class="rounded p-1 w-min" placeholder="myemail@example.com" type="email" name="email" />
        <button class="rounded p-2 text-white bg-blue-950" type="submit">Login</button>
    </Form>);
}
