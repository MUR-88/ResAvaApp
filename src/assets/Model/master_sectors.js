import { Model } from "@nozbe/watermelondb";
import { date, field, text, immutableRelation, children  } from '@nozbe/watermelondb/decorators'

export default class MasterSector extends Model {
  static table = "master_sectors";
  static associations = {
    masterSector: {
      type: 'hasmany',
      key: 'master_sector_id',
    },
    masterLogActivities: { 
      type: 'belongs_to', 
      foreignKey: 'master_sectos_id' 
    },
  };
  @field("name") name;
  @field("created_at") createdAt;
  @field("deleted_at") deletedAt;
  @field("updated_at") updatedAt;
  @field("last_pull_at") last_pull_at;
  @children('master_log_activities') masterLogActivities;
}
