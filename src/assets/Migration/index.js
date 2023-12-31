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
            { name: "isSync", type: "boolean" },
            { name: "isConnected", type: "boolean" },
            { name: "created_at", type: "number" },
            { name: "deleted_at", type: "number" },
            { name: "updated_at", type: "number" },
          ],
        }),
        createTable({
          name: "master_estates",
          columns: [
            { name: "id_master_estate", type: "string", isIndexed: true },
            { name: "master_sector_id", type: "string", isIndexed: true },
            { name: "name", type: "string" },
            { name: "isSync", type: "boolean" },
            { name: "isConnected", type: "boolean" },
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
            { name: "isSync", type: "boolean" },
            { name: "isConnected", type: "boolean" },
            { name: "created_at", type: "number" },
            { name: "deleted_at", type: "number" },
            { name: "updated_at", type: "number" },
          ],
        }),
        createTable({
          name: "master_log_activities",
          columns: [
            {
              name: "id_master_log_activities",
              type: "number",
              isIndexed: true,
            },
            { name: "user_id", type: "number" },
            { name: "status", type: "boolean" },
            { name: "master_company_id", type: "number" },
            { name: "master_estate_id", type: "number" },
            { name: "master_sector_id", type: "number" },
            { name: "master_machine_id", type: "number" },
            { name: "master_machine_type_id", type: "number" },
            { name: "master_main_activity_id", type: "number" },
            { name: "current_hour_meter", type: "number" },
            { name: "last_hour_meter", type: "number" },
            { name: "compartement_id", type: "number" },
            { name: "keterangan", type: "number" },
            { name: "isSync", type: "boolean" },
            { name: "isConnected", type: "boolean" },
            { name: "created_at", type: "number" },
            { name: "deleted_at", type: "number" },
            { name: "updated_at", type: "number" },
          ],
        }),
        createTable({
          name: "master_machine",
          columns: [
            { name: "id_master_machine", type: "number", isIndexed: true },
            { name: "machine_id", type: "string" },
            { name: "master_machine_type_id", type: "string" },
            { name: "master_company_id", type: "string" },
            { name: "class", type: "string" },
            { name: "machine_id", type: "string" },
            { name: "master_maint_activity", type: "string" },
            { name: "working_hour", type: "string" },
            { name: "last_update_hm", type: "string" },
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
            { name: "isSync", type: "boolean" },
            { name: "isConnected", type: "boolean" },
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
            { name: "isSync", type: "boolean" },
            { name: "isConnected", type: "boolean" },
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
