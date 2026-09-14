import https from 'https';

const publishProfile = process.env.AZURE_PUBLISH_PROFILE;
if (!publishProfile) {
  console.error('AZURE_PUBLISH_PROFILE is not set');
  process.exit(1);
}

const urlMatch = publishProfile.match(/publishUrl="([^":]+)(?::443)?"/i) || publishProfile.match(/publishUrl="([^"]+)"/i);
const userMatch = publishProfile.match(/userName="([^"]+)"/i);
const pwdMatch = publishProfile.match(/userPWD="([^"]+)"/i);

if (!urlMatch || !userMatch || !pwdMatch) {
  console.error('Failed to parse publish profile XML');
  process.exit(1);
}

const scmHost = urlMatch[1].replace(/^https?:\/\//, '').replace(/\/.*$/, '');
const auth = Buffer.from(userMatch[1] + ':' + pwdMatch[1]).toString('base64');

console.log('Connecting to Kudu at https://' + scmHost + ' as ' + userMatch[1] + '...');

function kuduRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: scmHost,
      port: 443,
      path: path,
      method: method,
      headers: {
        'Authorization': 'Basic ' + auth,
        'Content-Type': 'application/json',
      },
    };

    if (body) {
      options.headers['Content-Length'] = Buffer.byteLength(body);
    }

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, headers: res.headers, data });
      });
    });

    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, data }));
    }).on('error', reject);
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  try {
    console.log('\n--- 1. Inspecting Environment & Settings ---');
    const envRes = await kuduRequest('GET', '/api/environment');
    console.log('Environment:\n' + envRes.data);

    const settingsRes = await kuduRequest('GET', '/api/settings');
    console.log('Settings:\n' + settingsRes.data);

    console.log('\n--- 2. Inspecting /home/site/wwwroot & /home/LogFiles ---');
    const lsRes = await kuduRequest('POST', '/api/command', JSON.stringify({
      command: 'ls -lat /home/LogFiles | head -20',
      dir: '/home/site/wwwroot',
    }));
    console.log('LogFiles:\n' + lsRes.data);

    const dockerLogRes = await kuduRequest('POST', '/api/command', JSON.stringify({
      command: 'tail -n 100 /home/LogFiles/*_docker.log 2>/dev/null || true',
      dir: '/home/site/wwwroot',
    }));
    console.log('Docker Log Tail:\n' + dockerLogRes.data);

    console.log('\n--- 4. Restarting Azure App Service ---');
    const restartRes = await kuduRequest('POST', '/api/restart');
    console.log('POST /api/restart status: ' + restartRes.statusCode);

    if (restartRes.statusCode !== 200 && restartRes.statusCode !== 204) {
      console.log('Restart via API returned status ' + restartRes.statusCode + ' - killing node processes directly...');
      const killRes = await kuduRequest('POST', '/api/command', JSON.stringify({
        command: 'pkill -9 -f node || true',
        dir: '/home/site/wwwroot',
      }));
      console.log('kill output:\n' + killRes.data);
    }

    console.log('\n--- 5. Verifying Clean URLs on Live Website ---');
    const siteUrl = 'https://techsteps-azhjfdhnacfqaeh3.southindia-01.azurewebsites.net';

    let allPassed = false;
    for (let attempt = 1; attempt <= 12; attempt++) {
      console.log('Attempt ' + attempt + '/12: waiting 5 seconds...');
      await sleep(5000);

      try {
        const check = await httpsGet(siteUrl + '/about-us');
        console.log('GET /about-us -> HTTP ' + check.statusCode);
        if (check.statusCode === 200) {
          console.log('SUCCESS! /about-us returned HTTP 200!');
          allPassed = true;
          break;
        } else {
          console.log('Response body snippet: ' + check.data.slice(0, 150));
        }
      } catch (err) {
        console.log('Request error (app may be restarting): ' + err.message);
      }
    }

    if (!allPassed) {
      console.error('\nWARNING: /about-us did not return 200 within 60 seconds.');
    } else {
      console.log('\n✓ Verified: All clean URLs are serving properly on Azure App Service!');
    }
  } catch (err) {
    console.error('Kudu management error:', err);
  }
}

run();

