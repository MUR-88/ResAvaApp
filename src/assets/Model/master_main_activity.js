import { Model } from "@nozbe/watermelondb";
import { date, field, text, immutableRelation, children   } from '@nozbe/watermelondb/decorators'

export default class MasterMainActivities extends Model {
  static table = "master_main_activities";
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
  @field("id_master_main_activities") idMasterMainActivity;
  @field("isSync") isSync;
  @field("isConnected") isConnected;
  @field("created_at") createdAt;
  @field("deleted_at") deletedAt;
  @field("updated_at") updatedAt;
  @children('master_log_activities') masterLogActivities;
}
