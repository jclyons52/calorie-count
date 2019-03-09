import { DeepPartial, Repository } from "typeorm";

/**
 * Base factory
 */
export abstract class Factory<T> {

    constructor(protected repository: Repository<T>) {}

    /**
     * Create an entity and DO NOT persist to DB
     */
    public abstract create(entity: Partial<T>): T;

    /**
     * Create an entity and DO persist to DB
     */
    public async make(input: Partial<T> = {}): Promise<T> {
        const entity: T = this.create(input);

        return this.repository.save(entity as any as DeepPartial<T>) as any as T;
    }

    public createManyTimes(count: number, entity: Partial<T> = {}): T[] {
        const range = [...Array(count).keys()];

        return range.map(() => this.create(entity));
    }

    public createMany(entities: Array<Partial<T>>): T[] {
        return entities.map((entity) => this.create(entity));
    }

    public async makeManyTimes(count: number, entity: (() => Promise<Partial<T>>) | Partial<T> = {}): Promise < T[] > {
        const range = [...Array(count).keys()];
        if (typeof entity === "function") {
          return Promise.all(range.map(async () => this.make(await entity())));
        }

        return Promise.all(range.map(() => this.make(entity)));
    }

    public async makeMany(entities: Array<Partial<T>>): Promise<T[]> {
        return Promise.all(entities.map((entity) => this.make(entity)));
    }
}
