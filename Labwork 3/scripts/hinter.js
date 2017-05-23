function addHint() {
	var oldTextNode = document.getSelection().anchorNode
	var oldText = oldTextNode.textContent
	var base = document.getSelection().baseOffset
	var extent = document.getSelection().extentOffset
	var selected = oldText.substr(base, extent - base)
	var p = oldTextNode.parentElement
	var newText = oldText.split(selected)
	var afterText = document.createElement("text")
	afterText.innerHTML = newText[1]
	p.insertBefore(afterText, oldTextNode)
	var newHint = document.createElement("span")
	newHint.innerHTML = selected
	newHint.title = hint.value
	newHint.className = "hint"
	p.insertBefore(newHint, afterText)
	var beforeText = document.createElement("text")
	beforeText.innerHTML = newText[0]
	p.insertBefore(beforeText, newHint)
	p.removeChild(oldTextNode)
}