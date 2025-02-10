# Repro for issue 8180

## Versions

firebase-tools: v13.30.0<br>
firebase-admin: v13.1.0<br>
node: v22.13.1<br>
platform: macOS Sonoma 14.7.2

## Steps to reproduce

1. Install dependencies
   - Run `cd admin-app`
   - Run `npm i`
   - Run `cd ../`
2. Download a service-account key and create a file `admin-app/service-account.json`
   - This is required, will raise an error without a service account.
3. Run `firebase emulators:start --project demo-project`
4. Open a new terminal
   - Run `cd admin-app`
   - Run `node .`
   - Errors with:

```
FirebaseAppError: Error while making request: write EPROTO 808F8EEE01000000:error:0A00010B:SSL routines:ssl3_get_record:wrong version number:../deps/openssl/openssl/ssl/record/ssl3_record.c:355:
. Error code: EPROTO
    at <PATH>/8180/admin-app/node_modules/firebase-admin/lib/utils/api-request.js:265:19
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async <PATH>/8180/admin-app/node_modules/firebase-admin/lib/data-connect/data-connect-api-client-internal.js:91:26
    at async main (file://<PATH>/8180/admin-app/index.js:18:25) {
  errorInfo: {
    code: 'app/network-error',
    message: 'Error while making request: write EPROTO 808F8EEE01000000:error:0A00010B:SSL routines:ssl3_get_record:wrong version number:../deps/openssl/openssl/ssl/record/ssl3_record.c:355:\n' +
      '. Error code: EPROTO'
  },
  codePrefix: 'app'
}
```

# Notes

Changing `process.env.DATA_CONNECT_EMULATOR_HOST = "127.0.0.1:9399"` to `process.env.DATA_CONNECT_EMULATOR_HOST = "http://127.0.0.1:9399"`
