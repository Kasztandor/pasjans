var cards = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"]
function pCard(x){ //previous card
	
}
function nCard(x){ //next card
	//
}
function dragRenew(){
	document.querySelectorAll(".card").forEach((t)=>{
		t.addEventListener("dragstart", (event)=>{
			t.classList.add("dragging")
			event.dataTransfer.setDragImage(event.target, window.outerWidth, window.outerHeight);
		})
		t.addEventListener("dragend", ()=>{
			t.classList.remove("dragging")
		})
	})
}
window.onload = () => {
	dragRenew()
	document.querySelectorAll(".column").forEach((t)=>{
		t.addEventListener("dragover", ()=>{
			if (document.querySelector(".dragging").parentNode != t.children[1]){
				if(t.classList.contains("column1")){
					if (Array.prototype.indexOf.call(document.querySelector(".dragging").parentNode.children,document.querySelector(".dragging")) == document.querySelector(".dragging").parentNode.childElementCount-1){
						t.children[1].appendChild(document.querySelector(".dragging"))
						t.children[1].lastElementChild.style.top=""
					}
				}
				else if(t.classList.contains("column2")){
					var parent = document.querySelector(".dragging").parentNode
					for (var i = Array.prototype.indexOf.call(parent.children, document.querySelector(".dragging")); i < parent.childElementCount;){
						t.children[1].appendChild(parent.children[i])
					}
					Array.prototype.forEach.call(t.children[1].children, (tt)=>{
						tt.style.top = "calc((var(--ch) / 8) * "+Array.prototype.indexOf.call(tt.parentNode.children, tt)+")"
					})
				}
			}
		})
	})
}