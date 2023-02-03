// document.querySelector('#listAdd').value = 'https://www.';
document.querySelector('#addSiteForm').addEventListener('submit', (e) => {
	e.preventDefault();
	const url = e.target[1].value;
	e.target[1].value = '';
	const list = e.target[0].value;
	browser.storage.local.get(list).then((res) => {
		if (res[list].includes(url) || !checkUrl(url)) return console.log('not set');
		res[list].push(url);
		browser.storage.local
			.set(list === 'focusList' ? { focusList: res[list] } : { wankList: res[list] })
			.then(() => console.log('done'))
			.catch((err) => console.log(err));
	});
});

function checkUrl(url) {
	var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	return expression.test(url);
}
