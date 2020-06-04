var new_input = document.getElementById("input");
var table = document.getElementById("table");
var i = 0;
window.onload=function(){
	
	
	document.getElementById("add_btn").onclick = function(){
		let new_task = new_input.value;
		if(new_task==""){
			alert("Missing task content");
		}else{
		
			var newtr = document.createElement("tr");
			newtr.id = "tr"+i;
			table.appendChild(newtr);
			
			var task = document.createElement("td");
			var remove_btn = document.createElement("td");
			
			task.innerText = new_task;
			remove_btn.innerHTML = '<a href="#"><i class="fas fa-times"></i></a>';
			newtr.appendChild(task);
			newtr.appendChild(remove_btn);
			new_input.value = "";
			remove_btn.firstElementChild.onclick=function(){
				if(confirm("Are you sure?")==true)
					this.parentElement.parentElement.remove();
			}
			i++;
		}
		
	}
	
	document.getElementById("rmall_btn").onclick = function(){
		if(confirm("Are you sure?")==true)
			table.innerHTML="";
	}
	
}

//for testing
function remove_task(obj){
	alert("removing");
}

