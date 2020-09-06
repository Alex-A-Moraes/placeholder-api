import App from "./app";
import LogSystem from "./log/LogSystem";
const port = process.env.PORT || 3001;

console.log("### =======================================");
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log("### =======================================");

const msgInfo = `API started: http://localhost:${port}`;
App.app.listen(port, () => {
  LogSystem.Info(msgInfo);
  console.log(msgInfo);
});

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
