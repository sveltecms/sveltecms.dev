import fs from "fs"
import { execSync } from "child_process";
import { MongoClient } from "mongodb";

const dbFolderPath = `${process.cwd()}/.svelteCMS/db`
const envFilePath = `${process.cwd()}/.env`
const envFileData = fs.readFileSync(envFilePath).toString()

if(!fs.existsSync(dbFolderPath)) fs.mkdirSync(dbFolderPath)

for(const line of envFileData.split("\n")){
    const doNotRun = line.trim().startsWith("#") || !line.includes("=")
    // If it's a comment, skip line
    if(doNotRun) continue
    // Else get variable key and value
    const [ preKey,preValue ] = line.split("=")
    const key = preKey.trim()
    const value = preValue.trim().slice(1,-1)
    process.env[key] = value
}

const DATABASE_URL = process.env.DATABASE_URL
const DATABASE_NAME = process.env.DATABASE_NAME
const dbConnection = new MongoClient(DATABASE_URL)
const COLLECTIONS = await dbConnection.db(DATABASE_NAME).listCollections({}).toArray()

for(const collection of COLLECTIONS){
    execSync(`mongoexport --uri="${DATABASE_URL}" --db=${DATABASE_NAME}  --collection=${collection.name}  --out=${dbFolderPath}/${collection.name}.json`)
}

await dbConnection.close()