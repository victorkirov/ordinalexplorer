# Ordinal Explorer

A simple explorer for Bitcoin Ordinals and Inscriptions.

The Inscription viewer supports images, videos, audio, 3D models, html, and text.

Please note that this project was only tested in Chrome and Safari on a Mac and iPhone.

Note:
The Figma design was followed as closely as possible. The project was made responsive, which will make the sizes of the elements slightly different than the design. To turn off the responsiveness and make the elements the same size as the design,go to `src/main.tsx` and change the value of `ENABLE_RESPONSIVE` to `false`.

## Extra challenge

The challenge of loading the thumbnails was implemented. The current implementation adds an empty div where the thumbnail would go to keep all the labels in line, which means that a non-image Inscription, the label in the list will be to the right and not as per the figma spec. This results in all the labels being pushed to the right for wallets with no image Inscriptions. This can be fixed but I decided to leave it as is for now as it would be a design decision which would be catered for buy teh designer.

The thumbnail loading is not ideal because there are no actual thumbnails of the contents available. This means that the thumbnail would load the actual image, even if the image was a uge resolution, and only render it at a smaller size. This is not ideal and would be a problem for large images. The solution would be to have a thumbnail version of the image available. This could be done by having a separate API that would generate the thumbnail and store it in a CDN. This would also allow us to have a thumbnail for all Inscriptions, not just images, but hat would be quite a large project and would be a feature that would have to be considered as a company to decide if it's worth the cost to implement.

The thumbnail display is optimised though to only render the thumbnail if it is on screen. This means that we only render a few images at a time until the user scrolls down to the next set of images. This allows us to not render all the images if the wallet happens to have hundreds of images. Rendering the thumbnails this way will also put the full image into the local cache, so when a user visits the detailed view for an Inscription, the image should already be loaded.

## Known issues/required improvements
- There is no state re-use between the Wallet Inscription List and Inscription pages. The Inscription List page pulls all Ordinals for a wallet and then each Inscriptions for each Ordinal in order to show the Inscription name on the list. This means that we already have the Inscription data but we get it again when we navigate to the Inscription detail page. This is not ideal and should be fixed.
- We should also be able to store the Ordinal and Inscription data in a local store so that we don't have to fetch it again if we navigate back to the page. This does come with the caveat that if an Inscription was sent to another wallet, then it should no longer be shown on the Inscription list (as is currently the case). This is a trade-off that should be considered and could be implemented with a store that has a TTL before updating it is required.
- The current implementation relies on external APIs to get the data. This is not ideal and we should have our own API that we can use instead. This would also allow us to cache the data server-side if needed. We would also make fewer calls to the server; instead of calling the server for each Ordinal and then again for each Inscription, we could call it once and get all the Ordinals/Inscriptions for a wallet and would also allow us to paginate the results in the case of a wallet containing many Ordinals.
- Test coverage is currently low but there is not enough time in the scope of this project ot increase it.

## Setup

Install dependencies:

```bash
npm install
```

## Run locally

Start a dev server:

```bash
npm run dev
```

Browse the application at http://localhost:5173/

## Test

Run tests:

  ```bash
  npm run test
  ```

## Build

Build the application:

```bash
npm run build
```

## Docker

The Docker image was created to make deployment to Kubernetes or to a conatinerized hosting service easier.

Build the docker image:

```bash
docker build -t ordinal-explorer .
```

Run the docker image:

```bash
docker run --rm -p 5173:5173 ordinal-explorer
```

## Wallets used for testing:
- bc1pe6y27ey6gzh6p0j250kz23zra7xn89703pvmtzx239zzstg47j3s3vdvvs (from spec)
- bc1pqdmdzetkl557lx70jdpjw2s82ncz9gxdvzgkuq7yr0lz4sl0mglsqcqvsv (many inscriptions)
- bc1pcyn5wew9atf63wtxkjv5ephdvauhcx2gguwss9ct9pzw28s5vwassn5k0w (few inscriptions)

## Inscriptions for testing:

- **Image(webp)**: 96e26da9c14b40fd12c6570f34453a30bf40d895121d207f411c662abc59f1d1i0
- **Image(gif)**: 23c11711a1086a10ebe3de572cb384c73799a3f39d402f00395459165a2b8c24i0
- **Image(jpg)**: dffceb7ba999a9c36abf3e0b5a305d9627b4e82ec6b2e30336cde6dc4a6b84ddi0
- **Text(json)**: 2babdc97843a33a6d20038a0a14635496ed68ceb1670cbdfd22ce678e02c4957i0
- **Text(plain)**: c7473d9e77218d4bc1504e228b69f7f9d50be2943c3ead4a009488a3bbdec85ei0
- **Text(plain,long)**: b32e3795c201b78fb2bd02a4a6714ea476ddb9724bcc76c6c02688373a055c15i0
- **Video**: 426cdda40cd36c7f0f2323fac403575aef264634fee593186adaf4f561eae2e7i0
- **Audio**: 79c0b9aa253eb849560788edf89456c30e8a461393312fb41d707de3f53fda45i0
- **HTML**: 3a091bee585ac6a1cb491e84d198504feb835b1d74246a63a9e2ed407a799cb7i0
- **SVG**: ff38edfab8a5c1f221b8249df3d28f72bd2983d4ee8b1318512368370276c4ffi0
- **3D**: 5d7513cebe178f04c1bc3b506195d04bf84ae804df330b1d4325815b4f446847i0
