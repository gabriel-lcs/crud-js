import { existsSync, readFileSync, writeFileSync} from "node:fs";
import { randomUUID } from "node:crypto";
import path from "node:path";

const pathFile = path.join("./tasks.json")

if(!existsSync(pathFile)){
    writeFileSync(pathFile, JSON.stringify([]), "utf-8");
}

const data = readFileSync(pathFile, { encoding: "utf-8"});
const parsed = JSON.parse(data);

const tasks = new Map(parsed.map(task => [task.id, task]))

export const taskManager = {
    save(){
        const data = Array.from(tasks.values());
        writeFileSync(pathFile, JSON.stringify(data, null, 2), "utf-8");
    }, 
    get(id){
        return tasks.get(id)
    },
    create(name){
        const task = {
            id: randomUUID(),
            name: name.trim(),
            status: "Em andamento",
            createdAt: new Date().toISOString()
        };

        tasks.set(task.id, task);
        this.save();
    }, 
    rename(id, name){
        const task = tasks.get(id);

        task.name = name.trim();
        this.save();
    },
    setStatus(id, status){
        const task = tasks.get(id);

        task.status = status;
        this.save();
    },
    remove(id){
        tasks.delete(id);
        this.save();
    },
    toArray(){
        return Array.from(tasks.values());
    }
}