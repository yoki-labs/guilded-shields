import { makeBadge } from "badge-maker";
import {
    GuildedInviteResponse,
    IInviteInfo,
    RInviteInfo,
    VanityInviteInfo,
    badgeStyle,
} from "./types";

export async function getMemberCount(
    inviteId: string,
    type: string,
): Promise<number | null> {
    const url = `https://www.guilded.gg/api/content/route/metadata?route=${encodeURIComponent(
        type === "vanity" ? `/${inviteId}` : `/${type}/${inviteId}`,
    )}`;
    const guildedRequest = await fetch(url);

    if (!guildedRequest.ok) {
        console.error(await guildedRequest.text());
        return null;
    }

    const data = (await guildedRequest.json()) as GuildedInviteResponse;
    const metadata = data.metadata;
    if (!metadata) return null;

    switch (type) {
        case "vanity": {
            const team = (metadata as VanityInviteInfo)?.team;
            if ("measurements" in team)
                return team?.measurements?.numMembers ?? null;
            else return team?.memberCount ?? null;
        }
        case "i": {
            return (metadata as IInviteInfo)?.inviteInfo?.team?.memberCount;
        }
        case "r": {
            return (metadata as RInviteInfo)?.recruitingInfo?.team?.memberCount;
        }
        default: {
            return null;
        }
    }
}

export async function generateSvg(options: {
    message: string;
    style?: string;
    color: string;
}) {
    const { message, style, color } = options;
    const svg = makeBadge({
        color,
        labelColor: "#F5C400",
        style: (style as badgeStyle) ?? "plastic",
        label: "Guilded",
        message,
    });
    return svg;
}
