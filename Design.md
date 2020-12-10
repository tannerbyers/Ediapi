# Design Document

I will add any new features here to make sure they don't get lost and notes for me to reference later 

Firstly I need to load the hcpcs codeset via the cms website. 
Then look into adding other codesets like the ndc (different url, keywords, file) 

Needed
---
* Special scraper for each page/codeset
* Parser that converts the file found into a json object
* Send json object to mongodb 


Things to note about codes!
* They can have multiple effective/termination dates (they get removed and added back on later in time)

data needed for code:
Data Type, FieldName, Example Value
STRING Code A6404
STRING Name A6404
STRING Long Description Gauze, non-impregnated, sterile, pad size more than 16 sq. in. less than or equal to 48 sq. in., without adhesive border, each dressing
STRING Short Description Sterile gauze>16 <= 48 sq in
LIST OF STRINGS Effective Date/Termination Date ["20030101"]

Possibly have a load config file with the codeset info needed to get it loaded? 

loadCodeset : {
hcpcs: {
  url: https://www.cms.gov/Medicare/Coding/HCPCSReleaseCodeSets/Alpha-Numeric-HCPCS
  loadProcess: hcpcScraper.js
  parser: hcpcsCodesetParser.js

}, 
ndc : {
  etc..
}
}
