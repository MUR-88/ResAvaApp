import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default mySchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "master_companies",
      columns: [
        { name: "id_master_companies", type:"string",isIndexed: true },
        { name: "name", type: "string" },
        { name: "body", type: "string" },
        { name: "isSync", type: "boolean" },
        { name: "isConnected", type: "boolean" },
        { name: "created_at", type: "number" },
        { name: "deleted_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
    tableSchema({
      name: "master_estates",
      columns: [
        { name: "id_master_estates", type: "string", isIndexed: true },
        { name: "name", type: "string" },
        { name: "isSync", type: "boolean" },
        { name: "isConnected", type: "boolean" },
        { name: "created_at", type: "number" },
        { name: "deleted_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
    tableSchema({
      name: "master_log_activity",
      columns: [
        { name: "body", type: "string" },
        { name: "id_master_log_activity", type: "string", isIndexed: true },
        { name: "master_company_id", type: "string" },
        { name: "master_sector_id", type: "string" },
        { name: "master_estate_id", type: "string" },
        { name: "master_machine_id", type: "string" },
        { name: "master_machine_type_id", type: "string" },
        { name: "master_main_activity_id", type: "string" },
        { name: "current_hour_meter", type: "number" },
        { name: "last_hour_meter", type: "number" },
        { name: "keterangan", type: "string" },
        { name: "isSync", type: "boolean" },
        { name: "isConnected", type: "boolean" },
        { name: "created_at", type: "number" },
        { name: "deleted_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
    tableSchema({
      name: "master_machine_types",
      columns: [
        { name: "id_master_machine_types", type: "string", isIndexed: true },
        { name: "name", type: "string" },
        { name: "isSync", type: "boolean" },
        { name: "isConnected", type: "boolean" },
        { name: "created_at", type: "number" },
        { name: "deleted_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
    tableSchema({
      name: "master_machine",
      columns: [
        { name: "id_master_machine", type: "string", isIndexed: true },
        { name: "master_machine_type_id", type: "string" },
        { name: "master_company_id", type: "string" },
        { name: "class", type: "number" },
        { name: "machine_id", type: "string" },
        { name: "current_hour_meter", type: "number" },
        { name: "last_update_hm", type: "number" },
        { name: "master_main_activity_id", type: "string" },
        { name: "master_machine_type_id", type: "string" },
        { name: "working_hour", type: "string" },
        { name: "isSync", type: "boolean" },
        { name: "isConnected", type: "boolean" },
        { name: "created_at", type: "number" },
        { name: "deleted_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
    tableSchema({
      name: "master_main_activities",
      columns: [
        { name: "id_master_main_activities", type: "string", isIndexed: true },
        { name: "name", type: "string" },
        { name: "isSync", type: "boolean" },
        { name: "isConnected", type: "boolean" },
        { name: "created_at", type: "number" },
        { name: "deleted_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
    tableSchema({
      name: "master_sectors",
      columns: [
        { name: "id_master_sectors", type: "string", isIndexed: true },
        { name: "name", type: "string" },
        { name: "isSync", type: "boolean" },
        { name: "isConnected", type: "boolean" },
        { name: "created_at", type: "number" },
        { name: "deleted_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
    tableSchema({
      name: "users",
      columns: [
        { name: "id_users", type: "string", isIndexed: true },
        { name: "name", type: "string" },
        { name: "SAP", type: "number" },
        { name: "email", type: "string" },
        { name: "password", type: "string" },
        { name: "isSync", type: "boolean" },
        { name: "isConnected", type: "boolean" },
        { name: "created_at", type: "number" },
        { name: "deleted_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
  ],
});