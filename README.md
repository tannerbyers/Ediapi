<h1 align="center">
	<img
		width="300"
		alt="Ediapi"
		src="./demo/logo_transparent.png">
</h1>

<h3 align="center">
	Opensource Healthcare Codeset API
</h3>

<p align="center">
	<strong>
		<a href="https://healthcarecodesetapi.herokuapp.com/codes/">API</a>
		•
		<a href="https://euphonious-pithivier-561736.netlify.app/">Demo</a>
	</strong>
</p>
<p align="center">
	<a href="https://github.com/tannerbyers/Ediapi/issues"><img
		alt="Open Issues"
		src="https://img.shields.io/github/issues/tannerbyers/ediapi"></a>
	<a href="https://img.shields.io/github/languages/code-size/tannerbyers/ediapi"><img
		alt="Total project size"
		src="https://img.shields.io/github/languages/code-size/tannerbyers/ediapi"></a>
	<a href="https://img.shields.io/github/languages/code-size/tannerbyers/ediapi"><img
		alt="Is currently maintained"
		src="https://img.shields.io/maintenance/yes/2020"></a>
</p>

<p align="center">
	<img src="./demo/demo.PNG" width="550">
	<p align="center">Autofill demo app using ediapi </p>
</p>


* Run **Locally** w/ customziations or use the **<a href="https://healthcarecodesetapi.herokuapp.com/codes/"> public api </a>**.
* **HCPCS** and **NDC** Code sets currently supported.
* Add Ediapi to your existing software to validate **x12 or HL7** transactions.
* **Highly Customizable** to fit different use cases:  from large file-based x12 processing engines to small online widgets (ex: autofill search).
* API provides **Code, Description, Dates, and more** for codes or parameters specified. Great for newcomers into the healthcare field! 

---

## Usage
```
npm install

# Copy the config file and update it's values with your mongodb url
cp example-env .env

# This will load all the codesets listed in codesetLoader.js
npm run update-codes

# This will start the API Server
npm start 
```

| System Parts  | Technology Used |
| ------------- | ------------- |
| Server  | Heroku  |
| Database  | MongoDB  |
| Backend | Javascript | 

## Process
Ediapi is an api built around Healthcare Codes. It scrapes CMS and other healthcare websites, pulls and formats their codeset spreadsheets and provides this data via an easy to use api.

## Background
I want to make an easy to use frontend and api for healthcare codesets so
that people can easily make projects or improve their existing ones. 

⚠️ I do not work on this full time so it will not always be up to date. 
The updates to the codesets are made by either cron jobs (depending on when the
codesets are released) or via manual updates which I do w/ my free time. 

Thanks!
