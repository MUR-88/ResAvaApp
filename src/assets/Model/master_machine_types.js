import { Model } from "@nozbe/watermelondb";
import { date, field, text, immutableRelation, children  } from '@nozbe/watermelondb/decorators'

export default class MasterMachineType extends Model {
  static table = "master_machine_types";
  static associations = {
    masterMainActivity: {
      type: "has_many",
      foreignKey: "master_machine_type_id",
    },
    masterLogActivities: {
      type: "has_many",
      foreignKey: "master_machine_type_id",
    },
  };
  
  @field("id") id;
  @field("name") name;
  @date("created_at") createdAt;
  @date("deleted_at") deletedAt;
  @date("updated_at") updatedAt;
  @children('master_main_activities') masterMainActivity;
  @children('master_log_activities') masterLogActivities;
}
