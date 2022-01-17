require('dotenv').config();
const { AWS_SECRET, AWS_KEY } = process.env;
const AWS = require('aws-sdk');
const path = require('path');
const { promises: fs, createReadStream } = require('fs');

const s3 = new AWS.S3({
    accessKeyId: AWS_KEY,
    secretAccessKey: AWS_SECRET,
    region: 'ap-southeast-1'
});

const buildDir = `${__dirname}/build`;
const bucketName = 'gamifiedrehab.com';

async function listBucketsAsync() {
    return new Promise((resolve, reject) => {
        s3.listBuckets((err, data) => {
            if(err) return reject(err);
            resolve(data);
        });
    });
}

function getMimeType(ext) {
    switch(ext) {
        case '.js':
            return 'application/javascript';
        case '.html':
            return 'text/html';
        case '.txt':
            return 'text/plain';
        case '.json':
            return 'application/json';
        case '.ico':
            return 'image/x-icon';
        case '.svg':
            return 'image/svg+xml';
        case '.css':
            return 'text/css';
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.png':
            return 'image/png';
        case 'webp':
            return 'image/webp';
        case 'map':
            return 'binary/octet-stream';
        default:
            return 'application/octet-stream';
    }
};

async function uploadFilesAsync(filePaths) {
    return Promise.all(filePaths.map(x => {
        const filePath = path.relative(buildDir, x).replace(/\\/g, '/');
        s3.putObject({
            Key: filePath,
            Bucket: bucketName,
            Body: createReadStream(x),
            ContentType: getMimeType(path.extname(filePath))
        }).promise();
    }));
}

async function getFilesPathsAsync(dirPath) {
    const fileNames = await fs.readdir(dirPath, { withFileTypes: true });
    const files = await Promise.all(fileNames.map(x => {
        const res = path.resolve(dirPath, x.name);
        return x.isDirectory() ? getFilesPathsAsync(res) : res;
    }));
    return Array.prototype.concat(...files);
}

(async () => {
    const filePaths = await getFilesPathsAsync(buildDir);
    const result = await uploadFilesAsync(filePaths);
    console.log('Done!');
})();