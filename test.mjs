import { chromium } from "@playwright/test";

async function testPage() {
	const browser = await chromium.launch();
	const page = await browser.newPage();

	try {
		const response = await page.goto("http://localhost:3000/");
		console.log("Page loaded with status:", response.status());

		await page.waitForTimeout(2000);

		page.on("console", (msg) => console.log("Browser console:", msg.text()));

		const content = await page.content();
		console.log("Page content:", content);
	} catch (error) {
		console.error("Test failed:", error);
		process.exit(1);
	} finally {
		await browser.close();
	}
}
testPage();
