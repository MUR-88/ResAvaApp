import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const mySchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "master_companies",
      columns: [
        { name: "id", isIndexed: true },
        { name: "name", type: "string" },
        { name: "body", type: "string" },
        { name: "isSync", type: "boolean" },
        { name: "isConnected", type: "boolean" },
        { name: "updated_at", type: "timeStamp" },
      ],
    }),
    tableSchema({
      name: "master_estates",
      columns: [
        { name: "id", type: "string", isIndexed: true },
        { name: "name", type: "string" },
        { name: "isSync", type: "boolean" },
        { name: "isConnected", type: "boolean" },
        { name: "updated_at", type: "timeStamp" },
      ],
    }),
    tableSchema({
      name: "master_log_activity",
      columns: [
        { name: "body", type: "string" },
        { name: "id", type: "string", isIndexed: true },
        { name: "master_company_id", type: "string" },
        { name: "master_sectos_id", type: "string" },
        { name: "master_estate_id", type: "string" },
        { name: "master_machine_id", type: "string" },
        { name: "master_machine_type_id", type: "string" },
        { name: "master_main_activity_id", type: "string" },
        { name: "current_hour_meter", type: "float" },
        { name: "last_hour_meter", type: "float" },
        { name: "keterangan", type: "string" },
        { name: "isSync", type: "boolean" },
        { name: "isConnected", type: "boolean" },
        { name: "updated_at", type: "timeStamp" },
      ],
    }),
    tableSchema({
      name: "master_machine_types",
      columns: [
        { name: "id", type: "string", isIndexed: true },
        { name: "name", type: "string" },
        { name: "isSync", type: "boolean" },
        { name: "isConnected", type: "boolean" },
        { name: "updated_at", type: "timeStamp" },
      ],
    }),
    tableSchema({
      name: "master_machine",
      columns: [
        { name: "id", type: "string", isIndexed: true },
        { name: "master_machine_type_id", type: "string" },
        { name: "master_company_id", type: "string" },
        { name: "class", type: "integer" },
        { name: "machine_id", type: "string" },
        { name: "current_hour_meter", type: "float" },
        { name: "last_update_hm", type: "float" },
        { name: "master_main_activity_id", type: "string" },
        { name: "master_machine_type_id", type: "string" },
        { name: "isSync", type: "boolean" },
        { name: "isConnected", type: "boolean" },
        { name: "updated_at", type: "timeStamp" },
      ],
    }),
    tableSchema({
      name: "master_main_activities",
      columns: [
        { name: "id", type: "string", isIndexed: true },
        { name: "name", type: "string" },
        { name: "isSync", type: "boolean" },
        { name: "isConnected", type: "boolean" },
        { name: "updated_at", type: "timeStamp" },
      ],
    }),
    tableSchema({
      name: "master_sectors",
      columns: [
        { name: "id", type: "string", isIndexed: true },
        { name: "name", type: "string" },
        { name: "isSync", type: "boolean" },
        { name: "isConnected", type: "boolean" },
        { name: "updated_at", type: "timeStamp" },
      ],
    }),
    tableSchema({
      name: "users",
      columns: [
        { name: "id", type: "string", isIndexed: true },
        { name: "name", type: "string" },
        { name: "SAP", type: "integer" },
        { name: "email", type: "string" },
        { name: "password", type: "string" },
        { name: "isSync", type: "boolean" },
        { name: "isConnected", type: "boolean" },
        { name: "updated_at", type: "timeStamp" },
      ],
    }),
  ],
});
