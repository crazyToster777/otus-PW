import { expect, type Locator, type Page } from '@playwright/test';
import {SearchElement} from "../elements/searchElement";
import {SmallModalElement} from "../elements/smallModalElement";

export class ProfilePage {
    readonly page: Page;
    readonly paginationSelector: Locator;
    readonly searchElement: SearchElement
    readonly smallMW: SmallModalElement


    constructor( page: Page, ) {
        this.page = page;
        this.paginationSelector = page.locator('[aria-label="rows per page"]');
        this.searchElement = new SearchElement(page)
        this.smallMW = new  SmallModalElement(page)

    }

    async open() {
        await this.page.goto('/books')
    }

    async choosePaginationOption(){
        await this.paginationSelector.selectOption('25')
    }

}