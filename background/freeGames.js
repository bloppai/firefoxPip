//rss from "https://steamcommunity.com/groups/freegamesfinders/rss/";

function checkForNewGames() {
	function setLastGame(title) {
		browser.storage.local.set({ lastGameTitle: title }).catch((err) => console.log(err));
	}

	browser.storage.local
		.get('lastGameTitle')
		.then((title) => makeRequest(title.lastGameTitle || ''))
		.then((res) => {
			res[0].forEach((gameUrl) => {
				browser.tabs.create({
					url: gameUrl,
				});
			});
			setLastGame(res[1]);
		});
}

async function makeRequest(lastGame) {
	const server = 'https://pipapi.onrender.com/freeGames?lastGame=' + lastGame;
	try {
		const res = await fetch(server);
		const data = await res.json();
		return data.games;
	} catch (err) {
		console.error(err);
	}
}

browser.runtime.onStartup.addListener(checkForNewGames);
browser.runtime.onInstalled.addListener(checkForNewGames);
