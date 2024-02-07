import { Model } from "@nozbe/watermelondb";
import {
  date,
  field,
  text,
  immutableRelation,
  action,
  children,
  writer,
  readonly
} from "@nozbe/watermelondb/decorators";

export default class MasterCompany extends Model {
  static table = "master_company";
  static associations = {
    masterLogActivities: {
      type: "has_many",
      foreignKey: "master_company_id",
    },
    masterMachines: {
      type: "has_many",
      foreignKey: "master_company_id",
    },
    user: {
      type: "belongs_to",
      key: "user_id",
    },
  };
  @children("master_log_activities") master_log_activities;
  @field("id_master_company") id_master_company;
  @field("name") name;
  @date("created_at") createdAt;
  @date("deleted_at") deletedAt;
  @date("updated_at") updatedAt;
  @field("last_pull_at") last_pull_at;

  
  
}