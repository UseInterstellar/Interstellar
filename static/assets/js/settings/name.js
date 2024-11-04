		function saveName() {
			const name = document.getElementById("name").value;
			localStorage.setItem("name", name);
		}
		
		function saveIcon() {
			const icon = document.getElementById("icon").value;
			localStorage.setItem("icon", icon);
		}
