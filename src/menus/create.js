import { isCancel, text } from "@clack/prompts";
import { taskManager } from "../manager/tasksManagerPg.js";

export async function createTask() {
    let name;

    name = await text({
        message: "Digite o nome da tafera: ",
        validate(input){
            if(!input || input.trim().length === 0){
                return "Não é permitido nome vazio!"
            }
        }
    })

    if (isCancel(name)){
        return;
    }
    
    await taskManager.create(name);

    console.log("\nTAREFA CRIADA COM SUCESSO!!!\n")
}