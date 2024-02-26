import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import schema from "./schema";
import { AppRegistry, LogBox } from 'react-native';
import App from "../../../App";
import MasterCompany from "./master_company";
import MasterSector from "./master_sectors";
import MasterLogActivity from "./master_log_activity";
import MasterMachine from "./master_machine";
import MasterMachineType from "./master_machine_types";
import MasterMainActivities from "./master_main_activity";
import Migration from "../Migration";

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

const adapter = new SQLiteAdapter({
  schema: schema,
  migrations: Migration,
  dbName: 'res', // optional database name or file system path
  // migrations, // optional migrations
  experimentalUseJSI: false,
});

export const database = new Database({
  adapter,
  modelClasses: [
    MasterCompany,
    MasterSector,
    MasterLogActivity,
    MasterMachine,
    MasterMachineType,
    MasterMainActivities,
  ],
  actionsEnabled: true,
});

AppRegistry.registerComponent(App, () => App);