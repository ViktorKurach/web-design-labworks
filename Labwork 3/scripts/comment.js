jQuery(document).ready(function() {
	$.getJSON("scripts/comments.json", {}, function(json) {
		var commentBlock = document.getElementById("commentBlock")
		for (i = 0; i < json["data"].length; ++i) {
			var l = json["data"].length
			var h3 = document.createElement("h3")
			h3.innerHTML = json["data"][i].name
			commentBlock.appendChild(h3)
			var h4 = document.createElement("h4")
			h4.innerHTML = json["data"][i].time+", "+json["data"][i].date
			commentBlock.appendChild(h4)
			var p = document.createElement("p")
			p.innerHTML = json["data"][i].comment
			commentBlock.appendChild(p)
		}
	})
})

function validate(name) {
	if (name == "") {
		document.getElementById("alert").innerHTML = "У нас не публікуються анонімні відгуки..."
		return false
	}
	return true
}

function getTime(now) {
	var now = new Date()
	var res = ""
	var hours = now.getHours()
	if (hours <= 9)
		res = "0"
	res = res + hours + ":"
	var minutes = now.getMinutes()
	if (minutes <= 9)
		res = res + "0"
	return res + minutes
}

function getDate(now) {
	var res = ""
	var day = now.getDate()
	if (day <= 9)
		res = "0"
	res = res + day + "."
	var month = now.getMonth() + 1
	if (month <= 9)
		res = res + "0"
	res = res + month + "."
	var year = now.getFullYear()
	return res + year
}

function addComment() {
	var name = document.getElementById("name").value
	if (!validate(name))
		return false
	var comment = document.getElementById("comment").value
	$.getJSON("scripts/comments.json", {}, function(json) {
		var now = new Date
		var comm_data = {"name": name, "time": getTime(now), "date": getDate(now), "comment": comment}
		$.post("scripts/add_comment.php", comm_data, function(data) {
			var p = $.parseHTML(data)
			for (i = 0; i < 3; ++i)
				document.getElementById("commentBlock").appendChild(p[i])
		})
	})
	document.getElementById("name").value = ""
	document.getElementById("comment").value = ""
	document.getElementById("alert").value = ""
	return false;
}