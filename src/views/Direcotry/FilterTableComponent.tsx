import { TextInput, rem } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import classes from "../../components/Directory/Directory.module.css";
import { ChangeEvent } from "react";

interface FilterTableComponentProps {
  search: string;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function FilterTableComponent({
  search,
  handleSearchChange,
}: FilterTableComponentProps) {
  return (
    <div className={classes.filterWrapper}>
      <TextInput
        placeholder="Pretraži po bilo kojem polju"
        mb="md"
        leftSection={
          <IconSearch
            style={{ width: rem(16), height: rem(16) }}
            stroke={1.5}
          />
        }
        value={search}
        onChange={handleSearchChange}
      />
    </div>
  );
}
