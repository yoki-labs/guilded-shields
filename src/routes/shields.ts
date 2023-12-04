import type { BadgeGetReq, Response } from "../types";
import { badRequest } from "../util";
import { RedisClientType, RedisModules } from "@redis/client";
import { generateSvg, getMemberCountFromGuilded } from "../controllers/shield";

export const getServerShield = async (
    redis: RedisClientType<RedisModules>,
    req: BadgeGetReq,
    res: Response,
) => {
    const { inviteId, type } = req.params;
    if (!type || !inviteId)
        return badRequest(res, "Missing invite type or invite ID");
    if (!["i", "r", "vanity"].includes(type))
        return badRequest(
            res,
            `Invalid type, must be either 'r', 'i', or 'vanity'. Received ${type}`,
        );
    const color = req.query.color ?? "black";
    const receivedStyle = req.query.style;
    if (receivedStyle) {
        if (
            ![
                "plastic",
                "flat",
                "flat-square",
                "for-the-badge",
                "social",
            ].includes(receivedStyle)
        )
            return badRequest(res, "Invalid style.");
    }

    const cachedBadge = await redis
        .get(`badge:${type}:${inviteId}:${color}:${receivedStyle}`)
        .catch(() => null);
    if (cachedBadge) {
        res.header("Content-Type", "image/svg+xml");
        return res.status(200).send(cachedBadge);
    }

    let memberCount: string | null;
    const cachedGuildedReq = await redis
        .get(`req:${type}:${inviteId}`)
        .catch(() => null);
    if (cachedGuildedReq) memberCount = cachedGuildedReq;
    else {
        const memberCountReq = await getMemberCountFromGuilded(inviteId, type);
        if (!memberCountReq || typeof memberCountReq !== "number")
            return badRequest(
                res,
                'The inviteId provided could not be mapped to a proper url. If this is a vanity URL, you **must** append isVanity=true as a query param (e.x. "?isVanity=true")',
            );

        memberCount = memberCountReq.toString();
        await redis
            .set(`req:${type}:${inviteId}`, memberCount, { EX: 900 })
            .catch(() => void 0);
    }

    const svg = await generateSvg(redis, res, {
        inviteId,
        type,
        msg: memberCount.toString(),
        style: receivedStyle,
        color,
    });

    res.header("Content-Type", "image/svg+xml");
    return res.status(200).send(svg);
};
