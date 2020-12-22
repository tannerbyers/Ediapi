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
		<a href="https://healthcarecodesetapi.herokuapp.com/codes/">Website</a>
		•
		<a href="todo">Docs</a>
		•
		<a href="https://healthcarecodesetapi.herokuapp.com/codes/">Demo</a>
	</strong>
</p>
<p align="center">
	<a href="https://github.com/tannerbyers/Ediapi/issues"><img
		alt="Open Issues"
		src="https://img.shields.io/github/issues/tannerbyers/ediapi"></a>
	<a href="https://github.com/tannerbyers/Ediapi/issues"><img
		alt="Uptime"
		src="https://img.shields.io/uptimerobot/ratio/m786727822-1185e454c643e3e40b2a2eb4"></a>
	<a href="https://img.shields.io/github/languages/code-size/tannerbyers/ediapi"><img
		alt="Total project size"
		src="https://img.shields.io/github/languages/code-size/tannerbyers/ediapi"></a>
	<a href="https://img.shields.io/github/languages/code-size/tannerbyers/ediapi"><img
		alt="Is currently maintained"
		src="https://img.shields.io/maintenance/yes/2020"></a>
</p>

<p align="center">
	<img src="https://raw.githubusercontent.com/thelounge/thelounge.github.io/master/img/thelounge-screenshot.png" width="550">
	<p align="center"> Demo of a autofill feature using ediapi </p>
</p>

* **HCPCS** and **NDC** Codeets currently supported.
* Add Ediapi to your existing software to validate **x12 or HL7** transactions.
* **Hight Customized** to fit different use cases: large file based x12 processing engines
 or small online widgets (like autofill tool).
* Can provide **Code, Description, Dates, and more** for codes or paremeteries specified. You do not have to know the code to search! 

---

## Usage
```
git clone 
cd ediapi
npm install
npm run update-codes
npm start 
```

| System Parts  | Technology Used |
| ------------- | ------------- |
| Server  | Heroku  |
| Database  | MongoDB  |
| Backend | Javascript | 

## Process
Ediapi is a api built around Healthcare Codes. It scrapes CMS and other healthcare websites, pulls and formats their codeset spreadsheets and provides this data via an easy to use api.

## Background
I want to make an easy to use frontend and api for healthcare codesets so
that people can easily make projects or improvie their existing ones. 

⚠️ I do not work on this full time so it will not always be up to date. 
The updates to the codesets are made by either cron jobs (depending on when the
codesets are released) or via manual updates which I do w/ my free time. 

Thanks!
