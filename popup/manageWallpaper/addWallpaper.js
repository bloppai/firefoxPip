const fileElement = document.querySelector('#input');
fileElement.addEventListener('change', handleFiles, false);

function handleFiles() {
	for (var i = 0; i < this.files.length; i++) {
		let file = this.files[i];
		const reader = new FileReader();
		reader.addEventListener('load', (event) => {
			const blob = new Blob([event.target.result], { type: file.type });
			storeBlob(file.name, blob);
		});
		reader.readAsArrayBuffer(file);
	}
}

function storeBlob(fileName, blob) {
	let db;
	const request = indexedDB.open('pip', 1);

	request.onerror = (event) => {
		console.log('error: ' + event);
	};

	request.onupgradeneeded = (event) => {
		db = event.target.result;
		const objectStore = db.createObjectStore('wallpapers', { autoIncrement: true });
		objectStore.createIndex('wallpaper', 'wallpaper', { unique: false });
	};

	request.onsuccess = (event) => {
		if (!fileName || !blob) return;
		db = event.target.result;
		const objectStore = db.transaction('wallpapers', 'readwrite').objectStore('wallpapers');
		objectStore.add({ fileName: fileName, blob: blob }).onsuccess = (event) =>
			browser.storage.local.get('wallpaperId').then((res) => browser.storage.local.set({ wallpaperId: res.wallpaperId.concat([event.target.result]) }));
	};
}
