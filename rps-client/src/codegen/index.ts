const fs = require('fs');
const path = require('path');
const $RefParser = require('json-schema-ref-parser');
const { NgOpenApiGen } = require('ng-openapi-gen');

const specPath = path.join(__dirname, 'spec.json');
const clientPath = path.join(__dirname, '/client');

const options = {
  input: specPath,
  output: clientPath,
};

async function downloadSpec(specPath: string) {
  const result = await fetch(process.argv[2]);
  fs.writeFileSync(
    specPath,
    Buffer.from(JSON.stringify(await result.json(), null, 4))
  );
}

async function generateClient() {
  const RefParser = new $RefParser();
  const openApi = await RefParser.bundle(options.input, {
    dereference: { circular: false },
  });

  const ngOpenGen = new NgOpenApiGen(openApi, options);
  ngOpenGen.generate();
}

downloadSpec(specPath)
  .then(() => {
    generateClient()
      .then()
      .catch((err) => {
        console.log('codegen failed');
        console.log(err.message);
      });
  })
  .catch((err) => {
    console.log('spec download failed');
    console.error(err.message);
  });
