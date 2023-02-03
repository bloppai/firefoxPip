browser.storage.local.get('wank').then((res) => {
	if (res.wank) checkUrl('wankList');
});
browser.storage.local.get('focus').then((res) => {
	if (res.focus) checkUrl('focusList');
});

function checkUrl(type) {
	browser.storage.local.get(type).then((res) => {
		res[type].forEach((item) => {
			console.log(item);
			console.log(window.location.href.includes(item));
			if (window.location.href.includes(item)) window.location.href = browser.runtime.getURL('wallpaper/index.html');
		});
	});
}
