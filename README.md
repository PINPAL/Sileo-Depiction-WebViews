# Jailbreak Repo Web Viewer
## Generate a Cydia/Sileo Repository on a Webpage

**Includes:**
* All Package Viewer
* Package Category Sorting
* Package Category Viewer
* Sileo Depiction Viewer
* iOS Style UI

This can be used to generate a WebView depiction for Cydia using just your SileoDepiction.json file!

###Repo Viewer
Available [here](https://pinpal.github.io/Sileo-Depiction-WebViews/repo/)
\n
Simply Specify your Repo's URL in the addresss. 
For example you can view my Cydia repo in using the following arguement:

```
https://pinpal.github.io/Sileo-Depiction-WebViews/repo/?repo=https://pinpal.github.io/
```

| Property      | Description |
| ------------- | ------------- |
| repo          | URL of Cydia Repo  |

###Depiction Viewer
Available [here](https://pinpal.github.io/Sileo-Depiction-WebViews/repo/)
\n
Simply Specify your SileoDepiction JSON file in the address.
You can also add other optional arguements seperated by an and (&) symbol for a more complete depiction eg:
```
https://pinpal.github.io/Sileo-Depiction-WebViews/?json=https://pinpal.github.io/package/Example/SileoDepiction.json&name=Example&dev=PINPAL
```

| Property      | Description |
| ------------- | ------------- |
| json          | URL of SileoDepiction JSON file  |
| name          | Tweak Title  |
| dev          | Tweak Developer  |
| section          | Tweak Section (Eg: Tweaks/Themes)  - used to generate generic icon|
| icon          | Tweak Icon - overrides tweak section  |
