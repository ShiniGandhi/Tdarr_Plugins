module.exports.details = function details() {
  return {
    id: "Tdarr_Plugin_lolz_to_Telegram",
    Stage: "Post-processing",
    Name: "Teledarr",
    Type: "Video",
    Operation: "",
    Description: `Report to Telegram bot after transcode \n\n`,
    Version: "1.00",
    Link: "",
    Tags: "3rd party,post-processing,configurable",

    Inputs: [
      {
        name: "botid",
        tooltip: `
      Enter the Bot ID

     \\nExample:\\n
      1149661297:AAFZR1tyzKYGRsv55fw12dQlDr4jfP1MODI
      `,
      },
      {
        name: "chatid",
        tooltip: `

      Enter the ChatID (if the chatID contains '-', include it)

     \\nExample:\\n
      -335164577
      `,
      },
    ],
  };
};


module.exports.plugin = function plugin(file, librarySettings, inputs) {
  const request = require("request");
  const botid =  inputs.botid;
  const chatid = inputs.chatid;

  var term = file.file.split("/");
  term = term[term.length - 1];
  term = encodeURI(term);

  console.log(botid);
  console.log(term);

  request.get(
    `https://api.telegram.org/bot${botid}/sendMessage?chat_id=${chatid}&text=*File Processed*\n${term}&parse_mode=markdown`,
    {
      json: {},
    },
    (error, res, body) => {
      if (error) {
        console.error(error);
      }
       console.log(`statusCode: ${res.statusCode}`)
      console.log(body)

    }
  );


};
