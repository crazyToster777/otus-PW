import { expect, type Locator, type Page } from '@playwright/test';
import {SearchElement} from "../elements/searchElement";

export class BookPage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly paginationSelector: Locator;
    readonly searchElement: SearchElement

    constructor( page: Page, ) {
        this.page = page;
        this.searchInput= page.locator('input[id=searchBox]');
        this.searchButton = page.locator('[id=basic-addon2]');
        this.paginationSelector = page.locator('[aria-label="rows per page"]');
        this.searchElement = new SearchElement(page)
    }

    async open() {
        await this.page.goto('/books')
    }


    async choosePaginationOption(){
        await this.paginationSelector.selectOption('25')
    }

}