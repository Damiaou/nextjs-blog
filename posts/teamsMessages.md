---
title: "Teams message from bash"
date: '2021-04-13'
---

### _Using a bash function on your linux server to send messages to your Teams channels_

Recently my team changed its communication from [Mattermost](https://mattermost.com/) to [Teams](https://www.microsoft.com/en-ww/microsoft-teams/group-chat-software). At the same time a big project was launched.

For most use cases there were not a very meaningfull changes except for hooks triggered by deployment  for our applications who would warn all teams ; can be useful in those remote working times.

After a few month of 'we don't have time for this', I could finally give it some this week and it was really easy to set up thanks to [this nice gist by Chu-Siang Lai](https://gist.github.com/chusiang/895f6406fbf9285c58ad0a3ace13d025).

To use from it from everywhere and making it accessible fro mall people from my teams I had to follow some paths :

1. Create teams connector in your channel

I'm going to rely on [Microsoft Teams doc](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/connectors-using#setting-up-a-custom-incoming-webhook) for this part as they know their product better than anyone.

 2. Once it is done you have got to get the url of the newly created Incoming Webhooks by clicking the copy button alongside the url

 3. Our webhook is now set up we can ssh in the server from where we want to send notifications (or our local comp if that's what we need)

 4. For convenience I often choose to store scripts in */opt/scripts/*, the location choice is up to you, and we are going to 

```bash
touch send-teams-message.sh
```

Now open it with your default editor and copy past the content of the [gist](https://gist.github.com/chusiang/895f6406fbf9285c58ad0a3ace13d025) (thanks again !)

 5. To make usage easier we are going to create a bash function who knows our teams connector URL and can be called like

```bash
send_message 'Title' 'Content'
```

So first of all, got to */etc/profilde.d/*

If it does not exist, create a [00-aliases.sh](http://00-aliases.sh) (just like before) and paste this in it :

```bash
send_message () {
	bash /opt/scripts/send-teams-message.sh "PASTEYOUR_URL_HERE" "$1" "#FFFFF" "$2"
}
```

 This is a bash function who takes 2 arguments, the title and the content of the team card.

 6. Time to try, but first we need to either close and restart our shell or 

```bash
source /etc/profile.d/00-aliases.sh
```

**Once done, you can try to send a message to your Teams Channel.**

I am very aware that a lot of tools have built-in connectors for this type of things and I encourage you to use it before getting in this manual stuff. 

But if you find yourself having to broadcast the event of a bash script by example, this becomes handy.

Again thanks to [Chu-Siang Lai](https://github.com/chusiang) for the nifty Gist ! This would have been harder and longer to write from scratch.

*Little tip from zsh user : 00-aliases.sh is not read by default in zsh, you have to add this line*

 

```bash
source /etc/profile.d/00-aliases.sh
```

*to your ~/.zshrc to make the function available !*