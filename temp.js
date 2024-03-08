const puppeteer = require("puppeteer");
const loginLink = "https://www.hackerrank.com/auth/login";
const email = "tifax87984@hidelux.com";
const password = "agrawal";
let page ;

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
    let clickOnAlgoPromise = waitAndClick('a[data-attr1="algorithms"]', page);
    return clickOnAlgoPromise;
})

.then(function(){
    let clickOnWarmupPromies = waitAndClick('input[value="warmup"]', page);
    return clickOnWarmupPromies;
    
})
// .then(function(){
//     let waitFor9sec = page.waitFor(9000);
//     return waitFor9sec;
// })
.then(function(){
    let allChallengesPromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled');
    return allChallengesPromise;
})
.then(function(questionsArr){
    console.log("questions array");
    console.log("all question : ", questionsArr.length);
})



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
            console.log("reject");
            reject();
        })
    })
}


