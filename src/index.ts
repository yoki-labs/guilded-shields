import { Elysia, t } from "elysia";
import { rateLimit } from "elysia-rate-limit";
import { generateSvg, getMemberCount } from "./shields";

const app = new Elysia();
app.use(rateLimit());

app.get(
    "/shields/:type/:inviteId",
    async (ctx) => {
        const { type, inviteId } = ctx.params;
        const { color, style } = ctx.query;

        const memberCount = await getMemberCount(inviteId, type);
        const svg = await generateSvg({
            message: `${memberCount} members`,
            style,
            color: color ?? "black",
        });

        ctx.set = {
            headers: {
                "Content-Type": "image/svg+xml",
            },
        };
        return svg;
    },
    {
        query: t.Object({
            color: t.Optional(t.String()),
            style: t.Optional(t.String()),
        }),
        params: t.Object({
            type: t.Union([
                t.Literal("i"),
                t.Literal("r"),
                t.Literal("vanity"),
            ]),
            inviteId: t.String(),
        }),
    },
);

app.onError((ctx) => {
    if (ctx.error.message === "NOT_FOUND") {
        return {
            failed: true,
            status: "NOT_FOUND",
            error: { message: "404: Route not found." },
        };
    }

    if (ctx.code == "VALIDATION") {
        return {
            failed: true,
            status: "INVALID_REQUEST",
            error: {
                message: ctx.error.message,
            },
        };
    }

    return {
        failed: true,
        status: "INTERNAL_ERROR",
        error: { message: "There was an internal error." },
    };
});

app.listen(7777, () => {
    console.log("Server running!");
});
