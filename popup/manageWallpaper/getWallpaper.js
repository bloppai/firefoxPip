//css :(
const itemsPerRow = 4;

browser.storage.local.get('wallpaperId').then((res) => {
	for (var i = 0; i < res.wallpaperId.length; i++) {
		generateCard(res.wallpaperId[i], i % itemsPerRow === 0, i + 1 === res.wallpaperId.length);
	}
});

let cardContainer = document.getElementById('card-grid');

function remove(id) {
	id = Number(id.target.id);
	console.log(typeof id);
	let db;
	const request = indexedDB.open('pip', 1);
	request.onerror = (event) => {
		console.log('error: ' + event);
	};
	request.onsuccess = (event) => {
		db = event.target.result;
		const requestDelete = db.transaction(['wallpapers'], 'readwrite').objectStore('wallpapers').delete(id);
		requestDelete.onsuccess = (event) => {
			console.log('deleted');
			browser.storage.local.get('wallpaperId').then((res) => {
				browser.storage.local.set({ wallpaperId: res.wallpaperId.filter((n) => n !== id) });
			});
			window.location.reload();
		};
		requestDelete.onerror = (event) => console.log('error: ' + event);
	};
}

function getCardContent(link, fileName, id) {
	return `<div class="col">
    <div class="card">
      <img src=${link} class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${fileName}</h5>
        <button type="button" class="btn btn-danger" id=${id}>Remove</button>
      </div>
    </div>
  </div>`;
}

function generateCard(id, newRow, last) {
	let request = indexedDB.open('pip', 1);

	request.onerror = (event) => {
		console.log('error: ' + event);
	};

	request.onsuccess = (event) => {
		let db = event.target.result;
		const requestData = db.transaction('wallpapers', 'readonly').objectStore('wallpapers').get(id);
		requestData.onsuccess = (event) => {
			const data = event.target.result;
			const imageUrl = URL.createObjectURL(data.blob);
			if (newRow) cardContainer.innerHTML += '<div class="row"></div>';
			const currentRow = document.querySelector('#card-grid').lastChild;
			currentRow.innerHTML += getCardContent(imageUrl, data.fileName, id);
			if (last) browser.storage.local.get('wallpaperId').then((res) => res.wallpaperId.forEach((id) => (document.getElementById(String(id)).onclick = remove)));
		};
	};
}
