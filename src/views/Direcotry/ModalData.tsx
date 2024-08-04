import React from "react";
import {
  Group,
  Text,
  Avatar,
  Badge,
  Anchor,
  Modal,
  Spoiler,
} from "@mantine/core";
import classes from "../../components/Directory/Directory.module.css";

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

interface EmployeeModalProps {
  data: RowData | null;
  onClose: () => void;
}

export const ModalData: React.FC<EmployeeModalProps> = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <Modal
      opened={Boolean(data)}
      onClose={onClose}
      title="Detalji o zaposleniku"
    >
      <Group gap="sm">
        <Avatar size={50} radius={50} src={data.imageUrl} />
        <Text fz="lg" fw={500}>
          {data.firstName + " " + data.lastName}
        </Text>
      </Group>
      <div>
        <Text fz="sm" fw={500}>
          Email: <Anchor href={`mailto:${data.email}`}>{data.email}</Anchor>
        </Text>
        <Text fz="sm" fw={500}>
          Pozicija: <Badge variant="light">{data.position}</Badge>
        </Text>
        <Text fz="sm" fw={500}>
          Kontakt: {data.contactNumber}
        </Text>
        <Text fz="sm" fw={500}>
          Adresa: {data.adress}
        </Text>
        <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">
          <Text className={classes.aboutText}>{data.about}</Text>
        </Spoiler>
      </div>
    </Modal>
  );
};
