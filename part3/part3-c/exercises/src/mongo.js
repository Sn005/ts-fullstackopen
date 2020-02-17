const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@full-stack-open-tbpvi.gcp.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Phonebook = mongoose.model("Phonebook", phonebookSchema);

const createPhonebook = (name, number) => {
  const phonebook = new Phonebook({
    name,
    number
  });

  phonebook.save().then(response => {
    console.log("phonebook saved!");
    mongoose.connection.close();
  });
};
createPhonebook("fuga", "12345");
// const phonebook = new Phonebook({
//   name: "hoge",
//   number: "12345"
// });

// phonebook.save().then(response => {
//   console.log("phonebook saved!");
//   mongoose.connection.close();
// });
// const createPhonebook = (name, number) => {
//   const phonebook = new Phonebook({
//     name,
//     number
//   });
//   phonebook
//     .save()
//     .then(response => {
//       console.log("phoneBook saved!");
//       mongoose.connection.close();
//     })
//     .catch(e => {
//       console.log(e);
//     });
//   console.log("createPhonebook");
// };

// const findAllPhonebook = () => {
//   Phonebook.find({}).then(result => {
//     result.forEach(phonebook => {
//       console.log(phonebook);
//     });
//     mongoose.connection.close();
//   });
// };
// if (process.argv[3] && process.argv[4]) {
//   createPhonebook(process.argv[3], process.argv[4]);
//   process.exit(1);
// }

// // findAllPhonebook();
// // process.exit(1);
