import { Title, Text, Button, Container, Group } from "@mantine/core";
import classes from "./GlobalError.module.css";

interface GlobalErrorProps {
  errorCode: number;
}

export function GlobalError({ errorCode }: GlobalErrorProps) {
  let title = "Nešto loše se upravo dogodilo...";
  let description =
    "Naši serveri nisu mogli obraditi vaš zahtjev. Ne brinite, naš razvojni tim je već obaviješten. Pokušajte osvježiti stranicu.";

  if (errorCode === 404) {
    title = "Stranica nije pronađena";
    description =
      "Žao nam je, ali stranica koju tražite ne postoji. Provjerite URL ili se vratite na početnu stranicu.";
  } else if (errorCode === 400) {
    title = "Neispravan zahtjev";
    description =
      "Vaš zahtjev nije mogao biti obrađen zbog neispravnih podataka. Provjerite unesene informacije i pokušajte ponovo.";
  } else if (errorCode === 500) {
    title = "Došlo je do greške na serveru";
    description =
      "Naši serveri nisu mogli obraditi vaš zahtjev. Ne brinite, naš razvojni tim je već obaviješten. Pokušajte osvježiti stranicu.";
  }

  return (
    <div className={classes.root}>
      <Container className={classes.errorContainer}>
        <div className={classes.label}>{errorCode}</div>
        <Title className={classes.title}>{title}</Title>
        <Text size="lg" ta="center" className={classes.description}>
          {description}
        </Text>
        <Group justify="center">
          <Button
            variant="white"
            size="md"
            onClick={() => window.location.reload()}
          >
            Osvježi stranicu
          </Button>
        </Group>
      </Container>
    </div>
  );
}
