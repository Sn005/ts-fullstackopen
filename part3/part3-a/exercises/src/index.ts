import express from "express";
import routes from "./routes";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
routes(app);
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
