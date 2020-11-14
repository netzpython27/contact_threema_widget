// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: magic;

//Please change here only something, if you already know what you do. This content will be used for the Widget preview in Scriptable.
//It is possible to display five contacts at the same time.
//The parameters are stored as follows: name,thID,name,thID,name,thID,name,thID,name,thID
//Example: ECHOECHO,ECHOECHO,Threema.ch,*THREEMA,Support,*SUPPORT,MyData,*MY3DATA,Reg-Bawü,*REGBAWU

let name =[];
let thID =[];
name[0] = "ECHO";
thID[1] = "ECHOECHO";
name[2] = "Aniken";
thID[3] = "*THREEMA";
name[4] = "Eric";
thID[5] = "*SUPPORT";
name[6] = "MyData";
thID[7] = "*MY3DATA";
name[8] = "Nico";
thID[9] = "*REGBAWU";

if (!config.runsInWidget) {
    //This content can you see online in the Scriptable App. 
    name[0];
    thID[1];
    name[2];
    thID[3];
    name[4];
    thID[5];
    name[6];
    thID[7];
    name[8];
    thID[9];

} else {

const params = args.widgetParameter ? args.widgetParameter.split(",") : undefined

    name[0] = params[0] //Parameter Name for the contact.
    thID[1] = params[1] //Parameter Threema ID for the Widget. 
    name[2] = params[2]
    thID[3] = params[3] 
    name[4] = params[4]
    thID[5] = params[5] 
    name[6] = params[6]
    thID[7] = params[7] 
    name[8] = params[8]
    thID[9] = params[9] 
  }
// URL Link for Threema contact
let url = [];
url[0] = "https://threema.id/";
url[1] = "?text=";

// Images for the contacts
let contactURL = "https://image.flaticon.com/icons/png/512/2279/2279178.png";

//Get Image for the contact 
let contactImg = await getImage(contactURL);

//Parameter for the Widget
let widget = new ListWidget()

widget.setPadding(10, 10, 10, 10)
widget.spacing = 5
widget.backgroundColor = Color.dynamic(Color.white(), Color.black())//Dark und Light Mode 
const widgettitle = widget.addText("Favouriten Threema") //Title of the Widget
widgettitle.textColor = Color.brown()
widgettitle.centerAlignText()
widgettitle.font = Font.boldSystemFont(20)
widget.addSpacer(4)

let row = widget.addStack()

//List with all five Threema Contacts
addContact(
    contactImg, //Contact Image
    name[0], //and his name.
    url[0] + thID[1] + url[1], //URL Shortcut to the contact
    row)
row.addSpacer(10)

addContact(
    contactImg,
    name[2],
    url[0] + thID[3] + url[1],
    row)
row.addSpacer(10)

addContact(
    contactImg,
    name[4],
    url[0] + thID[5] + url[1],
    row)
row.addSpacer(10)

addContact(
    contactImg,
    name[6],
    url[0] + thID[7] + url[1],
    row)
 row.addSpacer(10) 

addContact(
    contactImg,
    name[8],
    url[0] + thID[9] + url[1],
    row)
 row.addSpacer(10) 

widget.presentMedium()

function addContact(img, name, link, r) {
  let stack = r.addStack()
  stack.layoutVertically()
  stack.url = link
  
  let wimg = stack.addImage(img)
  wimg.cornerRadius = 4
  stack.addSpacer(4)
  
  let widgetname = stack.addText(name)
  widgetname.centerAlignText()
  widgetname.font = Font.semiboldRoundedSystemFont(14)
  widgetname.textColor = Color.orange()
  stack.addSpacer(4)
}

async function getImage(url) {
  let req = new Request(url)
  return await req.loadImage()
}
//End of the Script
