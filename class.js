import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({
        headless:false
    });
    const page = await browser.newPage();

    await page.goto('https://www.nguyenkim.com/tim-kiem.html?tu-khoa=hawonkoo&trang=3')


})();