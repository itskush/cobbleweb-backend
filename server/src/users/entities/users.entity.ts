import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, TableInheritance, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';

@Entity()
@TableInheritance({column: {type: 'varchar', name: 'client'}})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 25})
  firstName: string;

  @Column({length: 25})  
  lastName: string;

  @Column({unique: true})
  email: string;
  
  @Column()
  password: string;

  @Column({ nullable: true})
  role: string;

  @Column({default: true})
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  
  @BeforeInsert()
  async hashPassword(): Promise<void> {
      try {
        this.password = await bcrypt.hash(this.password, 10)

      } catch (e) {
        throw new InternalServerErrorException('there are some issiue hasing the password')
      }
  }
}
