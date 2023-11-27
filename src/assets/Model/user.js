import { Model } from "@nozbe/watermelondb";
import { date, field, text, immutableRelation  } from '@nozbe/watermelondb/decorators'

export default class User extends Model {
  static table = "users";
  
  static associations = {
    masterLogActivities: {
      type: "has_many",
      foreignKey: "user_id",
    },
  };
  
  @field("name") name;
  @field("SAP") SAP;
  @field("email") email;
  @field("password") password;
  @field("isSync") isSync;
  @field("isConnected") isConnected;
  @field("created_at") createdAt;
  @field("deleted_at") deletedAt;
  @field("updated_at") updatedAt;
  @immutableRelation("master_log_activities", "user_id") masterLogActivities;
}
