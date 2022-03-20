import "dotenv/config";
import fastify, { FastifyInstance } from "fastify";
import { getServerShield } from "./routes/shields";
import type { Server, IncomingMessage, ServerResponse } from "http";
import { createClient, RedisClientType, RedisModules } from "redis";
import { BadgeGetReq } from "./types";
const server: FastifyInstance = fastify<Server, IncomingMessage, ServerResponse>();
const redis = createClient({
    url: process.env.REDIS_URL ?? undefined,
}) as RedisClientType<RedisModules>;

// eslint-disable-next-line @typescript-eslint/no-var-requires
server.register(require("fastify-rate-limit"), {
    max: 100,
    timeWindow: "1 minute",
});

server.get("/shields/:type/:inviteId", (req: BadgeGetReq, res) => getServerShield(redis, req, res).catch(console.error));

server.all("*", {}, (_req, res) => {
    res.status(404).send({
        failed: true,
        status: "NOT_FOUND",
        error: { message: "404: Route not found." },
    });
    return void 0;
});

server.listen(process.env.PORT ?? 80, "0.0.0.0", async (e) => {
    if (e) throw e;
    await redis.connect();
    return console.log("Server started!");
});
