<h1 align="center">
  sc-iframe
</h1>

[![npm](https://img.shields.io/npm/v/sc-iframe)](https://www.npmjs.com/package/sc-iframe)
![GitHub](https://img.shields.io/github/license/nouvist/sc-iframe)

Unofficial Soundcloud Widget API written in Typescript.

> Soundcloud is trademark or registered trademark of their respective holders. This project is not affiliated with or endorsed by them.

## Installation

You could install this module via NPM registry.

```bash
# npm
npm install sc-iframe
# yarn
yarn add sc-iframe
# pnpm
pnpm add sc-iframe
```

## Usage

### Initialize Widget

Widget will create a new iframe by default.

```typescript
const widget = new Widget(options?: WidgetOptions);

document.body.appendChild(widget.iframe);
```

But you also could specify it manually.

```typescript
const iframe = document.getElementById('soundcloud-iframe');
const widget = new Widget({
  iframe,
});
```

#### `WidgetOptions`

| name            | type                | default     | description                                                    |
| --------------- | ------------------- | ----------- | -------------------------------------------------------------- |
| iframe          | `HTMLIFrameElement` | `undefined` | Specify custom iframe. It will create a new iframe by default. |
| invokeTimeout   | `number`            | `5000`      | Timeout of getting value from iframe in milliseconds.          |
| useDefaultStyle | `boolean`           | `false`     | Add suggested width (100%) and height (166px).                 |

### Methods

#### `Widget.prototype.loadFromURI()`

Load a sound form URI.

```js
widget.loadFromURI(
  uri: string,
  options?: LoadOptions
)
```

##### `LoadOptions`

| name          | type      | description                                                                                |
| ------------- | --------- | ------------------------------------------------------------------------------------------ |
| autoPlay      | `boolean` | Start playing the item automatically.                                                      |
| color         | `string`  | Color play button and other controls in HEX.                                               |
| buying        | `boolean` | Show/Hide buy buttons.                                                                     |
| sharing       | `boolean` | Show/Hide share buttons.                                                                   |
| download      | `boolean` | Show/Hide download buttons.                                                                |
| showArtwork   | `boolean` | Show/Hide the item’s artwork.                                                              |
| showPlayCount | `boolean` | Show/Hide number of track plays.                                                           |
| showUser      | `boolean` | Show/Hide the uploader name.                                                               |
| startTrack    | `number`  | A number from 0 to the playlist length which reselects the track in a playlist.            |
| singleActive  | `boolean` | If set to false the multiple players on the page won’t toggle each other off when playing. |

> **Note**: playlist methods is not implemented yet.

#### `Widget.prototype.play()`

Invoke play method on the iframe.

#### `Widget.prototype.pause()`

Invoke pause method on the iframe.

### Properties

#### `Widget.prototype.duration`

A read-only alias to `Widget.protoype.metadata.duration` which is the duration of the sound in milliseconds (`number`).

#### `Widget.prototype.currentTime`

Current time of the sound in milliseconds (`number`).

```js
// get current time
console.log(widget.currentTime);

// set current time
widget.currentTime = 10 * 1e3;
```

#### `Widget.prototype.metadata`

An object about current sound metadata.

| name               | type                                        | description |
| ------------------ | ------------------------------------------- | ----------- |
| id                 | `number`                                    |
| playable           | `boolean`                                   |
| artworkURL         | `string`                                    |
| caption            | `null`                                      |
| commentable        | `boolean`                                   |
| commentCount       | `number`                                    |
| createdAt          | `string`                                    |
| description        | `string`                                    |
| downloadable       | `boolean`                                   |
| downloadCount      | `number`                                    |
| duration           | `number`                                    |
| fullDuration       | `number`                                    |
| embeddableBy       | `string`                                    |
| genre              | `string`                                    |
| hasDownloadsLeft   | `boolean`                                   |
| kind               | `string`                                    |
| labelName          | `null`                                      |
| lastModified       | `string`                                    |
| license            | `string`                                    |
| likesCount         | `number`                                    |
| permalink          | `string`                                    |
| permalinkURL       | `string`                                    |
| playbackCount      | `number`                                    |
| public             | `boolean`                                   |
| publisherMetadata  | [ `PublisherMetadata` ](#publishermetadata) |
| purchaseTitle      | `string`                                    |
| purchaseURL        | `string`                                    |
| releaseDate        | `null`                                      |
| repostsCount       | `number`                                    |
| secretToken        | `null`                                      |
| sharing            | `string`                                    |
| state              | `string`                                    |
| streamable         | `boolean`                                   |
| tagList            | `string`                                    |
| title              | `string`                                    |
| trackFormat        | `string`                                    |
| uri                | `string`                                    |
| urn                | `string`                                    |
| userID             | `number`                                    |
| visuals            | `null`                                      |
| waveformURL        | `string`                                    |
| displayDate        | `string`                                    |
| media              | [ `Media` ](#media)                         |
| stationUrn         | `string`                                    |
| stationPermalink   | `string`                                    |
| trackAuthorization | `string`                                    |
| monetizationModel  | `string`                                    |
| policy             | `string`                                    |
| user               | [ `User` ](#user)                           |
| resourceID         | `number`                                    |
| resourceType       | `string`                                    |

##### `Media`

| name         | type | description                       |
| ------------ | ---- | --------------------------------- |
| transcodings |      | [ `Transcoding[]` ](#transcoding) |

##### `Transcoding`

| name     | type                  | description |
| -------- | --------------------- | ----------- |
| url      | `string`              |
| preset   | `string`              |
| duration | `number`              |
| snipped  | `boolean`             |
| format   | [ `Format` ](#format) |
| quality  | `string`              |

##### `Format`

| name     | type     | description |
| -------- | -------- | ----------- |
| protocol | `string` |
| mimeType | `string` |

##### `PublisherMetadata`

| name          | type      | description |
| ------------- | --------- | ----------- |
| id            | `number`  |
| urn           | `string`  |
| artist        | `string`  |
| containsMusic | `boolean` |
| isrc          | `string`  |

##### `User`

| name                 | type                                              | description |
| -------------------- | ------------------------------------------------- | ----------- |
| avatarURL            | `string`                                          |
| city                 | `string`                                          |
| commentsCount        | `number`                                          |
| countryCode          | `null`                                            |
| createdAt            | `string`                                          |
| creatorSubscriptions | [ `CreatorSubscription[]` ](#creatorsubscription) |
| creatorSubscription  | [ `CreatorSubscription` ](#creatorsubscription)   |
| description          | `string`                                          |
| followersCount       | `number`                                          |
| followingsCount      | `number`                                          |
| firstName            | `string`                                          |
| fullName             | `string`                                          |
| groupsCount          | `number`                                          |
| id                   | `number`                                          |
| kind                 | `string`                                          |
| lastModified         | `string`                                          |
| lastName             | `string`                                          |
| likesCount           | `number`                                          |
| playlistLikesCount   | `number`                                          |
| permalink            | `string`                                          |
| permalinkURL         | `string`                                          |
| playlistCount        | `number`                                          |
| repostsCount         | `null`                                            |
| trackCount           | `number`                                          |
| uri                  | `string`                                          |
| urn                  | `string`                                          |
| username             | `string`                                          |
| verified             | `boolean`                                         |
| visuals              | [ `Visuals` ](#visuals)                           |
| badges               | [ `Badges` ](#badges)                             |
| stationUrn           | `string`                                          |
| stationPermalink     | `string`                                          |

##### `Badges`

| name         | type      | description |
| ------------ | --------- | ----------- |
| pro          | `boolean` |
| proUnlimited | `boolean` |
| verified     | `boolean` |

##### `CreatorSubscription`

| name    | type                    | description |
| ------- | ----------------------- | ----------- |
| product | [ `Product` ](#product) |

##### `Product`

| name | type     | description |
| ---- | -------- | ----------- |
| id   | `string` |

##### `Visuals`

| name     | type                    | description |
| -------- | ----------------------- | ----------- |
| urn      | `string`                |
| enabled  | `boolean`               |
| visuals  | [ `Visual[]` ](#visual) |
| tracking | `null`                  |

##### `Visual`

| name      | type     | description |
| --------- | -------- | ----------- |
| urn       | `string` |
| entryTime | `number` |
| visualURL | `string` |
