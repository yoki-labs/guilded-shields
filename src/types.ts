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
        measurements?: { numMembers: number };
        memberCount: number;
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
