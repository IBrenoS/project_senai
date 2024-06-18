import mongoose from "mongoose";

async function main() {
  try {
    mongoose.set("strictQuery", true);

    await mongoose.connect(
      "mongodb+srv://breno:YVn9AVR1OK3EALzM@clinica.lxp7ugy.mongodb.net/?retryWrites=true&w=majority&appName=Clinica"
    );
  } catch (error) {
    console.log(`Erro: ${error}`);
  }
}

export default main;

