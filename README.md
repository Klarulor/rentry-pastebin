# Rentry Pastebin
``Client for https://rentry.co/ API``

## Installation
```
$ npm install rentry-pastebin
```
## Examples
```
$ git clone git://github.com/klarulor/rentry-pastebin/ --depth 1
$ cd exmaple
$ npm install
```

```typescript
import {RentryClient, Paste} from "rentry-pastebin";

const client = new RentryClient();
(async () => {
    await client.createToken();
    console.log(`New token is: ${client.getToken()}`);
    const paste = await client.createPaste({content: "Idk some words maybe", customEditCode: "imsostupid"})
    console.log(`Paste url is: "https://rentry.co/${paste.url}" and secret edit key is "${paste.editCode}" and content is "${paste.paste.getContent()}"`);
    //paste.paste.pull(); // Pull or update content from rentry.co
    setTimeout(() => {
        paste.paste.setContent("new content; New message xD");
        console.log(`Updated content. Check the website`);
    }, 5000);

})()
```

## Documentation

Import:
```typescript
import {RentryClient, Paste} from "rentry-pastebin";
```
Create client with auth-token:
```typescript
const client = new RentryClient();
await client.createToken();
console.log(`New token is: ${client.getToken()}`);
```
Create new paste:
```typescript
const struct = await client.createPaste({content: "Idk some words maybe", customEditCode: "imsostupid"})
console.log(`Paste url is: "https://rentry.co/${struct.url}" and secret edit key is "${struct.editCode}" and content is "${struct.paste.getContent()}"`);
```
Update content
```typescript
struct.paste.setContent("new content; New message xD");
```