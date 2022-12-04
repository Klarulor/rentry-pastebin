import {RentryClient, Paste, IPasteStruct} from "rentry-pastebin";

const client = new RentryClient();
(async () => {
    await client.createToken();
    console.log(`New token is: ${client.getToken()}`);
    const struct = await client.createPaste({content: "Idk some words maybe", customEditCode: "imsostupid"})

    if(struct.paste){
        console.log(`Paste url is: "https://rentry.co/${struct.url}" and secret edit key is "${struct.editCode}" and content is "${struct.paste.getContent()}"`);
        //paste.paste.pull(); // Pull or update content from rentry.co
        setTimeout(() => {
            if(struct.paste)
                struct.paste.setContent("new content; New message xD");
            console.log(`Updated content. Check the website`);
        }, 5000);
    }
})()