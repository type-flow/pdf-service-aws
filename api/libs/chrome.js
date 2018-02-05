import Cdp from 'chrome-remote-interface';

const PDF_OPTIONS = {
  landscape: false,
  displayHeaderFooter: false,
  printBackground: false,
  scale: 1,
  paperWidth: 8.27, // 210mm DIN A4
  paperHeight: 11.69, // 297mm
  marginTop: 0,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0

}

/**
 * Generates a PDF from the given HTML string, launching Chrome as necessary.
 *
 * @export
 * @param {string} html the HTML string.
 * @param {Options} [options] the generation options.
 * @returns {Promise<CreateResult>} the generated PDF data.
 */
export async function create(html) {

  const options = { host: '127.0.0.1' };

  try {
    const tab = await Cdp.New();
    try {
      return await generate(html, options, tab);
    } finally {
      await Cdp.Close({ ...options, id: tab.id });
    }
  } finally {
    if (chrome) {
      await chrome.kill();
    }
  }
}


async function generate(html, options, tab) {

  const client = await CDP({ ...options, target: tab });

  try {
    // await beforeNavigate(options, client);
    const {Page} = client;
    const url = /^(https?|file|data):/i.test(html) ? html : `data:text/html,${html}`;

    await Promise.all([
      Page.navigate({url}),
      Page.loadEventFired(),
    ]); // Resolve order varies

    await afterNavigate(options, client);
    // https://chromedevtools.github.io/debugger-protocol-viewer/tot/Page/#method-printToPDF

    const pdf = await Page.printToPDF(PDF_OPTIONS);
    // await throwIfCanceledOrFailed(options);

    // return new CreateResult(pdf.data);
    console.log(pdf.data);
    return 'should be the result coming back!';
  } finally {
    client.close();
  }
}