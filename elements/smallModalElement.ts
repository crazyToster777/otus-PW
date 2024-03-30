import { expect, type Locator, type Page } from '@playwright/test';

export class SmallModalElement {
    readonly page: Page;
    readonly closeBtn: Locator;

    constructor( page: Page ) {
        this.page = page;
        this.closeBtn= page.locator('[id=closeSmallModal]');
    }

    async closeMW() {
       await this.closeBtn.click()
    }

}