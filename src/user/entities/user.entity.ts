import { Column, Entity, OneToMany } from 'typeorm';
import { AnswerEntity } from '../../answer/entities/answer.entity';
import { CustomBaseEntity } from '../../entities/custom-base.entity';

class NumericTransformer {
  to(data: number): number {
    return data;
  }

  from(data: string): number {
    return parseFloat(data);
  }
}

@Entity()
export class UserEntity extends CustomBaseEntity {
  @Column({
    type: 'varchar',
  })
  firstName: string;

  @Column({
    type: 'varchar',
  })
  lastName: string;

  @Column({
    type: 'varchar',
  })
  email: string;

  @Column({
    type: 'varchar',
  })
  phoneNumber: string;

  @Column({
    type: 'integer',
  })
  role: number;

  @Column({
    type: 'varchar',
  })
  status: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  cvUrl: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  cvName: string;

  @Column({
    type: 'varchar',
  })
  comment: string;

  @Column({
    type: 'numeric',
    transformer: new NumericTransformer(),
  })
  experience: number;

  @Column({
    type: 'numeric',
    transformer: new NumericTransformer(),
  })
  qualification: number;

  @Column({
    type: 'numeric',
    transformer: new NumericTransformer(),
  })
  selfSufficiency: number;

  @Column({
    type: 'numeric',
    transformer: new NumericTransformer(),
  })
  stressTolerance: number;

  @Column({
    type: 'numeric',
    transformer: new NumericTransformer(),
  })
  communicability: number;

  @Column({
    type: 'numeric',
    transformer: new NumericTransformer(),
  })
  creativity: number;

  @Column({
    type: 'numeric',
    transformer: new NumericTransformer(),
  })
  rationality: number;

  @OneToMany(() => AnswerEntity, ({ user }) => user, {
    cascade: true,
  })
  answers: AnswerEntity[];
}
