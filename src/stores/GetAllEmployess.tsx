import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { constants } from "../config/constants";

export interface EmployeesContextType {
  data: string[] | null;
  error: { status: number; message: string } | null;
  loading: boolean;
}

const EmployeesContext = createContext<EmployeesContextType | undefined>(
  undefined,
);
export function useEmployeesData(): EmployeesContextType {
  const context = useContext(EmployeesContext);
  if (context === undefined) {
    throw Error("useWorkersContext must be used with WorkerProvider");
  }
  return context;
}

export function GetAllEmployeesProvider(props: PropsWithChildren) {
  const [data, setData] = useState<string[] | null>(null);
  const [error, setError] = useState<{
    status: number;
    message: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(constants.apiURL)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errorData) => {
            setError({
              status: res.status,
              message: errorData.message || "Nešto je pošlo po krivu",
            });
            throw new Error(errorData.message || "Nešto je pošlo po krivu");
          });
        }
        return res.json();
      })
      .then((json) => setData(json.data))
      .catch((error) => {
        setError({
          status: 500,
          message: error.message || "Nešto je pošlo po krivu",
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const value: EmployeesContextType = {
    data,
    loading,
    error,
  };

  return (
    <EmployeesContext.Provider value={value}>
      {props.children}
    </EmployeesContext.Provider>
  );
}
