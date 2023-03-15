import type {
    RequestGenericInterface,
    FastifyReply,
    FastifyRequest,
} from "fastify";
import type { Server, IncomingMessage, ServerResponse } from "http";

export interface GuildedInviteResponse {
    metadata: RInviteInfo | IInviteInfo | VanityInviteInfo;
}

export interface RInviteInfo {
    recruitingInfo: {
        team: TeamWithoutMeasurements;
    };
}

export interface IInviteInfo {
    inviteInfo: {
        team: TeamWithoutMeasurements;
    };
}

export interface VanityInviteInfo {
    team: {
        id: string;
        name: string;
        measurements: { numMembers: number };
    };
}

export type TeamWithoutMeasurements = Omit<
    VanityInviteInfo["team"],
    "measurements"
> & {
    memberCount: number;
};

export type badgeStyle =
    | "plastic"
    | "flat"
    | "flat-square"
    | "for-the-badge"
    | "social";

// Request object extendable with a route interface like defined above, that way you have fully typed headers, body, queryparams
export type Request<T extends RequestGenericInterface> = FastifyRequest<
    T,
    Server,
    IncomingMessage
>;

// Response object extendable with a route interface like defined above
export type Response = FastifyReply<
    Server,
    IncomingMessage,
    ServerResponse,
    RequestGenericInterface,
    unknown
>;

export type BadgeGetReq = Request<{
    Querystring: { color?: string; style?: string; isVanity?: boolean };
    Params: {
        inviteId: string;
        type: string;
    };
}>;
