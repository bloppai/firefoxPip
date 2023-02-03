//hourly opens
const sites = ['https://www.wanikani.com/', 'https://www.khanacademy.org/mission/sat', 'https://www.test.com'];

function openTabs(event) {
	console.log(event);
	const time = new Date();
	const minutesToNextHour = 60 - time.getMinutes();
	if (!minutesToNextHour) minutesToNextHour = 60;
	browser.alarms.create('openTabs', { periodInMinutes: minutesToNextHour });

	if (event.name === 'openTabs')
		browser.storage.local.get('productiveSite').then((res) => {
			browser.tabs.create({ url: sites[res.productiveSite] });
			browser.storage.local.set({ productiveSite: res.productiveSite === sites.length - 1 ? 0 : res.productiveSite + 1 });
		});
}
browser.runtime.onStartup.addListener(openTabs);
browser.runtime.onInstalled.addListener(openTabs);
browser.alarms.onAlarm.addListener(openTabs);
