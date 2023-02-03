document.getElementById('addWallpaper').onclick = () => browser.tabs.create({ url: 'manageWallpaper/addWallpaper.html' });
document.getElementById('getWallpaper').onclick = () => browser.tabs.create({ url: 'manageWallpaper/getWallpaper.html' });
document.getElementById('productive').onclick = getProductive;
