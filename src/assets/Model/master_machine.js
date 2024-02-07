import { Model } from "@nozbe/watermelondb";
import { date, field, text, immutableRelation, children  } from '@nozbe/watermelondb/decorators'

export default class MasterMachine extends Model {
  static table = "master_machine";
  static associations = {
    masterMainActivity: {
      type: "has_many",
      foreignKey: "master_machine_id",
    },
    masterMachineType: {
      type: "belongs_to",
      key: "master_machine_type_id",
    },
    masterLogActivities: {
      type: "has_many",
      foreignKey: "master_machine_id",
    },
    masterCompany: {
      type: "belongs_to",
      key: "master_company_id",
    },
  };
  @field("id") id;
  @field("master_machine_id") master_machine_id;
  @field("master_machine_types_id") master_machine_types_id;
  @field("master_company_id") master_company_id;
  @field("class") class;
  @field("machine_id") machine_id;
  @field('current_hour_meter') current_hour_meter
  @field('hm_current') hm_current
  @field('working_hour') working_hour
  @field('master_main_activity_id') master_main_activity_id
  @field('isSync') isSync
  @field('isConnected') isConnected
  @field('created_at') createdAt
  @field('deleted_at') deletedAt
  @field('updated_at') updatedAt
  @children('master_main_activities') master_main_activities;
  @children('master_log_activities') master_log_activities;
}
