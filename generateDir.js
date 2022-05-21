import {listNestedFiles} from "./recursionDir.js";
import fs from "fs"
import {dirname, resolve} from "path"
import {fileURLToPath} from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const generateDir = dir =>{
	listNestedFiles(dir,(err,res)=>{
		if(err) throw err
		
		const data = JSON.stringify(res,null,2);
		fs.writeFile(resolve(__dirname,"./dir.json"),data,(err)=>{
			if(err) {
				console.log(err)
			}
			console.log("dir.json generated")
		})
	})
}