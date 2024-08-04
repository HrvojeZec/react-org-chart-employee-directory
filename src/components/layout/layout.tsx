import { PropsWithChildren } from "react";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import classes from "./Layout.module.css";
interface Props {
  children: React.ReactNode;
}
function Layout(props: PropsWithChildren<Props>) {
  return (
    <div className={classes.layoutWrapper}>
      <Header />
      <main className={classes.main}>{props.children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
