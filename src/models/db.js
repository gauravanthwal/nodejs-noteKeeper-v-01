const mongoose = require('mongoose')

mongoose.connect(
  "mongodb+srv://gaurav_123:gaurav@123@cluster0.jofsq.mongodb.net/noteDB",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });
