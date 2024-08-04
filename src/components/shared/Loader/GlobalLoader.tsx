import { Loader } from "@mantine/core";

export function GlobalLoader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Loader size={30} />
    </div>
  );
}
