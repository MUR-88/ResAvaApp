import { Model } from "@nozbe/watermelondb";
import { date, field, text, immutableRelation, children  } from '@nozbe/watermelondb/decorators'

export default class MasterLogActivity extends Model {
  static table = "master_log_activities";
  
  static associations = {
    masterCompany: {
      type: "belongs_to",
      key: "id_master_company",
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
    master_machine: {
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
  @field('id_master_log_activity') idMasterLogActivity
  @children('id_master_log_activity') idMasterLogActivity
  @field('master_company_id') master_company_id
  @field('master_sector_id') master_sector_id
  @field('master_estate_id') master_estate_id
  @field('master_machine_id') master_machine_id
  @field('master_machine_types_id') master_machine_types_id
  @field('compartement_id') compartement_id
  @field('master_main_activity_id') master_main_activity_id
  @field('current_hour_meter') current_hour_meter
  @field('last_hour_meter') last_hour_meter
  @field('class') class
  @field('keterangan') keterangan
  @field('isSync') isSync
  @field('isConnected') isConnected
  @field('created_at') createdAt
  @field('date') date
  @field('deleted_at') deletedAt
  @field('updated_at') updatedAt
  // @immutableRelation("master_company", "master_company_id") masterCompany; // Add this line
}
