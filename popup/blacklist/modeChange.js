browser.storage.local.get('focus').then((res) => (document.getElementById('focus').checked = res.focus));
browser.storage.local.get('wank').then((res) => (document.getElementById('wank').checked = res.wank));

//document wide listener because of restrictions for extension popup :(
document.addEventListener('click', (e) => {
	type = e.target.id;
	value = e.target.checked;
	if (type === 'focus') {
		browser.storage.local.set({ focus: value }).catch((err) => console.log(err));
		if (value) {
			browser.storage.local.set({ wank: false }).catch((err) => console.log(err));
			document.getElementById('wank').checked = false;
		}
	} else if (type === 'wank') {
		browser.storage.local.set({ wank: value }).catch((err) => console.log(err));
		if (value) {
			browser.storage.local.set({ focus: false }).catch((err) => console.log(err));
			document.getElementById('focus').checked = false;
		}
	}
});
