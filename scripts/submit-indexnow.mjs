#!/usr/bin/env node
/**
 * Ruddranil.io — Standalone Manual IndexNow URL Submission Script
 *
 * Usage (run manually AFTER deploying /public/fa8bed3033164f2ba7f102767042724d.txt to Vercel):
 *   node scripts/submit-indexnow.mjs
 */

const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const HOST = 'ruddranil-io.vercel.app';
const API_KEY = 'fa8bed3033164f2ba7f102767042724d';
const KEY_LOCATION = `https://${HOST}/${API_KEY}.txt`;

// Strictly ONLY the 4 canonical public indexable URLs (never private/noindex routes)
const URL_LIST = Object.freeze([
  'https://ruddranil-io.vercel.app/',
  'https://ruddranil-io.vercel.app/services',
  'https://ruddranil-io.vercel.app/portfolio',
  'https://ruddranil-io.vercel.app/reviews',
]);

const DISALLOWED_PRIVATE_SEGMENTS = [
  '/admin',
  '/admin-login',
  '/login',
  '/customer-dashboard',
  '/work-tracking',
  '/api',
];

function validatePublicUrlList(urls) {
  if (!Array.isArray(urls) || urls.length === 0) {
    throw new Error('URL list is empty. Aborting IndexNow submission.');
  }

  for (const url of urls) {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:' || parsed.host !== HOST) {
      throw new Error(`Invalid host or protocol for IndexNow URL: ${url}`);
    }
    const lowerPath = parsed.pathname.toLowerCase();
    for (const blocked of DISALLOWED_PRIVATE_SEGMENTS) {
      if (lowerPath === blocked || lowerPath.startsWith(`${blocked}/`) || lowerPath.startsWith(`${blocked}.`)) {
        throw new Error(`Blocked private/noindex route detected in URL list: ${url}`);
      }
    }
  }
}

function describeStatus(status) {
  switch (status) {
    case 200:
      return 'OK — URLs submitted successfully and key validated immediately.';
    case 202:
      return 'Accepted — URLs received by IndexNow; key verification is queued asynchronously.';
    case 400:
      return 'Bad Request — Invalid payload format.';
    case 403:
      return 'Forbidden — IndexNow key is invalid or key file is not yet accessible live at keyLocation.';
    case 422:
      return 'Unprocessable Entity — URLs do not match host or key does not match the schema.';
    case 429:
      return 'Too Many Requests — Rate limited by IndexNow; retry later.';
    default:
      return 'Unexpected HTTP response from IndexNow endpoint.';
  }
}

async function submitIndexNow() {
  if (typeof fetch !== 'function') {
    console.error('Error: Built-in fetch is unavailable. Please run with Node.js 18 or newer.');
    process.exitCode = 1;
    return;
  }

  try {
    validatePublicUrlList(URL_LIST);
  } catch (validationError) {
    console.error(`Validation Error: ${validationError.message}`);
    process.exitCode = 1;
    return;
  }

  const payload = {
    host: HOST,
    key: API_KEY,
    keyLocation: KEY_LOCATION,
    urlList: [...URL_LIST],
  };

  console.log('Submitting public canonical URLs to IndexNow...');
  console.log(`Endpoint:     ${INDEXNOW_ENDPOINT}`);
  console.log(`Host:         ${HOST}`);
  console.log(`Key Location: ${KEY_LOCATION}`);
  console.log(`URL Count:    ${payload.urlList.length}`);
  payload.urlList.forEach((url, idx) => console.log(`  ${idx + 1}. ${url}`));

  try {
    const requestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    };

    if (typeof AbortSignal !== 'undefined' && typeof AbortSignal.timeout === 'function') {
      requestInit.signal = AbortSignal.timeout(15000);
    }

    const response = await fetch(INDEXNOW_ENDPOINT, requestInit);
    const responseText = (await response.text()).trim();

    console.log('');
    console.log(`HTTP Status:  ${response.status} ${response.statusText}`);
    console.log(`Result:       ${describeStatus(response.status)}`);
    if (responseText) {
      console.log(`Response:     ${responseText}`);
    }

    if (response.status !== 200 && response.status !== 202) {
      console.error('IndexNow submission was not accepted.');
      process.exitCode = 1;
    }
  } catch (networkError) {
    console.error('');
    console.error('Network Error: Failed to reach IndexNow API.');
    console.error(`Details: ${networkError && networkError.message ? networkError.message : String(networkError)}`);
    process.exitCode = 1;
  }
}

submitIndexNow();
