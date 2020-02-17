import mongoose, { Schema, Document } from "mongoose";

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@full-stack-open-tbpvi.gcp.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });

type PersonType = {
  name: string;
  number: string;
} & Document;

const phonebookSchema: Schema = new mongoose.Schema({
  name: String,
  number: String
});

const Phonebook = mongoose.model<PersonType>("Phonebook", phonebookSchema);

const createPhonebook = (name: string, number: string) => {
  const phonebook = new Phonebook({
    name,
    number
  } as PersonType);
  phonebook
    .save()
    .then(response => {
      console.log("phoneBook saved!");
      mongoose.connection.close();
    })
    .catch(e => {
      console.log(e);
    });
};

const findAllPhonebook = () => {
  Phonebook.find({}).then(result => {
    result.forEach(phonebook => {
      console.log(phonebook);
    });
    mongoose.connection.close();
  });
};
if (process.argv[3] && process.argv[4]) {
  createPhonebook(process.argv[3], process.argv[4]);
} else {
  findAllPhonebook();
}
