const puppeteer = require("puppeteer");
const loginLink = "https://www.hackerrank.com/auth/login";
const email = "tifax87984@hidelux.com";
const password = "agrawal";
let codeObj = require("./answere");

(async function(){
    try{
        // console.log("entered");
        let browserOpen =  await puppeteer.launch({
            headless: false,
            args : ['--start-maximized'],
            defaultViewport :null
        })
        let newTab = await browserOpen.newPage();
        await newTab.goto(loginLink);
        await newTab.type("input[id='input-1']", email, {delay: 50});
        await newTab.type("input[type='password']", password, {delay: 50});
        await newTab.click('button[data-analytics="LoginPassword"]' , {delay : 50});
        await waitAndClick('a[data-attr1="algorithms"]',newTab);
        await new Promise(resolve => setTimeout(resolve, 2000));
        await waitAndClick('input[value="warmup"]',newTab);
        await new Promise(resolve => setTimeout(resolve, 2000));
        const questionsArr = await newTab.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled');
        // console.log("all question : ", questionsArr.length);
        await questionSolver(newTab, questionsArr[0], codeObj.answere[0]);
        async function questionSolver(page, question, answere) {
            await question.click();
            await waitAndClick('.monaco-editor.no-user-select.vs', page);
            await  waitAndClick('.checkbox-input', page);
            await page.waitForSelector('textarea.custominput', page);
            await page.type('textarea.custominput', answere, {delay: 10});
            await page.keyboard.down('Control');
            await page.keyboard.press('A', {delay:300});
            await page.keyboard.press('X', {delay:300});
            await page.keyboard.up('Control');
            await waitAndClick('.monaco-editor.no-user-select.vs', page);
            await page.keyboard.down('Control');
            await page.keyboard.press('A', {delay:100});
            await page.keyboard.press('V', {delay:100});
            await page.keyboard.up('Control');
            await page.click('.hr-monaco__run-code', {delay: 50});
        }
    }
    catch(err){
        console.log(err);
    }
})()


async function waitAndClick(selector, cPage){
    await cPage.waitForSelector(selector);
    return cPage.click(selector);

}