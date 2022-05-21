import express from "express";
import {generateDir} from "./generateDir.js";
import {dirname,resolve} from "path";
import {fileURLToPath} from 'url';
import fs from "fs";
import mammoth  from "mammoth";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static('public')); //设置静态文件路径
app.use("/files",express.static('assets'));

app.get('/dir',(req,resp)=>{
	
	 const data = fs.readFileSync(resolve(__dirname,'./dir.json'),'utf-8');
	 resp.json(JSON.parse(data));
})

app.get('/getfile',(req,resp)=>{
	const filename = req.query.path; //获取文件名
	const suffix = filename.slice(filename.lastIndexOf('.')+1); //获取文件后缀
	switch (suffix){
		case"doc":
		case "docx":
		   mammoth.convertToHtml({path:req.query.path})
				   .then((result)=>{
						 var html = result.value;  // 生成 HTML
					   resp.send(html); // 返回 HTML
				   }).done();
			break;
		case "xls":
		case "xlsx":
			 const content = fs.readFileSync(filename); //读取文件内容
			 resp.send(content); // 返回文件内容
			 break;
		default:
			const data = fs.readFileSync(req.query.path,'utf-8');
			resp.send(data);
			break;
	}
})

app.listen(port,() => console.log(`Server listen on ${port},\nyou can access url: http://localhost:${port}`))
		.on("error",e => console.log("服务器启动失败",e))

generateDir(resolve(__dirname,'./assets')); //生成文件目录