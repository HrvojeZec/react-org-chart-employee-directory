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

export const createHierarchy = (employees: Employee[]): TreeNode | null => {
  const employeeMap = new Map<number, TreeNode>();
  let root: TreeNode | null = null;

  employees.forEach((employee) => {
    employeeMap.set(employee.id, {
      key: employee.id.toString(),
      label: `${employee.firstName} ${employee.lastName}`,
      data: employee,
      children: [],
    });
  });

  employeeMap.forEach((node) => {
    const managerId = node.data.manager_id;
    if (managerId === null) {
      root = node;
    } else {
      const managerNode = employeeMap.get(managerId);
      if (managerNode) {
        managerNode.children.push(node);
      } else {
        console.warn(
          `Manager with ID ${managerId} not found for employee ${node.data.id}`,
        );
      }
    }
  });

  return root;
};
