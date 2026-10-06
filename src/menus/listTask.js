import { isCancel, select } from "@clack/prompts";
import { taskManager } from "../manager/tasksManager.js";
import { updateTask } from "./update.js";

export async function listTask(){
    while (true){
        const tasks = taskManager.toArray();
    
        if (tasks.length < 1){
            console.log("\nNENHUMA TAREFA PARA SER LISTADA\n");
            return;
        }
        
        const escolha = await select({
            message: "Selecione uma tafera",
            options: [
                ...tasks.map((task) => ({
                    label: `(${task.status}) ${task.name}`, value: task.id
                })),
                {label: "Voltar", value: -1}
            ],
        })
    
        if (isCancel(escolha) || escolha === -1){
            return;
        }
    
        await updateTask(escolha);  
    }
}