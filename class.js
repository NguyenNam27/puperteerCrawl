import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({
        headless:false
    });
    const page = await browser.newPage();

    await page.goto('https://www.nguyenkim.com/tim-kiem.html?tu-khoa=hawonkoo&trang=3',{
        waitUntil:"load"
    });
    const is_disabled = await page.$('li.page-item.active > a') !==null;

    console.log(is_disabled)
})();