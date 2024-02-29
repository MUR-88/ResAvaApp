import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { synchronize } from "@nozbe/watermelondb/sync";
import { database } from "../assets/Model/db";
import API from "../function/API";
import dayjs from "dayjs";
import MasterCompany from "../assets/Model/master_company";

export const useMasterCompany = ({ isGetData }) => {
  // const . cari connected atau tidak
  // setelah itu useEffect untuk ambil data dari API jika connected, jika tidak ambil data dari WatermelonDB
  const [connected, setConnected] = useState(undefined);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getAllCompany() {
    setIsLoading(true);

    const allCompany = await database.get(MasterCompany.table).query().fetch();
    setData(allCompany.map((masterCompany) => masterCompany._raw));
    setIsLoading(false);
    return allCompany;
  }

  useEffect(() => {
    const checkInternetConnection = async () => {
      const netInfoState = await NetInfo.fetch();
      setConnected(netInfoState.isConnected);
    };
    checkInternetConnection();
    if (isGetData) {
      const company = getAllCompany();
      return () => company;
    }
    // const company = getAllCompany();
    // return () => company.unsubscribe();
  }, []);

  return { data, connected, isLoading };
};
