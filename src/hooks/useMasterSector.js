import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import MasterSector from "../assets/Model/master_sectors";
import { synchronize } from "@nozbe/watermelondb/sync";
import { database } from "../assets/Model/db";
import API from "../function/API";
import dayjs from "dayjs";

export const useMasterSector = ({ isGetData }) => {
  // const . cari connected atau tidak
  // setelah itu useEffect untuk ambil data dari API jika connected, jika tidak ambil data dari WatermelonDB
  const [connected, setConnected] = useState(undefined);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetching() {
    await synchronize({
      database,
      pullChanges: async ({ schemaVersion, lastPulledAt, migration }) => {
        console.log("last pull master sector", lastPulledAt);
        const urlParams = `last_pulled_at=${lastPulledAt}&schema_version=${schemaVersion}&migration=${encodeURIComponent(
          JSON.stringify(migration)
        )}`;
        const response = await API.get(`master_sector/sync?${urlParams}`);
        // Check if the request was successful
        if (response.status_code !== 200) {
          throw new Error(
            `Request failed with status ${response.status}`
          );
        }
        const timestamp =  dayjs().unix()*1000;

        return { changes: response.data, timestamp: timestamp };
      },
    })
  }

  function getAllSector() {
    setIsLoading(true);
    const allSector = database
      .get(MasterSector.table)
      .query()
      .observe()
      .subscribe((masterSector) => {
        // console.log("masterSector", );
        setData(masterSector.map((masterSector) => masterSector._raw));
        setIsLoading(false);
      });
    return allSector;
  }

  useEffect(() => {
    const checkInternetConnection = async () => {
      const netInfoState = await NetInfo.fetch();
      setConnected(netInfoState.isConnected);
    };
    checkInternetConnection();
    if(isGetData){
      const sector = getAllSector();
      return () => sector.unsubscribe();
    }
  }, []);

  return { data, connected, isLoading, fetching };
};
