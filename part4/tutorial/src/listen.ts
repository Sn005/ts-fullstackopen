import express from "express";
export default (app: express.Application) => {
  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};
