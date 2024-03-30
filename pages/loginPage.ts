import { expect, type Locator, type Page } from '@playwright/test';
import {ProfilePage} from "./profilePage";

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passInput: Locator;
    readonly loginButton: Locator;
    readonly signInButton: Locator;

    constructor( page: Page, ) {
        this.page = page;
        this.loginButton= page.locator('button[id=login]');
        this.usernameInput = page.locator('input[id=userName]');
        this.passInput = page.locator('input[id=password]');
    }

    async open() {
        await this.page.goto('/login')
    }

    async login(username: string, pass: string): Promise<ProfilePage>  {
        await this.usernameInput.fill(username);
        await this.passInput.fill(pass);
        await this.loginButton.click();
        return new ProfilePage(this.page);
    }
}