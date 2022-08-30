import {
    DeleteDateColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    Entity,
  } from "typeorm";
  
  export abstract class AbstractEntity extends BaseEntity {
    @CreateDateColumn({
      name: "created_at",
      type: "timestamptz",
      precision: 0,
    })
    public createdAt: Date;
  
    @UpdateDateColumn({
      name: "updated_at",
      type: "timestamptz",
      precision: 0,
    })
    public updatedAt: Date;
  
    @DeleteDateColumn({
      name: "deleted_at",
      type: "timestamptz",
      precision: 0,
      nullable: true,
      default: null,
    })
    public deletedAt?: Date = null;
  
    /**
     * Delete an Entity.
     */
    public delete(): void {
      this.deletedAt = new Date();
    }
  
    /**
     * Check if an Entity has been deleted or not.
     */
    public isDeleted(): boolean {
      return this.deletedAt != null;
    }
  }
  