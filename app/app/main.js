var FileHound = require('filehound');
const path = require("path");
const fs = require("fs");
var directorio = document.querySelector("#directorio");
var texto = document.querySelector("#texto");
var lista = document.querySelector("#lista");
var comments = [];
var loader = `
<div class="showbox">
  <div class="loader">
    <svg class="circular" viewBox="25 25 50 50">
      <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
    </svg>
  </div>
  <p class="text-center">Cargando...</p>
</div>`;
var msg = `<h3 class="centerText">Selecciona el directorio a verificar</h3>`;

window.onload = function(){
	var li = document.createElement("li");
		li.innerHTML = msg;
	lista.appendChild(li);
}

function procesarInit(){
	texto.innerHTML = "Estado: Iniciando proceso de validación";
	lista.innerHTML = loader;
	var comments = []
	var files = FileHound.create().paths(directorio.files[0].path).ext('asp').find();
	setTimeout(function(){
		texto.innerHTML = "Estado: Buscando código comentado dentro del directorio";
	},500)
	setTimeout(function(){
		files.then(result => {
			for(let i = 0; i <= result.length - 1; i++){
				fs.readFile(result[i], 'utf-8', (err, data) => {
					if(err) {
						texto.innerText = "Error: " + err;
						texto.style.color = "red";
		                return;
					}
				    var info = data.split(/\n/);
				    for(let o = 0; o <= info.length - 1; o++){
				    	if (info[o].indexOf("<!--") > -1) {
				    		if (info[o].indexOf("<!--#include") > -1) {

					    	} else if(info[o].indexOf("<!--#INCLUDE") > -1){
					    		
					    	} else if(info[o].indexOf("<!-- #include") > -1){

					    	} else if(info[o].indexOf("<!-- #INCLUDE") > -1){

					    	} else {
					    		comments.push({line:o,route:result[i],comment:info[o]});
					    	}
				    	}
				    }
				});
			}
		})
		.then(() => {
			setTimeout(function(){
				lista.innerHTML = "";
				if(comments.length == 0){
					var li = document.createElement('li');
			    		li.style.listStyle = 'none';
			    		li.style.padding = "0px 10px";
			    		li.classList.add("items");
		    		var comment = document.createElement("h2");
			    		comment.innerText = "¡Felicitaciones, tu código no contiene comentarios!";
			    		comment.style.color = "green";
			    		comment.style.textAlign = "center";
			    		comment.style.position = "relative";
			    		comment.style.top = "100px";

			    		li.appendChild(comment);
			    		lista.appendChild(li);
				} else {
					comments.map((element, index) => {
						var li = document.createElement('li');
			    		li.style.listStyle = 'none';
			    		//li.style.padding = "0px 10px";
			    		li.classList.add("items");
			    		li.classList.add("item");
			    		var line = document.createElement("p");
			    		var route = document.createElement("p");
			    		var comment = document.createElement("p");

			    		line.innerText = "Linea: " + element.line;
			    		route.innerText = "Archivo: " + element.route;
			    		comment.innerText = "Comentario: " + element.comment;
			    		comment.style.color = "red";

			    		li.appendChild(comment);
			    		li.appendChild(line);
			    		li.appendChild(route);

			    		lista.appendChild(li);
					});
				}
			},1000)
		})
		.then(() => {
			setTimeout(function(){
				texto.innerHTML = "Estado: Proceso terminado con exito!";
			},1000)
		})
	},1000)
}


/*const findRemoveSync = require('find-remove');

const extentions = [
	'.DS_Store', 
	'.DS_Store?',
	'._*',
	'.Spotlight-V100',
	'.Trashes',
	'.db',
	'.pyo',
	'.pyc',
	'.psd',
	'.eps',
	'.ai',
	'.idea',
	'.ini',
	'.classpath',
	'.project',
	'.settings',
	'.metadata',
	'.iml',
	'.ipr',
	'.bak',
	'.sublime-workspace',
	'.swp',
	'.msi',
	'.env',
	'.vscode'
];







var pasok = function(){
	return new Promise(function(resolve,reject){
		console.log(chalk.yellow("Iniciando proceso"));
		var errores = [];
		console.log(chalk.cyan("Buscando codigo comentado"));
		setTimeout(function(){
			files.then(result => {
				for(let i = 0; i <= result.length - 1; i++){
					fs.readFile(result[i], 'utf-8', (err, data) => {
						if(err) {
							reject(err);
			                return;
						} 
					    var info = data.split(/\n/);
					    for(let o = 0; o <= info.length - 1; o++){
					    	if (info[o].indexOf("<!--") > -1) {
					    		if (info[o].indexOf("<!--#include") > -1) {
						    	} else {
						    		errores.push({line:o,route:result[i],comment:info[o]})
						    	}
					    	}
					    }
					    setTimeout(function(){
					    	resolve(errores);
					    },5000);
					});
				}
			});
		},1000)
	})
}

pasok()
.then(res => {
	console.log(" ");
	for(let item of res){
		console.log(chalk.red("=> linea: ",item.line," del archivo: ", item.route), chalk.blue(" || comentario: => ",item.comment));
	}
})
.then(data => {
	console.log(" ");
	console.log(chalk.cyan("eliminando archivos basura"));
	const result = findRemoveSync(__dirname, {extensions: extentions});
	console.log(chalk.magenta.bold('archivos eliminados:'));
	console.log(result)
})
.then(() => {
	console.log(" ");
	console.log(chalk.green("proceso finalizado"))
})*/