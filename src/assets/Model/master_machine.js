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
  @field("master_machine_type_id") masterMachineTypeId;
  @field("master_company_id") masterCompanyId;
  @field("class") class;
  @field("machine_id") machineId;
  @field('current_hour_meter') currentHourMeter
  @field('last_update_hm') lastUpdateHourMeter
  @field('working_hour') workingHour
  @field('master_main_activity_id') mainActivityId
  @field('isSync') isSync
  @field('isConnected') isConnected
  @field('created_at') createdAt
  @field('deleted_at') deletedAt
  @field('updated_at') updatedAt
  @children('master_main_activities') masterMainActivity;
  @children('master_log_activities') masterLogActivities;
}
