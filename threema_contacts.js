// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: magic;

//Please change here only something, if you already know what you do. This content will be used for the Widget preview in Scriptable.
//It is possible to display up to five contacts.
//Parameters: [Name, ThreemaID]...
//Example: ECHO,ECHOECHO,Threema.ch,*THREEMA,Support,*SUPPORT,MyData,*MY3DATA,Reg-Bawü,*REGBAWU
//Don't change here anything. This content will used for the Widget preview.

/** @type {{id:string, name:string}[]} */
const contacts = []

/** @type {string[]} */
let params
if (!config.runsInWidget) {
  const parameters = 'ECHO,ECHOECHO,Aniken,*THREEMA,Eric,*SUPPORT,MyData,*MY3DATA,Nico,*REGBAWU'
  params = parameters.split(',')
} else {
  params = args.widgetParameter?.split(',') ?? []
}

let i = 0
while (i + 1 < params.length && i < 2 * 5) { // adds up to 5 contacts
  contacts.push({ name: params[i], id: params[i + 1] })
  i += 2
}

// URL Link
const url = ['https://threema.id/', '?text=']

// Images for the Contacts; Copyright 2020 by "netzpython27"
let contactURL = "https://raw.githubusercontent.com/netzpython27/contact_threema_widget/main/messagephone.png";

let contactImg = await getImage(contactURL);

//Parameter for the Widget
let widget = new ListWidget()

widget.setPadding(10, 10, 10, 10)
widget.spacing = 5
widget.backgroundColor = Color.dynamic(Color.white(), Color.black())
const widgettitle = widget.addText("Favoriten Threema") //Title of the Widget
widgettitle.textColor = Color.dynamic(Color.red(),Color.yellow())
widgettitle.centerAlignText()
widgettitle.font = Font.semiboldMonospacedSystemFont(20)
widget.addSpacer(4)

let row = widget.addStack()

row.addSpacer(10) // Helps to center align the image
//Add Contacts
contacts.forEach(contact => {
  // Add contact
  const contact_url = url[0] + contact.id + url[1] //URL Shortcut to the contact
  addContact(contactImg, contact.name, contact_url, row)
  row.addSpacer(10) // Helps to center align the image
})

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
  widgetname.textColor = Color.dynamic(Color.black(),Color.orange())
  stack.addSpacer(4)
}

async function getImage(url) {
  let req = new Request(url)
  return await req.loadImage()
}
//End of the Script
