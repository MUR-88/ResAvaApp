import { Model } from "@nozbe/watermelondb";
import { date, field, text, immutableRelation, children  } from '@nozbe/watermelondb/decorators'

export default class MasterSector extends Model {
  static table = "master_sector";
  static associations = {
    masterEstates: { 
      type: 'has_many', 
      oreignKey: 'master_sector_id' 
    },
    masterLogActivities: { 
      type: 'has_many', 
      foreignKey: 'master_sectos_id' 
    },
  };
  @field("name") name;
  @field("isSync") isSync;
  @field("isConnected") isConnected;
  @field("created_at") createdAt;
  @field("deleted_at") deletedAt;
  @field("updated_at") updatedAt;
  @children('master_estates') masterEstates;
  @children('master_log_activities') masterLogActivities;
}
