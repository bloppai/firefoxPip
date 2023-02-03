browser.storage.local.get('wallpaperId').then((res) => setWallpaper(res.wallpaperId[Math.floor(Math.random() * res.wallpaperId.length)]));

function setWallpaper(id) {
	let request = indexedDB.open('pip', 1);

	request.onerror = (event) => {
		console.log('error: ' + event);
	};

	request.onupgradeneeded = (event) => {
		db = event.target.result;
		const objectStore = db.createObjectStore('wallpapers', { autoIncrement: true });
		objectStore.createIndex('wallpaper', 'wallpaper', { unique: false });
	};

	request.onsuccess = (event) => {
		let db = event.target.result;
		const requestData = db.transaction('wallpapers', 'readonly').objectStore('wallpapers').get(id);
		requestData.onsuccess = (event) => {
			const data = event.target.result;
			const imageUrl = URL.createObjectURL(data.blob);
			$('.container').css('background-image', 'url(' + imageUrl + ')');
		};
	};
}
