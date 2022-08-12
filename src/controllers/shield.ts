import { RedisClientType, RedisModules } from "@redis/client";
import { makeBadge } from "badge-maker";
import fetch from "node-fetch";
import type {
    badgeStyle,
    GuildedInviteResponse,
    IInviteInfo,
    Response,
    RInviteInfo,
    VanityInviteInfo,
} from "../types";
import { internalError } from "../util";

export const getMemberCountFromGuilded = async (
    inviteId: string,
    type: string,
) => {
    const url = `https://www.guilded.gg/api/content/route/metadata?route=${encodeURIComponent(
        `/${type}/${inviteId}`,
    )}`;
    const guildedRequest = await fetch(url);

    if (!guildedRequest.ok) {
        console.error(await guildedRequest.text());
        return null;
    }

    const data = (await guildedRequest.json()) as GuildedInviteResponse;
    if (!data.metadata) return null;

    let returnData;
    if (type === "vanity")
        returnData = (data.metadata as VanityInviteInfo)?.team?.measurements
            ?.numMembers;
    else if (type === "i")
        returnData = (data.metadata as IInviteInfo)?.inviteInfo?.team
            ?.measurements?.numMembers;
    else if (type === "r")
        returnData = (data.metadata as RInviteInfo)?.recruitingInfo?.team
            ?.measurements?.numMembers;
    return returnData;
};

export const generateSvg = async (
    redis: RedisClientType<RedisModules>,
    res: Response,
    {
        type,
        inviteId,
        msg,
        style,
        color,
    }: {
        type: string;
        inviteId: string;
        msg: string;
        style?: string;
        color: string;
    },
) => {
    try {
        const svg = makeBadge({
            color,
            labelColor: "#F5C400",
            style: (style as badgeStyle) ?? "plastic",
            label: "Guilded",
            message: `${msg} members`,
        });
        await redis.set(`badge:${type}:${inviteId}:${color}:${style}`, svg, {
            EX: 900,
        });
        return svg;
    } catch (e) {
        return internalError(res, (e as Error).message);
    }
};
