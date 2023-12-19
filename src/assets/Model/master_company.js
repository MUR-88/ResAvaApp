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
  // const postMasterCompanies = database.get('master_companies');
  @field("id_master_companies") id_master_companies;
  @field("name") name;
  @field("isSync") isSync;
  @field("isConnected") isConnected;
  @date("created_at") createdAt;
  @date("deleted_at") deletedAt;
  @date("deleted_at") updatedAt;
  @field("last_pull_at") last_pull_at;

  // @children("master_log_activities") masterLogActivities;
  // @children("master_machines") masterMachines;

  // @action async getMasterCompanies() {
  //   return {
  //     id_master_companies : this.id_master_companies,
  //     name : this.name,
  //     isSync : this.isSync,
  //     isConnected : this.isConnected,
  //     created_at : this.created_at,
  //     deleted_at : this.deleted_at,
  //     deleted_at : this.deleted_at 
  //   };
  // }
  
}