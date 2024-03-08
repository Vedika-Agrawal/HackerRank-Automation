const puppeteer = require("puppeteer");
const loginLink = "https://www.hackerrank.com/auth/login";
let page ;
let codeObj = require("./answere");
let idPass = require("./db");

// const email = "tifax87984@hidelux.com";
// const password = "agrawal";

const email = idPass.email;
const password = idPass.password;

let browserOpen = puppeteer.launch({
    headless: false,
    args : ['--start-maximized'],
    defaultViewport :null
})
.then(function(browserObj){
    let browserOpenPromise = browserObj.newPage();
    return browserOpenPromise;
})
.then(function(newTab){
    page = newTab;
    let hackerRankOpenPromise = newTab.goto(loginLink);
    return hackerRankOpenPromise;
})
.then(function(){
    let emailEntered = page.type("input[id='input-1']", email, {delay: 50});
    return emailEntered;
})
.then(function(){
    let passwardEntered = page.type("input[type='password']", password, {delay: 50});
    return passwardEntered;
})
.then(function(){
    let loginButtonEntered = page.click('button[data-analytics="LoginPassword"]' , {delay : 50});
    return loginButtonEntered;
})
.then(function(){
    let clickOnAlgoPromise = waitAndClick('a[data-attr1="algorithms"]', page, {delay : 50});
    return clickOnAlgoPromise;
})
.then(function(){
    return new Promise(resolve => setTimeout(resolve, 2000));
})
.then(function(){
    let warmUpPromise = waitAndClick('input[value="warmup"]', page, {delay : 50});
    console.log("Warm up page clicked");
    return warmUpPromise;
})
.then(function(){
    return new Promise(resolve => setTimeout(resolve, 2000));
})


.then(function(){
    console.log("questions array");
    let allChallengesPromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled');
    return allChallengesPromise;
})
.then(function(questionsArr){
    console.log("all question : ", questionsArr.length);
    let questionWillBeSolved = questionSolver(page, questionsArr[0], codeObj.answere[0]);
    return questionWillBeSolved;
})

function questionSolver(page, question, answere){
    return new Promise(function(resolve, reject){
        let questionWillBeClicked = question.click();
        questionWillBeClicked.then(function(){
            let editorInFocused = waitAndClick('.monaco-editor.no-user-select.vs', page);
            return editorInFocused;
        }).then(function(){
            return waitAndClick('.checkbox-input', page);
        }).then(function(){
            return page.waitForSelector('textarea.custominput', page);
        }).then(function(){
            return page.type('textarea.custominput', answere, {delay: 10});
        }).then(function(){
            return page.keyboard.down('Control');
        }).then(function(){
            return page.keyboard.press('A', {delay:300});
        }).then(function(){
            return page.keyboard.press('X', {delay:300});
        }).then(function(){
            return page.keyboard.up('Control');
        }).then(function(){
            return waitAndClick('.monaco-editor.no-user-select.vs', page);
        }).then(function(){
            return page.keyboard.down('Control');
        }).then(function(){
            return page.keyboard.press('A', {delay:100});
        }).then(function(){
            return page.keyboard.press('V', {delay:100});
        }).then(function(){
            return page.keyboard.up('Control');
        }).then(function(){
            return page.click('.hr-monaco__run-code', {delay: 50});
        })
        .then(function(){
            resolve();
        })
        .then(function(){
            reject();
        })
        
    })
}


function waitAndClick(selector, cPage){
    return new Promise(function(resolve, reject){
        let waitForModelPromise = cPage.waitForSelector(selector);
        waitForModelPromise.then(function(){
            let clickModal = cPage.click(selector);
            return clickModal;
        })
        .then(function(){
            // console.log("resolve");
            resolve();
        })
        .catch(function(err){
            // console.log("reject");
            reject();
        })
    })
}