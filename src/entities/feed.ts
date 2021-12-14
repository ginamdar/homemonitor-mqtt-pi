import { BaseEntity, Column, CreateDateColumn, Entity, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity({ name: 'Feed' })
export class Feed extends BaseEntity {
    @ObjectIdColumn()
    id: ObjectID;

    @CreateDateColumn({ default: Date.now })
    createdAt: Date;

    @Column({ type: 'text'})
    feedName: string;

    @Column( { type: 'text'})
    feedValue: string;
}

