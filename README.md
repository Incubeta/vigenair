<!--
Copyright 2024 Google LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->
<img align="left" width="150" src="https://services.google.com/fh/files/misc/vigenair_logo.png" alt="ViGenAiR Logo" /><br>

# ViGenAiR - Recrafting Video Ads with Generative AI

[![GitHub last commit](https://img.shields.io/github/last-commit/google-marketing-solutions/vigenair)](https://github.com/google-marketing-solutions/vigenair/commits)
[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)

**Disclaimer: This is not an official Google product.**

[Overview](#overview) •
[Get started](#get-started) •
[What it solves](#challenges) •
[How it works](#solution-overview) •
[How to Contribute](#how-to-contribute)

## Updates

* [May 2024]: Launch! 🚀

## Overview

**ViGenAiR** *(pronounced vision-air)* uses state-of-the-art multimodal Generative AI on Google Cloud Platform (GCP) to automatically repurpose long-form Video Ads and generate several shorter variants, formats and storylines at scale. It generates horizontal, vertical and square assets to power [Demand Gen](https://support.google.com/google-ads/answer/13695777?hl=en) and [YouTube video campaigns](https://support.google.com/youtube/answer/2375497?hl=en), and leverages Google Ads' built-in A/B testing to automatically identify the best variants tailored to your target audiences. ViGenAiR is an acronym for <u>Vi</u>deo <u>Gen</u>eration via <u>A</u>ds <u>R</u>ecrafting, and is more colloquially referred to as *Vigenair*.

## Get Started

Please make sure you have fulfilled all prerequisites mentioned under [Requirements](#requirements) first.

1. Make sure your system has an up-to-date installation of [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
1. Make sure your system has an up-to-date installation of the [gcloud CLI](https://cloud.google.com/sdk/docs/install).
1. Make sure your system has an up-to-date installation of `git` and use it to clone this repository.
1. Navigate to the directory where the source code lives.
1. Run `npm start`.

You will be asked to enter a GCP Project ID, and whether you would like to deploy GCP components, the UI, or both. If you opt to deploy GCP components, you will be asked to enter an optional [Cloud Function region](https://cloud.google.com/functions/docs/locations) (defaults to `us-central1`) and an optional [GCS location](https://cloud.google.com/storage/docs/locations) (defaults to `us`).
The `npm start` command will then ask you to authenticate to both Google Workspace (via [clasp](https://github.com/google/clasp)) and Google Cloud, followed by creating a bucket named <code>*<gcp_project_id>*-vigenair</code> (if it doesn't already exist), deploying the `vigenair` Cloud Function to your Cloud project, and finally deploying the Angular UI web app to a new Apps Script project. The URL of the web app will be output at the end of the deployment process, which you can use to run the app and start generating videos.

See [Solution Overview](#solution-overview) for more details on the different components of the solution.

### UI Web App Access Settings

By default, Vigenair runs only for the user that deployed it. This is controlled by the [Web App access settings](https://developers.google.com/apps-script/manifest/web-app-api-executable#webapp) in the project's [manifest file](./ui/appsscript.json), which is set to `MYSELF` by default. This setup works well for most cases, however if you are a Google Workspace user you may change this value to `DOMAIN` to allow other individuals within your organisation to run the app. The `npm start` command will prompt you for this as well if you opt to deploy the UI.

### Requirements

You need the following to use Vigenair:

* Google account: required to access the Vigenair UI.
* GCP project with:
  * The [Vertex AI API](https://cloud.google.com/vertex-ai/docs/generative-ai/start/quickstarts/api-quickstart) enabled: required to access Gemini in Vertex AI.
    * All users running Vigenair must be granted the [Vertex AI User](https://cloud.google.com/vertex-ai/docs/general/access-control#aiplatform.user) role on the associated GCP project.
  * The [Video AI API](https://cloud.google.com/video-intelligence) enabled (AKA Cloud Video Intelligence API): required for analysing input videos.
  * All users running Vigenair must be granted the [Storage Object User](https://cloud.google.com/storage/docs/access-control/iam-roles) role on the associated GCP project.

The Vigenair [setup and deployment script](#get-started) will create the following components:

* A Google Cloud Storage (GCS) bucket named <code>*<gcp_project_id>*-vigenair</code>
* A Cloud Function (2nd gen) named `vigenair` that fulfills both the Extractor and Combiner services. Refer to [deploy.sh](./service/deploy.sh) for specs.
* An Apps Script deployment for the frontend web app.

If you will also be deploying Vigenair, you need to have the following additional roles on the associated GCP project:

* `Storage Admin` for the entire project OR `Storage Legacy Bucket Writer` on the <code>*<gcp_project_id>*-vigenair</code> bucket. See [IAM Roles for Cloud Storage](https://cloud.google.com/storage/docs/access-control/iam-roles) for more information.
* `Cloud Functions Developer` to deploy and manage Cloud Functions. See [IAM Roles for Cloud Functions](https://cloud.google.com/functions/docs/reference/iam/roles) for more information.

## Challenges

Current Video Ads creative solutions, both within YouTube / Google Ads as well as open source, primarily focus on 4 of the [5 keys to effective advertising](https://info.ncsolutions.com/hubfs/2023%20Five%20Keys%20to%20Advertising%20Effectiveness/NCS_Five_Keys_to_Advertising_Effectiveness_E-Book_08-23.pdf) - Brand, Targeting, Reach and Recency. Those 4 pillars contribute to *only ~50%* of the potential marketing ROI, with the 5th pillar - **Creative** - capturing a *whopping ~50%* all on its own.

<center><img src='./img/creative.png' width='640px' alt='The importance of Creatives for effective adverising' /></center>

Vigenair focuses on the *Creative* pillar to help potentially **unlock ~50% ROI** while solving a huge pain point for advertisers; the generation, trafficking and A/B testing of different Video Ad formats, at **scale**, powered by Google's multimodal Generative AI - Gemini.

### Benefits

* **Inventory**: Horizontal, vertical and square Video assets in different durations allow advertisers to tap into virtually ALL Google-owned sources of inventory
* **Campaigns**: Shorter more compelling Video Ads that still capture the meaning and storyline of their original ads - ideal for *Social* and *Awareness/Consideration* campaigns
* **Creative Excellence**: Coherent Videos (e.g. dialogue doesn't get cut mid-scene, videos don't end abruptly, etc.) that follow Google's [best practices for effective video ads](https://www.youtube.com/ads/abcds-of-effective-video-ads/), including creative direction rules for camera angles and scene cutting
* **User Control**: Users can steer the model towards generating their desired videos (via prompts and/or manual scene selection)
* **Performance**: Built-in A/B testing provides a basis for automatically identifying the best variants tailored to the advertiser's target audiences

## Solution Overview

Vigenair's frontend is an Angular Progressive Web App (PWA) hosted on Google Apps Script and accessible via a [web app deployment](https://developers.google.com/apps-script/guides/web). As with all Google Workspace apps, users must authenticate with a Google account in order to use the Vigenair web app. Backend services are hosted on [Cloud Functions 2nd gen](https://cloud.google.com/functions/docs/concepts/version-comparison), and are triggered via Cloud Storage (GCS). Decoupling the UI and core services via GCS significantly reduces authentication overhead and effectively implements separation of concerns between the frontend and backend layers.

Vigenair uses Gemini on Vertex AI to *holistically* understand and analyse the content and storyline of a Video Ad, **automatically** splitting it into *coherent* audio/video segments that are then used to generate different shorter variants and Ad formats. Vigenair analyses the spoken dialogue in a video (if present), the visually changing shots, on-screen entities such as any identified logos and/or text, and background music and effects. It then uses all of this information to combine sections of the video together that are *coherent*; segments that won't be cut mid-dialogue nor mid-scene, and that are semantically and contextually related to one another. These coherent A/V segments serve as the building blocks for both GenAI and user-driven recombination.

<center><img src='./img/overview.png' alt='How Vigenair works' /></center>

The generated variants may follow the original Ad's storyline - and thus serve as *mid-funnel reminder campaigns* of the original Ad for **Awareness and/or Consideration** - or introduce whole new storylines altogether, all while following Google's [best practices for effective video ads](https://www.youtube.com/ads/abcds-of-effective-video-ads/).

### Limitations

* Vigenair will not work *well* for all types of videos. Try it out with an open mind :)
* Users cannot delete previously analysed videos via the UI; they must do this directly in GCS.
* The current audio analysis and understanding tech is unable to differentiate between voice-over and any singing voices in the video. The *Analyse voice-over* checkbox in the UI's *Video selection* card can be used to counteract this; uncheck the checkbox for videos where there is no voice-over, rather just background song and/or effects.
* When generating video variants, segments selected by the LLM might not follow user prompt instructions, and the overall variant might not follow the desired target duration. It is recommended to review and potentially modify the preselected segments of the variant before adding it to the *render queue*.
* When previewing generated video variants, audio overlay settings are not applied; they are only available for fully rendered variants.
* Evaluating video variants' adherence to creative rules and guidelines is done via additional instructions within the generation prompt to Vertex AI foundational models (Gemini Pro). To increase adherence and quality, consider [distilling](https://cloud.google.com/vertex-ai/generative-ai/docs/models/distill-text-models) a language model on your brand's own creative best practices, rules and guidelines first, then use this distilled model for the variants generation instead of the foundational model.

### Solution Details

The diagram below shows how Vigenair's components interact and communicate with one another.

<center><img src='./img/architecture.png' alt="Vigenair's architecture" /></center>

1. Users upload or select videos they have previously analysed via the UI's `Video selection` card (step #2 is skipped for already analysed videos).
    * The *Load existing video* dropdown pulls all processed videos from the associated GCS bucket when the page loads, and updates the list whenever users interact with the dropdown.
    * The *My videos only* toggle filters the list to only those videos uploaded by the current user - this is particularly relevant for Google Workspace users, where the associated GCP project and GCS bucket are shared among users within the same organisation.
    * The *Analyse voice-over* checkbox, which is checked by default, can be used to skip the process of transcribing and analysing any voice-over or speech in the video. **Uncheck** this checkbox for videos where there is only background music / song or effects.
    * Uploads get stored in GCS in separate folders following this format: `<input_video_filename>(--n)--<timestamp>--<encoded_user_id>`.
        * `input_video_filename`: The name of the video file as it was stored on the user's file system.
        * Optional `--n` suffix to the filename: For those videos where the *Analyse voice-over* checkbox was **unchecked**.
        * `timestamp`: Current timestamp in **microseconds** (e.g. 1234567890123)
        * `encoded_user_id`: Base64 encoded version of the [user's email](https://developers.google.com/apps-script/reference/base/user#getemail) - if available - otherwise Apps Script's [temp User ID](https://developers.google.com/apps-script/reference/base/session#gettemporaryactiveuserkey).
2. New uploads into GCS trigger the Extractor service Cloud Function, which extracts all video information and stores the results on GCS (`input.vtt`, `analysis.json` and `data.json`).
    * First, background music and voice-over (if available) are separated via the [spleeter](https://github.com/deezer/spleeter) library, and the voice-over is transcribed.
    * Transcription is done via the [faster-whisper](https://github.com/SYSTRAN/faster-whisper) library, which uses OpenAI's Whisper model under the hood. By default, Vigenair uses the [small](https://github.com/openai/whisper#available-models-and-languages) multilingual model which provides the optimal quality-performance balance. If you find that it is not working well for your target language you may change the model used by the Cloud Function without having to redeploy it via the [update_config.sh](service/update_config.sh) script. The transcription output is stored in an `input.vtt` file, along with a `language.txt` file containing the video's primary language, in the same folder as the input video.
    * Video analysis is done via the Cloud [Video AI API](https://cloud.google.com/video-intelligence), where visual shots, detected objects - with tracking, labels, people and faces, and recognised logos and any on-screen text within the input video are extracted. The output is stored in an `analysis.json` file in the same folder as the input video.
    * Finally, *coherent* audio/video segments are created using the transcription and video intelligence outputs and then cut into individual video files and stored on GCS in an `av_segments_cuts` subfolder under the root video folder. These cuts are then and annotated via multimodal models on Vertex AI (Gemini Pro Vision), which provides a description and a set of associated keywords / topics per segment. The fully annotated segments (including all information from the Video AI API) are then compiled into a `data.json` file that is stored in the same folder as the input video.
3. The UI continuously queries GCS for updates while showing a preview of the uploaded video.
    * Once the `input.vtt` is available, a transcription track is embedded onto the video preview.
    * Once the `analysis.json` is available, [object tracking](https://cloud.google.com/video-intelligence/docs/object-tracking) results are displayed as bounding boxes directly on the video preview. These can be toggled on/off via the *Object tracking* toggle - which is set to *on* by default.
    * Once the `data.json` is available, the extracted A/V Segments are displayed along with a set of user controls.
4. Users are now ready for combination. They can view the A/V segments and generate / iterate on variants via a *preview* while modifying user controls, adding desired variants to the render queue.
    * A/V segments are displayed in two ways:
        * In the *video preview* view: A single frame of each segment, cut mid-segment, is displayed in a filmstrip and scrolls into view while the user is previewing the video, indicating the segment that is *currently playing*.
        * A detailed *segments list* view: Which shows additional information per segment; the segment's duration, description and extracted keywords.
    * User Controls for video variant generation:
        * Users are presented with an optional prompt which they can use to steer the output towards focusing on certain aspects, like certain entities or topics in the input video, or target audience of the resulting video variant.
        * Users may also use the *Target duration* slider to set their desired target duration.
        * Users can then click *Generate* to generate variants accordingly, which will query language models on Vertex AI (Gemini Pro) to generate potential variants that fulfill the optional user-provided prompt and target duration.
    * Generated variants are displayed in tabs - one per tab - and both the *video preview* and *segments list* views are updated to preselect the A/V segments of the variant currently being viewed. Clicking on the video's play button in the *video preview* mode will preview only those preselected segments. Each variant has the following information:
        * A title which is displayed in the variant's tab.
        * A duration, which is also displayed in the variant's tab.
        * The list of A/V segments that make up the variant.
        * A description of the variant and what is happening in it.
        * An LLM-generated Score, from 1-5, representing how well the variant adheres to the input rules and guidelines, which default to a subset of [YouTubes ABCDs](https://www.youtube.com/ads/abcds-of-effective-video-ads/). Users are strongly encouraged to update this section of the prompt in [config.ts](ui/src/config.ts) to refer to their own brand voice and creative guidelines.
        * Reasoning for the provided score, with examples of adherence / inadherence.
    * User Controls for video variant rendering:
        * Vigenair supports different rendering settings for the audio of the generated videos. The image below describes the supported options and how they differ: <center><img src='./img/audio.png' width="400px" alt="Vigenair's audio rendering options" /></center>
        * Whether to generate [Demand Gen](https://support.google.com/google-ads/answer/13695777) campaign text and image assets alongside the variant or not. Defaults to generating Demand Gen assets.
        * Whether to render all formats (horizontal, vertical and square) assets or to only render horizontal assets. Defaults to rendering all formats.
        * Users can also select the individual scenes that each variant is comprised of. This selection is available in both the *video preview* and *segments list* views. Please note that switching between variant tabs will clear any changes to the selection.
    * Desired variants can be added to the render queue along with the their associated render settings:
        * Each variant added to the render queue will be presented as a card in a sidebar that will open from the right-hand-side of the page. The card contains the thumbnail of the variant's first segment, along with the variant title, list of segments contained within it, its duration and chosen render settings (audio settings, Demand Gen assets choice and desired formats).
        * Variants where the user had manually modified the preselected segments will be displayed with the score greyed out and with the suffix `(modified)` appended to the variant's title.
        * Users cannot add the same variant with the *exact same segment selection and rendering settings* more than once to the render queue.
        * Users can always remove variants from the render queue which they no longer desire via the dedicated `X` button per card.
        * Clicking on a variant in the render queue will *load* its settings into the *video preview* and *segments list* views, allowing users to preview the variant once more.
5. Clicking on the `Render` button inside the render queue will render the variants in their desired formats and settings via the Combiner service Cloud Function (writing `render.json` to GCS, which serves as the input to the service, and the output is a `combos.json` file. Both files are stored in the same folder as the input video, while *rendered* variants will be placed in a `<timestamp>-combos` subfolder below the root video folder).
6. The UI continuously queries GCS for updates. Once a `combos.json` is available, the final videos and all associated assets will be displayed. Users can also preview the final videos and select the ones they would like to upload into Google Ads / YouTube.

## How to Contribute

Beyond the information outlined in our [Contributing Guide](CONTRIBUTING.md), you would need to follow these additional steps to build Vigenair locally and modify the source code:

### Build and Deploy GCP Components

1. Make sure your system has an up-to-date installation of the [gcloud CLI](https://cloud.google.com/sdk/docs/install).
1. Run `gcloud auth login` and complete the authentication flow.
1. Navigate to the directory where the source code lives and run `cd ./service`
1. Run `./deploy.sh`.

### Build and Serve the Angular UI

1. Make sure your system has an up-to-date installation of [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
1. Navigate to the directory where the source code lives and run `cd ./ui`
1. Run `npm install` to install dependencies.
1. Run `npm run deploy` to build, test and deploy (via [clasp](https://github.com/google/clasp)) all UI and Apps Script code to the target spreadsheet / Apps Script project.
1. Run `ng serve` to launch the Angular UI locally with Hot Module Replacement (HMR) during development.
