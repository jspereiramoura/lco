declare module "redux-persist-indexeddb-storage" {
  import { Storage } from "redux-persist";

  const createIdbStorage: (name: string, storeName: string) => Storage;

  export default createIdbStorage;
}
