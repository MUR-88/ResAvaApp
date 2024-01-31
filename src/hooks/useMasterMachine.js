import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { synchronize } from "@nozbe/watermelondb/sync";
import { database } from "../assets/Model/db";
import API from "../function/API";
import dayjs from "dayjs";
import MasterMachine from "../assets/Model/master_machine";

export const useMasterMachine = ({ isGetData }) => {
  // const . cari connected atau tidak
  // setelah itu useEffect untuk ambil data dari API jika connected, jika tidak ambil data dari WatermelonDB
  const [connected, setConnected] = useState(undefined);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetching() {
    await synchronize({
      database,
      pullChanges: async ({ schemaVersion, lastPulledAt, migration }) => {
        console.log("last pull master machine", lastPulledAt);
        const urlParams = `last_pulled_at=${lastPulledAt}&schema_version=${schemaVersion}&migration=${encodeURIComponent(
          JSON.stringify(migration)
        )}`;
        const response = await API.get(`master_machine/sync?${urlParams}`);
      
        // console.log(JSON.stringify(response, null, 2));

        // Check if the request was successful
        if (response.status_code !== 200) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const timestamp = dayjs().unix()*1000;

        return { changes: response.data, timestamp: timestamp };
      },
    });
  }

  function getAllMachine() {
    setIsLoading(true);
    const getAllMachine = database
      .get(MasterMachine.table)
      .query()
      .observe()
      .subscribe((masterMachine) => {
        // console.log("masterMachine");
        setData(masterMachine.map((masterMachine) => masterMachine._raw));
        setIsLoading(false);
      });
    return getAllMachine;
  }

  useEffect(() => {
    const checkInternetConnection = async () => {
      const netInfoState = await NetInfo.fetch();
      setConnected(netInfoState.isConnected);
    };
    checkInternetConnection();
    if(isGetData){
      const masterMachine = getAllMachine();
      return () => masterMachine.unsubscribe();
    }
    // const masterMachine = getAllMachine();
    // return () => masterMachine.unsubscribe();
  }, []);

  return { data, connected, isLoading, fetching };
};
