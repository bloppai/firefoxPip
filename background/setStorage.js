function setMode() {
	browser.storage.local.set({ wallpaperId: [], wank: false, focus: false, wankList: [], focusList: [], productiveSite: 0 }).catch((err) => console.log(err));
	browser.tabs.create({ url: '/popup/manageWallpaper/addWallpaper.html' });
}
function deleteDatabase() {
	const request = indexedDB.deleteDatabase('pip');
	request.onsuccess = () => {
		console.log('IndexedDB deleted successfully.');
	};
	request.onerror = () => {
		console.error('Failed to delete IndexedDB.');
	};
}

function setDefaultWallpaper() {
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
		let images = ['osakaNight.jpg', 'tokyoTower.jpg'];
		images.forEach((image) => {
			fetch('../wallpaper/images/' + image)
				.then((response) => response.arrayBuffer())
				.then((arrayBuffer) => {
					var blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
					db = event.target.result;
					const objectStore = db.transaction('wallpapers', 'readwrite').objectStore('wallpapers');
					objectStore.add({ fileName: image, blob: blob }).onsuccess = (event) =>
						browser.storage.local.get('wallpaperId').then((res) => browser.storage.local.set({ wallpaperId: res.wallpaperId.concat([event.target.result]) }));
				});
		});
	};
}

browser.runtime.onInstalled.addListener(deleteDatabase);
browser.runtime.onInstalled.addListener(setMode);
browser.runtime.onInstalled.addListener(setDefaultWallpaper);
