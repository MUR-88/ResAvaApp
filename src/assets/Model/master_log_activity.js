import { Model } from "@nozbe/watermelondb";
import { date, field, text, immutableRelation  } from '@nozbe/watermelondb/decorators'

export default class MasterMachineActivities extends Model {
  static table = "master_log_activity";
  
  static associations = {
    masterCompany: {
      type: "belongs_to",
      key: "master_company_id",
    },
    masterMainActivity: {
      type: "belongs_to",
      key: "master_main_activity_id",
    },
    masterSector: {
      type: "belongs_to",
      key: "master_sector_id",
    },
    masterEstate: {
      type: "belongs_to",
      key: "master_estate_id",
    },
    masterMachine: {
      type: "belongs_to",
      key: "master_machine_id",
    },
    
    masterMachineType: {
      type: "belongs_to",
      key: "master_machine_type_id",
    },
    user: {
      type: "belongs_to",
      key: "user_id",
    },
  };
  @field('id') id
  @field('master_company_id') masterCompanyId
  @field('master_sector_id') masterSectorId
  @field('master_estate_id') masterEstateId
  @field('master_machine_id') masterMachineId
  @field('master_machine_type_id') masterMachineTypeId
  @field('master_main_activity_id') masterMainActivityId
  @field('current_hour_meter') currentHourMeter
  @field('last_hour_meter') lastHourMeter
  @field('keterangan') keterangan
  @field('isSync') isSync
  @field('isConnected') isConnected
  @field('created_at') createdAt
  @field('deleted_at') deletedAt
  @field('updated_at') updatedAt
}
