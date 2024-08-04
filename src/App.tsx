import { DirectoryPage } from "./views/Direcotry/DirectoryPage";
import { OrgChartPage } from "./views/OrgChart/OrgChartPage";
import { Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { PrimeReactProvider } from "primereact/api";
import "@mantine/core/styles.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function App() {
  return (
    <PrimeReactProvider>
      <MantineProvider>
        <Routes>
          <Route path="/" element={<DirectoryPage />} />
          <Route path="/OrgChart" element={<OrgChartPage />} />
        </Routes>
      </MantineProvider>
    </PrimeReactProvider>
  );
}
export default App;
