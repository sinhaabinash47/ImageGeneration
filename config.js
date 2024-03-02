// // config.js
// const getApiUrl = () => {
//     return process.env.PROJECT_MODE === 'development' ?
//       process.env.API_BASE_URL_DEVELOPMENT :
//       process.env.API_BASE_URL_PRODUCTION;
//   };

//   export { getApiUrl };
let getApiUrl = "";
let servergetApiUrl = ""
if (process.env.API_BASE_URL_ === "DEV") {
    getApiUrl = "http://localhost:8080"
    servergetApiUrl = "https://your-production-api-url.com"
}
else if (process.env.API_BASE_URL_ === "PROD") {
    getApiUrl = "http://localhost:8080"
    servergetApiUrl = "http://google.com"
}

export default getApiUrl