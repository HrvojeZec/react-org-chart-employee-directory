import Layout from "../../components/layout/layout";
import { DataProvider } from "../../stores/DataProvider";
import { Directory } from "./Directory";

export function DirectoryPage() {
  return (
    <DataProvider>
      <Layout>
        <Directory />
      </Layout>
    </DataProvider>
  );
}
