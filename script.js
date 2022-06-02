var cards = ["A","2","3","4","5","6","7","8","9","1"/*10*/,"J","Q","K"]
//var stock = [["kier", "K"],["pik","Q"],["trefl","J"],["karo","10"]]
var stock = []
var lastColum = ""
var allowEverything = false

function checkWin(){
	if (stock.length == 0 && document.querySelectorAll(".column0")[1].lastChild.children.length == 0){
		var count = 0
		document.querySelectorAll(".column2").forEach((t)=>{
			Array.prototype.forEach.call(t.lastChild.children, ()=>{
				count++
			})
		})
		if (count){
			document.querySelector("main").innerHTML='<div id="win">WIN</div>'
		}
	}
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
		//checkWin()
	})
}
function pick(t){
	if (stock.length > 0){
		var x = document.createElement("div");
		x.innerHTML=stock[stock.length-1][1]
		x.classList.add(stock[stock.length-1][0])
		x.classList.add("card")
		x.draggable=true
		dragAdd(x)
		document.querySelectorAll(".column0")[1].lastChild.appendChild(x)
		if (stock.length == 1){
			t.classList.add("pickcardRedro")
		}
		stock.pop()
	}
	else{
		Array.prototype.forEach.call(document.querySelectorAll(".column0")[1].lastChild.children, (tt)=>{
			stock.unshift([tt.classList.contains("pik")?"pik":tt.classList.contains("kier")?"kier":tt.classList.contains("trefl")?"trefl":"karo",tt.innerHTML])
		})
		if (stock.length > 0){
			t.classList.remove("pickcardRedro")
			document.querySelectorAll(".column0")[1].lastChild.innerHTML=""
		}
		
	}
}
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
function positioning(t){
	Array.prototype.forEach.call(t.children, (tt)=>{
		tt.style.top = "calc((var(--ch) / 8) * "+Array.prototype.indexOf.call(tt.parentNode.children, tt)+")"
	})
}
window.onload = () => {
	/*<div class="hidecard pik">J</div>*/
	var allCards = []
	for (var i = 0; i <=3; i++){
		var iCard = i==0?"pik":i==1?"kier":i==2?"trefl":"karo"
		for (var j = 2; j<=10; j++){
			allCards.push([iCard,j])
		}
		for (var j = 0; j<=3; j++){
			allCards.push([iCard,j==0?"J":j==1?"Q":j==2?"K":"A"])
		}
	}
	var randomCardsOrder = []
	while (allCards.length > 0){
		randomCardsOrder.push(allCards.splice(Math.floor(Math.random()*allCards.length),1)[0])
	}
	for (var i=0; i<7; i++){
		for (var j=0; j<=i; j++){
			var card = randomCardsOrder.pop()
			var col = document.querySelectorAll(".column2")[i].lastChild
			col.innerHTML+='<div class="hidecard '+card[0]+'">'+card[1]+'</div>'
			positioning(col)
		}
	}
	while (randomCardsOrder.length > 0){
		var card = randomCardsOrder.pop()
		stock.push([card[0],card[1]])
	}
	document.querySelectorAll(".column0")[1].addEventListener("dragover", ()=>{
		if (document.querySelector(".dragging").parentNode != document.querySelectorAll(".column0")[1].children[1] && (allowEverything || document.querySelectorAll(".column0")[1] == lastColum)){
			if (Array.prototype.indexOf.call(document.querySelector(".dragging").parentNode.children,document.querySelector(".dragging")) == document.querySelector(".dragging").parentNode.childElementCount-1){
				document.querySelectorAll(".column0")[1].children[1].appendChild(document.querySelector(".dragging"))
				document.querySelectorAll(".column0")[1].children[1].lastElementChild.style.top=""
			}
		}
	})
	document.querySelectorAll(".column1").forEach((t)=>{
		t.addEventListener("dragover", ()=>{
			if (document.querySelector(".dragging").parentNode != t.children[1] && (allowEverything || (t.lastChild.lastChild==null && document.querySelector(".dragging").innerHTML[0]==cards[0]) || (checkColor(document.querySelector(".dragging"),t.lastChild.lastChild,1) && previousAndNextCard(document.querySelector(".dragging").innerHTML[0])[0]==t.lastChild.lastChild.innerHTML[0]))){
				if (Array.prototype.indexOf.call(document.querySelector(".dragging").parentNode.children,document.querySelector(".dragging")) == document.querySelector(".dragging").parentNode.childElementCount-1){
					t.children[1].appendChild(document.querySelector(".dragging"))
					t.children[1].lastElementChild.style.top=""
				}
			}
		})
	})
	document.querySelectorAll(".column2").forEach((t)=>{
		t.addEventListener("dragover", ()=>{
			if (document.querySelector(".dragging").parentNode != t.children[1] && (allowEverything || t == lastColum || (t.lastChild.lastChild==null && document.querySelector(".dragging").innerHTML[0]==cards[cards.length-1]) || (checkColor(document.querySelector(".dragging"),t.lastChild.lastChild) && previousAndNextCard(document.querySelector(".dragging").innerHTML[0])[1]==t.lastChild.lastChild.innerHTML[0]))){
				var parent = document.querySelector(".dragging").parentNode
				for (var i = Array.prototype.indexOf.call(parent.children, document.querySelector(".dragging")); i < parent.childElementCount;){
					t.children[1].appendChild(parent.children[i])
				}
				positioning(t.lastChild)
			}
		})
	})
	unhide()
}