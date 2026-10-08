import { isCancel, select, text } from "@clack/prompts";
import { taskManager } from "../manager/tasksManagerPg.js";

export async function updateTask(taskId) {
    while (true){
        const task = await taskManager.get(taskId); 
    
        const dataFormatada = new Date(task.created_at).toLocaleString();
    
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
    
        if (isCancel(escolha) || escolha === "voltar"){
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
                    continue;
                }
    
                await taskManager.rename(taskId, newName);
                console.log("Nome alterado!")
    
                return;
    
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
    
                if (isCancel(escolha) || escolha === "Voltar"){
                    continue;
                }

                await taskManager.setStatus(taskId, escolha);
                console.log("Status definido!")
    
                return;
    
            case "deletar":
                const deletedTask = await taskManager.delete(taskId);
                
                console.log(`${deletedTask.name} removido da lista de tarfeas`);
    
                return;
        }
    }
}