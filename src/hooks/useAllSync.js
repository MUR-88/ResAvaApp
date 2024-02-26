import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { synchronize, hasUnsyncedChanges } from "@nozbe/watermelondb/sync";
import { database } from "../assets/Model/db";
import API from "../function/API";
import dayjs from "dayjs";
import MasterCompany from "../assets/Model/master_company";
import { Q } from "@nozbe/watermelondb";

export const useAllSync = ({ isGetData }) => {
  // const . cari connected atau tidak
  // setelah itu useEffect untuk ambil data dari API jika connected, jika tidak ambil data dari WatermelonDB
  const [connected, setConnected] = useState(undefined);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  
  async function fetching() {
    const isFirstSync = response;
    const response = await synchronize({
      database,
      pullChanges: async ({ schemaVersion, lastPulledAt, migration }) => {
        console.log("last pull All Sync", lastPulledAt);
        const urlParams = `last_pulled_at=${
          lastPulledAt ? lastPulledAt : ""
        }&schema_version=${schemaVersion}&migration=${encodeURIComponent(
          JSON.stringify(migration)
        )}`;
        const response = await API.get(`allSync?${urlParams}`);
        //   console.log(JSON.stringify(response, null, 2));

        // Check if the request was successful
        if (response.status_code !== 200) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const timestamp = dayjs().unix() * 1000;

        if (isFirstSync) {
          const syncJson = JSON.stringify(response.data);
          return { syncJson };
        } else {
          return { changes: response.data, timestamp: timestamp };
        }
      },

      pushChanges: async ({ changes, lastPulledAt }) => {
        const masterLogCreated = changes.master_log_activities.created.filter(
          (item) => item.isSync === false
        );
        const masterLogUpdated = changes.master_log_activities.updated.filter(
          (item) => item.isSync === false
        );

        const masterMachineCreated = changes.master_machine.created.filter(
          (item) => item.isSync === false
        );
        const masterMachineUpdated = changes.master_machine.updated.filter(
          (item) => item.isSync === false
        );

        console.log("Created", JSON.stringify(masterLogCreated, null, 2));
        console.log("Updated", JSON.stringify(masterLogUpdated, null, 2));

        try {
          const pushDataResponse = await API.post("push/data", {
            master_log_activities: {
              created: masterLogCreated,
              updated: masterLogUpdated,
            },
            master_machine: {
              created: masterMachineCreated,
              updated: masterMachineUpdated,
            },
            last_pulled_at: lastPulledAt,
          });

          console.log(JSON.stringify(pushDataResponse, null, 2));

          const syncAndUpdate = async (items, updateFunction) => {
            await database.write(async () => {
              console.log("Test", JSON.stringify(items, null, 2));
              const allItems = await database
                .get(items)
                .query(Q.where("isSync", false))
                .fetch();
              for (let i = 0; i < allItems.length; i++) {
                await allItems[i].update(updateFunction);
              }
            });
          };

          await syncAndUpdate("master_log_activities", (masterLog) => {
            masterLog.isSync = true;
          });
          await syncAndUpdate("master_machine", (masterMachine) => {
            masterMachine.isSync = true;
          });

          // console.log("pushDataResponse", pushDataResponse);
          return Promise.resolve();
        } catch (pushDataError) {
          console.error(pushDataError);
          // return Promise.reject(pushDataError);
          throw new Error(pushDataError.message);
        }
      },
      migrationsEnabledAtVersion: 1,
      unsafeTurbo: isFirstSync,
    });

    const unsyncedChangesResponse = await hasUnsyncedChanges({ database });
    console.log("unsyncedChangesResponse", unsyncedChangesResponse);
    
  }

  useEffect(() => {
    const checkInternetConnection = async () => {
      try {
        const netInfoState = await NetInfo.fetch();
        setConnected(netInfoState.isConnected);
      } catch (netInfoError) {
        console.error("Error checking internet connection", netInfoError);
      }
    };
    checkInternetConnection();
  }, []);

  return { data, connected, isLoading, fetching };
};
