import { isCancel, select, text } from "@clack/prompts";
import { taskManager } from "../manager/tasksManager.js";
import { listTask } from "./listTask.js";
import { mainMenu } from "./main.js";

export async function updateTask(taskId) {
    const task = taskManager.get(taskId); 

    const dataFormatada = new Date(task.createdAt).toLocaleString();

    console.log(`\nTarefa: ${task.name}`);
    console.log(`Status: ${task.status}`);
    console.log(`Criada em: ${dataFormatada}`);

    const escolha = await select ({
        message: "Qual a sua escolha?",
        options:[
            {label: "Alterar nome", value: "alterarNome"},
            {label: "Alterar status", value: "alterarStatus"},
            {label: "Deletar", value: "deletar"},
            {label: "Voltar", value: "voltar"}
        ]
    })

    if (isCancel(escolha)){
        mainMenu();
        return;
    }
    
    switch(escolha){
        case "alterarNome":
            const newName = await text({ 
                message: "Novo nome para a tarefa: ",
                validate(input){
                    if(!input || input.trim().length === 0){
                        return "Não é permitido nome vazio!"
                    }
                }
            })

            if (isCancel(newName)){
                updateTask(taskId);
                return;
            }

            taskManager.rename(taskId, newName);
            console.log("Nome alterado!")

            listTask();
            break;

        case "alterarStatus":

            const escolha = await select ({
            message: "Defina o status",
            options:[
                {label: "Em andamento", value: "Em andamento"},
                {label: "Concluido", value: "Concluido"},
                {label: "Cancelar", value: "Cancelado"},
                {label: "Voltar", value: "Voltar"}
                ]
            })

            if (isCancel(escolha)){
                updateTask(taskId);
                return;
            }

            if (escolha === "Voltar"){
                updateTask(taskId);
                return
            }

            taskManager.setStatus(taskId, escolha);
            console.log("Status definido!")

            listTask();
            break;

        case "deletar":
            const nameTask = task.name;

            const sucsess = taskManager.remove(taskId);
            console.log(`${nameTask} removido da lista de tarfeas`);

            listTask();
            break;

        case "voltar":
            listTask();
            break;
    }
}