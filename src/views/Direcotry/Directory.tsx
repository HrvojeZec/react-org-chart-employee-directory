import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import {
  Table,
  UnstyledButton,
  Group,
  Text,
  Center,
  rem,
  Avatar,
  Badge,
  Anchor,
  ActionIcon,
} from "@mantine/core";
import cx from "clsx";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconDots,
} from "@tabler/icons-react";
import { useEmployeesData } from "../../stores/GetAllEmployess";
import classes from "../../components/Directory/Directory.module.css";
import { FilterTableComponent } from "./FilterTableComponent";
import { ModalData } from "./ModalData";

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

interface RowData {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  imageUrl: string;
  email: string;
  contactNumber: string;
  about: string;
  adress: string;
}

export function filterData(
  data: RowData[],
  search: string,
  selectedJobTitle: string,
) {
  const query = search.toLowerCase().trim();
  return data.filter((item) => {
    const matchesSearch = Object.keys(item).some((key) => {
      const value = item[key as keyof RowData];
      return (
        value !== null &&
        value !== undefined &&
        value.toString().toLowerCase().includes(query)
      );
    });
    const matchesJobTitle = selectedJobTitle
      ? item.position.toLowerCase() === selectedJobTitle.toLowerCase()
      : true;
    return matchesSearch && matchesJobTitle;
  });
}

export function sortData(
  data: RowData[],
  payload: {
    sortBy: keyof RowData | null;
    reversed: boolean;
    search: string;
    selectedJobTitle: string;
  },
) {
  const { sortBy, reversed, search, selectedJobTitle } = payload;

  if (!sortBy) {
    return filterData(data, search, selectedJobTitle);
  }

  const sortedData = [...data].sort((a, b) => {
    if (reversed) {
      return b[sortBy].localeCompare(a[sortBy]);
    }
    return a[sortBy].localeCompare(b[sortBy]);
  });

  return filterData(sortedData, search, selectedJobTitle);
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

export function Directory() {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState<RowData[]>([]);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState<string>("");
  const [modalData, setModalData] = useState<RowData | null>(null);
  const [visibleRows, setVisibleRows] = useState(15);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const { data } = useEmployeesData();
  console.log(data);

  const employees: RowData[] = data
    ? [...data /* ...data, ...data, ...data */]
    : []; // duplicirao podatke radi testiranja lazy loadinga

  useEffect(() => {
    setSortedData(
      sortData(employees, {
        sortBy,
        reversed: reverseSortDirection,
        search,
        selectedJobTitle,
      }),
    );
  }, [search, selectedJobTitle, sortBy, reverseSortDirection, employees]);

  const setSorting = (field: keyof RowData) => {
    const reversed = sortBy === field ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(
      sortData(employees, {
        sortBy: field,
        reversed,
        search,
        selectedJobTitle,
      }),
    );
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
  };

  const openModal = (row: RowData) => {
    setModalData(row);
  };

  const closeModal = () => {
    setModalData(null);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleRows((prevVisibleRows) => prevVisibleRows + 10);
        }
      },
      {
        rootMargin: "100px",
      },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, []);

  const rows = sortedData.slice(0, visibleRows).map((row) => (
    <Table.Tr key={row.id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={30} radius={30} src={row.imageUrl} />
          <Text fz="sm" fw={500}>
            {row.firstName + " " + row.lastName}
          </Text>
        </Group>
      </Table.Td>
      <Table.Td>
        <Anchor component="button" size="sm">
          {row.email}
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Badge variant="light">{row.position}</Badge>
      </Table.Td>
      <Table.Td>
        <ActionIcon
          variant="subtle"
          color="gray"
          onClick={() => openModal(row)}
        >
          <IconDots style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className={classes.tableWrapper}>
      <div className={classes.table}>
        <FilterTableComponent
          search={search}
          handleSearchChange={handleSearchChange}
        />
        <Table miw={700}>
          <Table.Thead className={cx(classes.header)}>
            <Table.Tr>
              <Th
                sorted={sortBy === "firstName"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("firstName")}
              >
                Ime i prezime
              </Th>
              <Table.Th>Email</Table.Th>
              <Th
                sorted={sortBy === "position"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("position")}
              >
                Naziv posla
              </Th>
              <Table.Th>Akcije</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        <div ref={loadMoreRef} className={classes.loadMoreTrigger}></div>
      </div>
      <ModalData data={modalData} onClose={closeModal} />
    </div>
  );
}
