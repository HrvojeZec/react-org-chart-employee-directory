import { Button, Group } from "@mantine/core";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import { BrandLogo } from "../../shared/BrandLogo/BrandLogo";

export function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <BrandLogo />
        </Group>
        <Group>
          <Link to="/OrgChart" className={classes.links}>
            <Button>Org. Dijagram</Button>
          </Link>
        </Group>
      </div>
    </header>
  );
}
