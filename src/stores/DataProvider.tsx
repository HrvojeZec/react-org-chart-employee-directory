import { PropsWithChildren } from "react";
import { GetAllEmployeesProvider, useEmployeesData } from "./GetAllEmployess";
import { GlobalLoader } from "../components/shared/Loader/GlobalLoader";
import { GlobalError } from "../components/shared/Error/GlobalError";

const DataProviderInner = (props: PropsWithChildren) => {
  const { loading: employeesLoading, error: employeesError } =
    useEmployeesData();

  if (employeesLoading) {
    return <GlobalLoader />;
  }
  if (employeesError) {
    return <GlobalError errorCode={employeesError.status} />;
  }
  return props.children;
};

export function DataProvider(props: PropsWithChildren) {
  return (
    <GetAllEmployeesProvider>
      <DataProviderInner>{props.children}</DataProviderInner>
    </GetAllEmployeesProvider>
  );
}
