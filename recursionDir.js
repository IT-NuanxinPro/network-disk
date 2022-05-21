import fs from 'fs';

// 判断是否是文件夹
const checkFileHandle = (filename,res,cb) =>{
	fs.stat(filename,(err,stats)=>{
		if(err) return cb(err);
		const startIndex = filename.lastIndexOf('/')+1; //获取文件名的开始位置
		if(stats.isDirectory()){
			const i = res.push({});
			readDir(filename,res[i-1],cb); //递归读取文件夹
		}else if(stats.isFile()){
			const name = filename.slice(startIndex); //获取文件名
			res.push(name);
			cb();
		}
	})
}

// 递归读取文件夹
const readDir = (dir,res,cb) => {
	fs.readdir(dir,(err,files) => {
		if (err) return cb(err)
		const startIndex = dir.lastIndexOf("/")+1
		res.name = dir.slice(startIndex)
		res.path = dir
		res.dir = []
		const iterator = (index) => {
			if(files.length === index) return cb()
			
			checkFileHandle(dir+"/"+files[index],res.dir,(err) => {
				if(err) return cb(err)
				
				iterator(index+1)
			})
		}
		
		iterator(0)
	})
}

/*const readDir = (dir,res,cb)=>{
	fs.readdir(dir,(err,files)=>{
		if(err) return cb(err);
		let index = 0;
		const readFile = ()=>{
			if(index >= files.length){
				return cb();
			}
			const filename = dir + '/' + files[index];
			checkFileHandle(filename,res,()=>{
				index++;
				readFile();
			})
		}
		readFile();
	})
} */

//导出
export const listNestedFiles = (dir,cb)=>{
	const res = {};
	readDir(dir,res,err=>{
		if(err) return cb(err);
		cb(null,res);
	});
}