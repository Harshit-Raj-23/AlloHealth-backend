import connectDB from "./db/db.js";
import seedFrontDeskUser from "./db/seedFrontDeskUser.js";
import app from "./app.js";

await connectDB();
await seedFrontDeskUser();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
