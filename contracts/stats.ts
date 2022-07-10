export interface IHasStats{
    name: string;
    level: number;
    experience?: number;
    strength: number;
    dexterity: number;
    will: number;
    endurance: number;
}
export class HasStatsHandler{
    getStatsCopy(stats: IHasStats): IHasStats{
        return {
            name: stats.name,
            level: stats.level,
            experience: stats.experience,
            strength: stats.strength,
            dexterity: stats.dexterity,
            will: stats.will,
            endurance: stats.endurance,
        }
    }
}