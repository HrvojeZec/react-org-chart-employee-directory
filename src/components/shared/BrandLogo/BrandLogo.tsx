import { Group, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { Book2 } from "tabler-icons-react";
import classes from "../../layout/Header/Header.module.css";

export function BrandLogo() {
  return (
    <div>
      <Link className={classes.links} to="/">
        <Group>
          <Book2 size={30} strokeWidth={1.5} color={"black"} />
          <Text className={classes.logoName}>ImenikZaposlenika</Text>
        </Group>
      </Link>
    </div>
  );
}
