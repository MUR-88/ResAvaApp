import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import schema from "./schema";
import MasterCompanies from "./master_companies";
import MasterEstate from "./master_estates";
import MasterSector from "./master_sectors";
import MasterLogActivity from "./master_log_activity";
import MasterMachine from "./master_machine";
import MasterMachineType from "./master_machine_types";
import MasterMainActivities from "./master_main_activity";
import Migration from "../Migration";
import { Platform } from "react-native";

const adapter = new SQLiteAdapter({
  dbName: "res_ava_app_watermelon",
  schema,
  // (You might want to comment it out for development purposes -- see Migrations documentation)
  migrations: Migration,
  // (optional database name or file system path)
  // dbName: 'myapp',
  // (recommended option, should work flawlessly out of the box on iOS. On Android,
  // additional installation steps have to be taken - disable if you run into issues...)
  jsi: Platform.OS === 'ios' ,
  // (optional, but you should implement this method)
  onSetUpError: (error) => {
    console.log("onSetUpError", error);
  },
});

const database = new Database({
  adapter,
  modelClasses: [
    MasterCompanies,
    // MasterEstate,
    // MasterSector,
    // MasterLogActivity,
    // MasterMachine,
    // MasterMachineType,
    // MasterMainActivities,
  ],
  actionsEnabled: true,
});

export default database;
