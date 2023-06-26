import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false,
        userDataDir: "./tmp"
    });
    const page = await browser.newPage();

    await page.goto('https://www.nguyenkim.com/tim-kiem.html?tu-khoa=hawonkoo');
    // https://www.nguyenkim.com/tim-kiem.html?tu-khoa=hawonkoo

    const productHandles = await page.$$('.nk-result-grid .product-render > .product-slide > .product');
    let i = 0;
    let items = [];

    for (const producthandle of productHandles) {
        let title = 'Null';
        let code = 'Null'
        let price = 'Null';
        let link = 'Null'

        try {
            const title = await page.evaluate(el => el.querySelector('.product-body > .product-title > a').textContent, producthandle)
            const code = /([A-Z]+([\-_])?[0-9]+(\+)?([\-A-Za-z]+)?(?!\-\s))/.exec(title);
            const price = await page.evaluate(el => el.querySelector('.product-body > .product-price > p').textContent, producthandle)
            const link = await page.evaluate(el => el.querySelector('.product-header > .product-image > a').getAttribute('href'), producthandle)
            if ( title !== 'Null'){
                items.push({ title, code, price, link });
            }
        } catch (e) {

        }

        console.log(items)

    }


})();