import { appSchema, tableSchema } from "@nozbe/watermelondb";
import { unsafeExecuteSql } from "@nozbe/watermelondb/Schema/migrations";

export default mySchema = appSchema({
  version: 2,
  migrationsEnabledAtVersion: 1,
  tables: [
    tableSchema({
      name: "master_company",
      columns: [
        { name: "id_master_company", type: "number", isIndexed: true },
        { name: "name", type: "string" },
        { name: "created_at", type: "number" },
        { name: "deleted_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
      unsafeSql: (sql) =>
        sql.replace(/create table [^)]+\)/, "$& without rowid"),
    }),
    tableSchema({
      name: "master_machine_types",
      columns: [
        { name: "id_master_machine_types", type: "number", isIndexed: true },
        { name: "name", type: "string" },
        { name: "created_at", type: "number" },
        { name: "deleted_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
      unsafeSql: (sql) =>
      sql.replace(/create table [^)]+\)/, "$& without rowid"),
    }),
    tableSchema({
      name: "master_machine",
      columns: [
        { name: "master_machine_id", type: "number", isIndexed: true },
        { name: "brand", type: "string" },
        { name: "master_machine_types_id", type: "number"  },
        { name: "master_company_id", type: "number"  },
        { name: "class", type: "number" },
        { name: "machine_id", type: "string" },
        { name: "current_hour_meter", type: "number" },
        { name: "master_main_activity_id", type: "number"  },
        { name: "isConnected", type: "boolean" },
        { name: "isSync", type: "boolean" },
        { name: "created_at", type: "number" },
        { name: "deleted_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
      unsafeSql: (sql) =>
      sql.replace(/create table [^)]+\)/, "$& without rowid"),
    }),
    tableSchema({
      name: "master_main_activities",
      columns: [
        { name: "id_master_main_activities", type: "number", isIndexed: true },
        { name: "master_machine_types_id", type: "number", isIndexed: true },
        { name: "name", type: "string" },
        { name: "created_at", type: "number" },
        { name: "deleted_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
      unsafeSql: (sql) =>
      sql.replace(/create table [^)]+\)/, "$& without rowid"),
    }),
    tableSchema({
      name: "master_sectors",
      columns: [
        { name: "id_master_sectors", type: "number", isIndexed: true },
        { name: "name", type: "string" },
        { name: "last_pulled_at", type: "number" },
        { name: "created_at", type: "number" },
        { name: "deleted_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
      unsafeSql: (sql) =>
        sql.replace(/create table [^)]+\)/, "$& without rowid"),
    }),
    tableSchema({
      name: "master_log_activities",
      columns: [
        { name: "id_master_log_activity", type: "number", isIndexed: true },
        { name: "user_id", type: "number"},
        { name: "master_company_id", type: "number" },
        { name: "master_sector_id", type: "number" },
        { name: "master_machine_id", type: "number" },
        { name: "master_machine_types_id", type: "number" },
        { name: "master_main_activity_id", type: "number" },
        { name: "compartement_id", type : "string"},
        { name: "current_hour_meter", type: "number" },
        { name: "last_hour_meter", type: "number" },
        { name: "oil", type: "number" },
        { name: "keterangan", type: "string" },
        { name: "isSync", type: "boolean" },
        { name: "isConnected", type: "boolean" },
        { name: "created_at", type: "number" },
        { name: "date", type: "number" },
        { name: "deleted_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
      unsafeSql: (sql) =>
      sql.replace(/create table [^)]+\)/, "$& without rowid"),
    }),
  ],
});
