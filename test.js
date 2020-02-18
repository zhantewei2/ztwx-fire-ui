const subprocess=require("child_process");

const d=new Date();

const r=subprocess.execSync("git config user.name");
console.log(r.toString())