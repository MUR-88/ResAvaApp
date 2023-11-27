import { Model } from "@nozbe/watermelondb";
import { date, field, text, immutableRelation, children   } from '@nozbe/watermelondb/decorators'

export default class MasterMainActivitiy extends Model {
  static table = "master_machines";
  static associations = {
    masterLogActivities: {
      type: "has_many",
      foreignKey: "master_main_activity_id",
    },
    masterMachineType: {
      type: "belongs_to",
      key: "master_machine_type_id",
    },
  };

  @field("name") name;
  @field("isSync") isSync;
  @field("isConnected") isConnected;
  @field("created_at") createdAt;
  @field("deleted_at") deletedAt;
  @field("updated_at") updatedAt;
  @children('master_log_activities') masterLogActivities;
}
