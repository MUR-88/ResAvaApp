import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { synchronize } from "@nozbe/watermelondb/sync";
import { database } from "../assets/Model/db";
import API from "../function/API";
import dayjs from "dayjs";
import MasterCompany from "../assets/Model/master_company";
import MasterEstate from "../assets/Model/master_estates";

export const useMasterEstate = ( { isGetData} ) => {
  // const . cari connected atau tidak
  // setelah itu useEffect untuk ambil data dari API jika connected, jika tidak ambil data dari WatermelonDB
  const [connected, setConnected] = useState(undefined);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetching() {
    await synchronize({
      database,
      pullChanges: async ({ schemaVersion, lastPulledAt, migration }) => {
        const urlParams = `last_pulled_at=${lastPulledAt}&schema_version=${schemaVersion}&migration=${encodeURIComponent(
          JSON.stringify(migration)
        )}`;
        const response = await API.get(`master_estate/sync?${urlParams}`);
        // console.log(JSON.stringify(response, null, 2));

        // Check if the request was successful
        if (response.status_code !== 200) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const timestamp = dayjs().unix();

        return { changes: response.data, timestamp: timestamp };
      },
    });
  }

  function getAllEstate() {
    setIsLoading(true);
    const getAllEstate = database
      .get(MasterEstate.table)
      .query()
      .observe()
      .subscribe((masterEstate) => {
        console.log("masterEstate");
        setData(masterEstate.map((masterEstate) => masterEstate._raw));
        setIsLoading(false);
      });
    return getAllEstate;
  }

  useEffect(() => {
    const checkInternetConnection = async () => {
      const netInfoState = await NetInfo.fetch();
      setConnected(netInfoState.isConnected);
    };
    checkInternetConnection();
    if(isGetData){
      const masterEstate = getAllEstate();
      return () => masterEstate.unsubscribe();
    }
    // const masterEstate = getAllEstate();
    // return () => masterEstate.unsubscribe();
  }, []);

  return { data, connected, isLoading, fetching };
};
