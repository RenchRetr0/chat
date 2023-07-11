import { TimestampEntity } from "@common/interfaces/timestamp.entity";

export interface ProfielProperties extends TimestampEntity
{
    firstname: string;
    lastname: string;
}