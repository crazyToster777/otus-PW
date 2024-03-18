import {test, expect} from "@playwright/test";

const cookie = [
    {name: "cookie1", value: "666", path: "/", domain: "demoqa.com"},
    {name: "cookie2", value: "777", path: "/", domain: "demoqa.com"},
]

const mockData = {
    books: [
        {
            isbn: '123456789',
            title: 'Test book',
            subTitle: 'A Working Introduction',
            author: 'New toster',
            publish_date: '2020-06-04T08:48:39.000Z',
            publisher: "O'Reilly Media",
            pages: 777,
            description: 'This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git exp',
            website: 'http://chimera.labs.oreilly.com/books/1230000000561/index.html'
        },
    ]
}


test.describe('Auth test cases', async () => {
    // test.use({ storageState: 'playwright/.auth/user.json' });
    test('check login', async ({page}) => {
        await page.goto('/login');

        // Взаимодействие со страницей - https://playwright.dev/docs/locators & https://playwright.dev/docs/input

        await page.locator('input[id=userName]').fill('Dannytest');
        await page.locator('input[id=password]').fill('Test12345!');
        await page.locator('button[id=login]').click();


        await expect(page.locator('#userName-value')).toBeVisible();

    })

    test('Two browsers', async ({browser}) => {

        //Работа с двумя сессиями бразуеров

        const firstUserSession = await browser.newPage();
        await firstUserSession.goto('/login')

        const secondUserSession = await browser.newPage();
        await secondUserSession.goto('/books')
    });

    test('Fulfill request', async ({page}) => {

        //Пример с изменением ответа запроса. Важно помнить что ответ мы должны изменять до того как выполним сам запрос (перешли на страницу)

        await page.route('https://demoqa.com/BookStore/v1/Books', async (route) => {
            const realResponse = await route.fetch();
            const jsonBody = await realResponse.json();
            Object.assign(jsonBody, mockData);
            await route.fulfill({response: realResponse, json: jsonBody});
        });

        await page.goto('/books')
        await expect(page.getByText('Test book')).toBeVisible();
    })

    test('Work with cookie', async ({page}) => {

        //пример с выставлением куки

        await page.goto('/')
        await page.context().addCookies(cookie)
    })
})
