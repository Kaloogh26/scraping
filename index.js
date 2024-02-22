import express from 'express';
import puppeteer from 'puppeteer';

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/getDataFromWebPage', async (req, res) => {
    const { imdbLink } = req.body;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(imdbLink);

    const data = await page.evaluate(() => {
        const title = document.querySelector('div > p').innerText;
        const description = document.querySelector('p').innerText;
        return {
            title,
            description,
        };
    });

    await browser.close();
    res.json(data);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
