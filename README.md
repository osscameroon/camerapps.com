# camerapps.com

Application that lists applications, whatsapp, telegram groups useful for Cameroonians

website: [camerapps](https://camerapps.com)

## Dependency

You might need to install `yarn` and a `node` version >= 15

## How to run locally ?

- Run `yarn install`
- Run `yarn dev`

## How to add a new application, facebook, or telegram group ?

To add a new application you might need to raise a pull request, or/and support us financially [here](https://opencollective.com/osscameroon) 😉

In case you have never created a pull request before we made this [tutorial](https://www.youtube.com/watch?v=F1SG2Zfzn-U&list=PLYfuyzVpgjOSqTcwvb7WGMZrLrEqZl2rB) for you.

Follow this steps in your pull requests:

- Open the `/src/res/apps.yaml` with your favourite code editor
- Copy the osscameroon field and paste it at the bottom of the file as such:

```yaml
#[... Fields that where there before] 
#--------------------------------------------------------------------
  - title: Oss Cameroon
    category: community
    #max of five tags
    tags:
      - opensource
      - programming
      - developers
    description: |
      Oss Cameroon is an open source community by cameroonians developers.
    website: https://osscameroon.com
    #twitter group handle
    twitter: https://twitter.com/osscameroon
    #dikalo group handle or link
    dikalo:
    #telegram group link
    telegram: https://t.me/joinchat/UpKZh_KXTaTx7JD7
    #facebook link
    facebook:
    #whatsapp link
    whatsapp:
    #android app store
    playstore:
    #ios app store
    appstore:
    #slack application
    slack:
    #github_account full url
    github_account: https://github.com/osscameroon
    otherlinks:
      - https://opencollective.com/osscameroon
      - https://blog.osscameroon.com
      - https://miniyotas.osscameroon.com
    image: default.svg
#--------------------------------------------------------------
```

- Now edit and remove the fields that do not apply to your application, use other applications as reference.
- To add an image copy your application image in this folder `src/res/imgs` name it using `snace_case` like `new_image.jpeg`
- Set the name of the newly added image file in the image field of your `src/res/apps.yaml` file
- Run the application locally using `yarn install` and `yarn dev` and make sure your application was added correctly
- Now submit your `pull request` and kindly wait for someone to review it 🙂
