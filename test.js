// const puppeteer = require("puppeteer");
 import puppeteer from 'puppeteer';
 const fs = require('fs');

const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false,
        userDataDir: "./tmp",
    });
    // const puppeteer = require("puppeteer");
    const page = await browser.newPage();
    await page.goto(
        "https://www.nguyenkim.com/tim-kiem.html?tu-khoa=hawonkoo"
    );

    let isBtnDisabled = false;
    while (!isBtnDisabled) {
        await page.waitForSelector('[data-cel-widget="0"]');
        const productsHandles = await page.$$(
            ".nk-result-grid .product-render > .product-slide > .product"
        );

        for (const producthandle of productsHandles) {
            let title = "Null";
            let price = "Null";
            let img = "Null";

            try {
                title = await page.evaluate(
                    (el) => el.querySelector(".product-body > .product-title > a").textContent,
                    producthandle
                );
            } catch (error) {}

            try {
                price = await page.evaluate(
                    (el) => el.querySelector(".product-body > .product-price > p").textContent,
                    producthandle
                );
            } catch (error) {}

            try {
                img = await page.evaluate(
                    (el) => el.querySelector(".product-header > .product-image > a").getAttribute("href"),
                    producthandle
                );
            } catch (error) {}
            if (title !== "Null") {
                fs.appendFile(
                    "results.csv",
                    `${title.replace(/,/g, ".")},${price},${img}\n`,
                    function (err) {
                        if (err) throw err;
                    }
                );
            }
        }

        await page.waitForSelector("li.active > a", { visible: true });
        const is_disabled = (await page.$("li.page-item.active > a")) !== null;

        isBtnDisabled = is_disabled;
        if (!is_disabled) {
            await Promise.all([
                page.click("li.page-item.active > a"),
                page.waitForNavigation({ waitUntil: "networkidle2" }),
            ]);
        }
    }

    await browser.close();
})();