
let defaultBody = {
  blocks: [
    {
      data: {
        level: 1,
        text: "Untitled"
      },
      type: "header"
    }
  ]
};

let EmptyNote = {
  title: "Untitled",
  date: new Date(),
  createdDate: new Date(),
  bodyBlock: defaultBody
};


let homePageBody = {"time":1579245849827,"blocks":[{"type":"header","data":{"text":" Welcome to Sakka!","level":1}},{"type":"paragraph","data":{"text":"<b>Sakka</b> is a note editor that stores your texts, documents in the web browser. There is no online storage involved in this application, all of your notes, poems, novel, memos, etc are stored locally in your machine.&nbsp;&nbsp;"}}],"version":"2.16.1"}
let HomeNote =
{
  title: "Home Page",
  date: new Date(),
  createdDate: new Date(),
  bodyBlock: homePageBody
}


export {EmptyNote,HomeNote}


