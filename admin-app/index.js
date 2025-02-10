import { cert, initializeApp } from 'firebase-admin/app';
import { getDataConnect } from 'firebase-admin/data-connect';

process.env.DATA_CONNECT_EMULATOR_HOST = "http://127.0.0.1:9399"

initializeApp({
    projectId: "demo-project",
    credential: cert("./service-account.json")
});

const dataConnect = getDataConnect({
    location: "us-central1",
    serviceId: "test-dc-2"
});

async function main() {
    const query = "query ListMovies { movies { id } }";
    const gqlResponse = await dataConnect.executeGraphql(query);
    console.log(JSON.stringify(gqlResponse))
}

main()