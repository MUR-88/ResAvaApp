import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { synchronize } from "@nozbe/watermelondb/sync";
import { database } from "../assets/Model/db";
import API from "../function/API";
import dayjs from "dayjs";
import MasterCompany from "../assets/Model/master_company";

export const useAllSync = ({ isGetData }) => {
  // const . cari connected atau tidak
  // setelah itu useEffect untuk ambil data dari API jika connected, jika tidak ambil data dari WatermelonDB
  const [connected, setConnected] = useState(undefined);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetching() {
    try {
      //batas sync
      await synchronize({
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

          return { changes: response.data, timestamp: timestamp };
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

          try {
            const response = await API.post("push/data", {
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

            const allMasterLog = await database
              .get("master_log_activities")
              .query(Q.where("isSync", false))
              .fetch();

            for (let i = 0; i < allMasterLog.length; i++) {
              await allMasterLog[i].update((masterLog) => {
                masterLog.isSync = true;
              });
            }

            const allMasterMachine = await database
              .get("master_machine")
              .query(Q.where("isSync", false))
              .fetch();

            for (let i = 0; i < allMasterMachine.length; i++) {
              await allMasterMachine[i].update((masterMachine) => {
                masterMachine.isSync = true;
              });
            }

            console.log("response", response);
            return Promise.resolve();
          } catch (e) {
            console.log(e);
            return Promise.reject();
          }

          const response = await fetch(`=${lastPulledAt}`, {
            method: "POST",
            body: JSON.stringify(changes),
          });
          if (!response.ok) {
            throw new Error(await response.text());
          }
          console.log("push", changes);
          // console.log(JSON.stringify(changes, null, 2));
          return Promise.reject();
        },
        migrationsEnabledAtVersion: 1,
      });

      const response = await hasUnsyncedChanges({ database });
      console.log("response changes", response);
    } catch (error) {
      console.error("Error:", error);
    }

    const response = await hasUnsyncedChanges({ database });
    console.log("response changes", response);
  }

  useEffect(() => {
    const checkInternetConnection = async () => {
      const netInfoState = await NetInfo.fetch();
      setConnected(netInfoState.isConnected);
    };
    checkInternetConnection();
  }, []);

  return { data, connected, isLoading, fetching };
};
