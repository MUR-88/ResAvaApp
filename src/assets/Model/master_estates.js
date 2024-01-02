import { Model } from "@nozbe/watermelondb";
import { date, field, text, immutableRelation, children  } from '@nozbe/watermelondb/decorators'

export default class MasterEstate extends Model {
  static table = "master_estates";
  static associations = {
    masterSector: {
      type: "belongs_to",
      key: "master_sector_id",
    },
    masterLogActivities: {
      type: "has_many",
      foreignKey: "master_estate_id",
    },
  };
  
  @field("id") id;
  @field("name") name;
  @field("master_sector_id") masterSectorId;
  @field("isSync") isSync;
  @field("isConnected") isConnected;
  @date("created_at") createdAt;
  @date("deleted_at") deletedAt;
  @date("updated_at") updatedAt;
  @children('master_log_activities') masterLogActivities;
}
