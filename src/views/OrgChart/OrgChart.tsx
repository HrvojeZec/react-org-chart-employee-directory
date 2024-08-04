import { useState } from "react";
import { OrganizationChart } from "primereact/organizationchart";
import { useEmployeesData } from "../../stores/GetAllEmployess";
import { createHierarchy } from "./createHierarchy";

export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  imageUrl: string;
  manager_id: number | null;
};

export type TreeNode = {
  key: string;
  label: string;
  data: Employee;
  children: TreeNode[];
};

export const OrgChart = () => {
  const { data, loading, error } = useEmployeesData();
  const [selection, setSelection] = useState<TreeNode[]>([]);

  if (loading) return <p>Učitavanje...</p>;
  if (error) return <p>Došlo je do greške: {error.message}</p>;

  const treeData = createHierarchy(data);

  const nodeTemplate = (node: TreeNode) => {
    const employee = node.data;
    if (!employee) return null;

    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={employee.imageUrl}
          alt={`${employee.firstName} ${employee.lastName}`}
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
        <div style={{ marginLeft: "10px" }}>
          <div>{`${employee.firstName} ${employee.lastName}`}</div>
          <div>{employee.position}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="card overflow-x-auto">
      <OrganizationChart
        value={treeData ? [treeData] : []}
        selectionMode="multiple"
        selection={selection}
        onSelectionChange={(e) => setSelection(e.data)}
        nodeTemplate={nodeTemplate}
      />
    </div>
  );
};
