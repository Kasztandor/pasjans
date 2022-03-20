var cards = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"]
var lastColum = ""
var allowEverything = false

function unhide(){
	document.querySelectorAll(".hidecard").forEach((t)=>{
		if (t == t.parentNode.lastChild){
			t.classList.remove("hidecard")
			t.classList.add("card")
			t.draggable=true
			dragAdd(t)
		}
	})
}
function previousAndNextCard(x){
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
function checkColor(a, b, x=0){
	if (a==null || b==null){
		return false
	}
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
function dragAdd(t){
	t.addEventListener("dragstart", (event)=>{
		t.classList.add("dragging")
		lastColum = t.parentNode.parentNode
		event.dataTransfer.setDragImage(event.target, window.outerWidth, window.outerHeight);
	})
	t.addEventListener("dragend", ()=>{
		t.classList.remove("dragging")
		unhide()
	})
}
function positioning(t){
	Array.prototype.forEach.call(t.children[1].children, (tt)=>{
		tt.style.top = "calc((var(--ch) / 8) * "+Array.prototype.indexOf.call(tt.parentNode.children, tt)+")"
	})
}
window.onload = () => {
	document.querySelectorAll(".column1").forEach((t)=>{
		t.addEventListener("dragover", ()=>{
			if (document.querySelector(".dragging").parentNode != t.children[1] && (allowEverything || (t.lastChild.lastChild==null && document.querySelector(".dragging").innerHTML[0]==cards[0]) || (checkColor(document.querySelector(".dragging"),t.lastChild.lastChild,1) && previousAndNextCard(document.querySelector(".dragging").innerHTML[0])[0]==t.lastChild.lastChild.innerHTML[0]))){
				if (Array.prototype.indexOf.call(document.querySelector(".dragging").parentNode.children,document.querySelector(".dragging")) == document.querySelector(".dragging").parentNode.childElementCount-1){
					t.children[1].appendChild(document.querySelector(".dragging"))
					t.children[1].lastElementChild.style.top=""
				}
			}
		})
		positioning(t)
	})
	document.querySelectorAll(".column2").forEach((t)=>{
		t.addEventListener("dragover", ()=>{
			if (document.querySelector(".dragging").parentNode != t.children[1] && (allowEverything || t == lastColum || (t.lastChild.lastChild==null && document.querySelector(".dragging").innerHTML[0]==cards[cards.length-1]) || (checkColor(document.querySelector(".dragging"),t.lastChild.lastChild) && previousAndNextCard(document.querySelector(".dragging").innerHTML[0])[1]==t.lastChild.lastChild.innerHTML[0]))){
				var parent = document.querySelector(".dragging").parentNode
				for (var i = Array.prototype.indexOf.call(parent.children, document.querySelector(".dragging")); i < parent.childElementCount;){
					t.children[1].appendChild(parent.children[i])
				}
				positioning(t)
			}
		})
		positioning(t)
	})
	unhide()
}