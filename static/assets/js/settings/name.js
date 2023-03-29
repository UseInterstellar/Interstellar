		function saveName() {
			const name = document.getElementById("name").value;
			localStorage.setItem("name", name);
			alert("Name saved!");
		}
		
		function saveIcon() {
			const icon = document.getElementById("icon").value;
			localStorage.setItem("icon", icon);
			alert("Icon saved!");
		}
