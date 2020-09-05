import App from "./app";
const port = process.env.PORT || 3001;

console.log("### =======================================");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("Data/Hora:", new Date().toISOString());
console.log("### =======================================");

App.app.listen(port, () => console.log(`Open http://localhost:${port}`));

process.once("SIGUSR2", () =>
  App.closeDataBaseConnection("nodemon restart", () =>
    process.kill(process.pid, "SIGUSR2")
  )
);

process.on("SIGINT", () =>
  App.closeDataBaseConnection("execução foi interrompida", () =>
    process.exit(0)
  )
);
