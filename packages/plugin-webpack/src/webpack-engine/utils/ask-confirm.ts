import inquirer from "inquirer";

export default function askAnswer(message: string): Promise<boolean> {
  const prompt = inquirer.createPromptModule();
  return prompt({
    type: "confirm",
    name: "confirmed",
    message,
    default: true,
  }).then((answer) => {
    if (answer.confirmed) {
      return true;
    }
    return false;
  });
}
