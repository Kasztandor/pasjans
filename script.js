var cards = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"]
var lastColum = ""

function previousAndNextCard(x){ //previous card
	var index = cards.indexOf(x)
	if (index != -1){
		var ret = []
		if (index==0){
			ret.push(-1)
		}
		else{
			ret.push(cards[index-1])
		}
		if (index==(cards.length-1)){
			ret.push(-1)
		}
		else{
			ret.push(cards[index+1])
		}
		return ret
	}
	return -1
}
function checkSimbol(a, b, x=0){
	var classes = [(a.classList.contains("pik")?0:a.classList.contains("kier")?1:a.classList.contains("trefl")?2:3),(b.classList.contains("pik")?0:b.classList.contains("kier")?1:b.classList.contains("trefl")?2:3)]
	if (x==0){ // another color
		if((classes[0]+classes[1])%2!=0){
			return true
		}
	}
	else if (x==1){ // exactly the same
		if(classes[0] == classes[1]){
			return true
		}
	}
	return false
}
function dragRenew(){
	document.querySelectorAll(".card").forEach((t)=>{
		t.addEventListener("dragstart", (event)=>{
			t.classList.add("dragging")
			lastColum = t.parentNode
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