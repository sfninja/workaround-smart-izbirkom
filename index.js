const fs = require('fs');
const { webkit, devices } = require('playwright');

(async () => {
  const browser = await webkit.launch();
  const context = await browser.newContext({
    ...devices['iPhone 11 Pro']
  });
  const page = await context.newPage();
  const url = 'http://www.primorsk.vybory.izbirkom.ru/region/izbirkom?action=show&root=252000008&tvd=4254005265098&vrn=100100067795849&prver=0&pronetvd=null&region=25&sub_region=25&type=242&report_mode=null';
  await page.goto(url, {
    timeout: 0
  });
  const table = await page.$eval('div.col', el => el.innerText);
  fs.writeFileSync('out/' + Date.now() + '-' + Math.random() + '.txt', url + '\n' + table, 'utf8');
  await browser.close();
})();
