import Layout from "../../components/layout/layout";
import { DataProvider } from "../../stores/DataProvider";
import { OrgChart } from "./OrgChart";

export function OrgChartPage() {
  return (
    <DataProvider>
      <Layout>
        <OrgChart />
      </Layout>
    </DataProvider>
  );
}
