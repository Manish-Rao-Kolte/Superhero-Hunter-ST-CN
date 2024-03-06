const pubicKey = "28fe1aa6fe785c16bcc9d0de336a275f";
const privateKey = "61a8b2021cb56f19043926a6cad307bff328a675";
const ts = new Date();
const hash = md5(ts + privateKey + pubicKey);

console.log(hash);
