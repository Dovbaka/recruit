import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { CategoriesEnum } from '../../user/types/category.enum';
import { UserEntity } from '../../user/entities/user.entity';
import { CustomBaseEntity } from '../../entities/custom-base.entity';

@Entity()
export class AnswerEntity extends CustomBaseEntity {
  @Column({
    type: 'varchar',
    nullable: false,
  })
  question: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  answerText: string;

  @Column({
    type: 'numeric',
    nullable: false,
  })
  answerValue: number;

  @Column({
    type: 'enum',
    enum: CategoriesEnum,
  })
  category: CategoriesEnum;

  @Column({ type: 'varchar' })
  userId: string;
  @ManyToOne(() => UserEntity, ({ answers }) => answers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
