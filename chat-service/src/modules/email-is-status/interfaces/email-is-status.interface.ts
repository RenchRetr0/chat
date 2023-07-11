import { TimestampEntity } from "@common/interfaces/timestamp.entity";

export interface EmailIsStatusProperties extends TimestampEntity
{
    isStatus: boolean;
}