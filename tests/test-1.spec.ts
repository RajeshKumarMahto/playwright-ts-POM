import {test, expect} from '@playwright/test'
import AddComputerPage from './support/pageobjectmodel/pages/addcomputer.page';
import ComputersPage from './support/pageobjectmodel/pages/computer.page';
import ComputerActions from './support/pageobjectmodel/sections/computerActions.section';
import ComputerDetails from './support/pageobjectmodel/sections/computerDetails.section';

test('Basic test',async ({page}) => {
    await page.goto("https://computer-database.gatling.io/computers");
    await page.getByRole('link', {name:'Add a new computer'}).click();
    await page.locator('#name').fill('CommitQuality');
    await page.locator('#introduced').fill('1999-11-11');
    await page.locator('#discontinued').fill('2000-11-11');
    await page.locator('#company').selectOption({label:'Apple Inc.'});
    await page.getByRole('button', {name:'Create this computer'}).click();

    await expect(
        page.getByText("Done ! Computer CommitQuality has been created")
    ).toBeVisible();

});

test('Basic test -POM',async ({page}) => {
    const computerPage = new ComputersPage(page);
    const addComputerPage = new AddComputerPage(page);
    await computerPage.goto();
    await addComputerPage.clickAddNewComputer();
    await addComputerPage.addNewComputer();
    await computerPage.assertNewComputerAdded();
});


