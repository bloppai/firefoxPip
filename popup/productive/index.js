function getProductive() {
	browser.bookmarks
		.search({ title: 'to do' })
		.then((res) => findChildren(res[0].id, []))
		.then((sites) => browser.tabs.create({ url: sites[Math.floor(Math.random() * sites.length)] }))
		.catch((err) => console.log(err));

	async function findChildren(id, sites = []) {
		const res = await browser.bookmarks.getChildren(id);
		const promises = res.map((bookmark) => {
			if (bookmark.type === 'folder') {
				return findChildren(bookmark.id, sites);
			} else {
				sites.push(bookmark.url);
				return Promise.resolve();
			}
		});
		await Promise.all(promises);
		return sites;
	}
}
