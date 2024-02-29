// // app/model/migrations.js
import {
  schemaMigrations,
  createTable,
  addColumns,
  unsafeExecuteSql,
} from "@nozbe/watermelondb/Schema/migrations";

export default schemaMigrations({
  migrations: [
    {
      toVersion: 2,
      steps: [
        createTable({
          name: "master_company",
          columns: [
            { name: "id_master_company", type: "string", isIndexed: true },
            { name: "name", type: "string" },
            { name: "created_at", type: "number" },
            { name: "deleted_at", type: "number" },
            { name: "updated_at", type: "number" },
          ],
        }),
        createTable({
          name: "master_sectors",
          columns: [
            { name: "id_master_sectors", type: "number", isIndexed: true },
            { name: "name", type: "string" },
            { name: "created_at", type: "number" },
            { name: "deleted_at", type: "number" },
            { name: "updated_at", type: "number" },
          ],
        }),
        createTable({
          name: "master_log_activities",
          columns: [
            { name: "id_master_log_activity", type: "number", isIndexed: true },
            { name: "master_company_id", type: "number" },
            { name: "master_sector_id", type: "number" },
            { name: "master_machine_id", type: "number" },
            { name: "master_machine_types_id", type: "number" },
            { name: "master_main_activity_id", type: "number" },
            { name: "compartement_id", type: "string" },
            { name: "current_hour_meter", type: "number" },
            { name: "last_hour_meter", type: "number" },
            { name: "keterangan", type: "string" },
            { name: "isSync", type: "boolean" },
            { name: "isConnected", type: "boolean" },
            { name: "date", type: "number" },
            { name: "created_at", type: "number" },
            { name: "deleted_at", type: "number" },
            { name: "updated_at", type: "number" },
          ],
        }),
        createTable({
          name: "master_machine",
          columns: [
            { name: "master_machine_id", type: "number", isIndexed: true },
            { name: "brand", type: "string" },
            { name: "master_machine_types_id", type: "number" },
            { name: "master_company_id", type: "number" },
            { name: "class", type: "number" },
            { name: "machine_id", type: "string" },
            { name: "current_hour_meter", type: "number" },
            { name: "master_main_activity_id", type: "number" },
            { name: "isSync", type: "boolean" },
            { name: "isConnected", type: "boolean" },
            { name: "created_at", type: "number" },
            { name: "deleted_at", type: "number" },
            { name: "updated_at", type: "number" },
          ],
        }),
        createTable({
          name: "master_machine_types",
          columns: [
            {
              name: "id_master_machine_types",
              type: "number",
              isIndexed: true,
            },
            { name: "name", type: "string" },
            { name: "created_at", type: "number" },
            { name: "deleted_at", type: "number" },
            { name: "updated_at", type: "number" },
          ],
        }),
        createTable({
          name: "master_main_activities",
          columns: [
            {
              name: "id_master_main_activities",
              type: "number",
              isIndexed: true,
            },
            {
              name: "master_machine_types_id",
              type: "number",
              isIndexed: true,
            },
            { name: "name", type: "string" },
            { name: "master_machine_types_id", type: "string" },
            { name: "created_at", type: "number" },
            { name: "deleted_at", type: "number" },
            { name: "updated_at", type: "number" },
          ],
        }),
        //         // createTable({
        //         //   name: "users",
        //         //   columns: [
        //         //     { name: "id_users", type: "string", isIndexed: true },
        //         //     { name: "name", type: "string" },
        //         //     { name: "email", type: "string" },
        //         //     { name: "password", type: "string" },
        //         //     { name: "email_verified_at", type: "number" },
        //         //     { name: "remember_token", type: "string" },
        //         //     { name: "SAP", type: "string" },
        //         //     { name: "isSync", type: "boolean" },
        //         //     { name: "isConnected", type: "boolean" },
        //         //     { name: "created_at", type: "number" },
        //         //     { name: "deleted_at", type: "number" },
        //         //     { name: "updated_at", type: "number" },
        //         //   ],
        //         // }),
        //         // unsafeExecuteSql(
        //         //   "CREATE INDEX IF NOT EXISTS exercises_equipment_list on exercises (equipment_list);"
        //         // ),
      ],
    },
  ],
});
