# Play Console walkthrough

Do these in [Google Play Console](https://play.google.com/console). I cannot click Submit for you.

The signed bundle to upload:

`android/app/build/outputs/bundle/release/app-release.aab`

Privacy policy URL (after GitHub Pages is live):

`https://minnys420.github.io/bker-weather-app/privacy.html`

Turn Pages on once: GitHub repo → Settings → Pages → Build and deployment → Source **GitHub Actions**. Then open Actions and run (or re-run) the `github-pages` workflow. Wait until the URL above loads before pasting it into Play Console.

Back up these two files somewhere safe (USB / password manager). Losing them means you cannot update the app later:

- `android/upload-keystore.jks`
- `android/keystore.properties`

Do not put them on GitHub.

## 1. Create the app

1. All apps → Create app
2. App name: **Moto Weather Guard**
3. Default language: English (United States) or English
4. App or game: **App**
5. Free
6. Accept the declarations

Package name when you upload the first bundle: `com.motorbikeweatherguard` (cannot change).

## 2. Store listing

Grow → Store presence → Main store listing

- App name: Moto Weather Guard
- Short / full description: paste from `store/listing.md`
- App icon: `store/icon-512.png`
- Feature graphic: `store/feature-graphic-1024x500.png`
- Phone screenshots: at least two (Today + Tomorrow). 1080×1920 is fine.
- Category: **Weather**
- Contact email: the email on this Play account

## 3. App content (Policy)

Monitor and improve → Policy and programs → App content

### Privacy policy

Start → paste `https://minnys420.github.io/bker-weather-app/privacy.html` → Save

### Ads

**No**

### App access

All parts of the app are available without login. No test account needed.

### Target audience

- Age groups: **18 and over only**
- Do **not** select children
- Store presence: this is a motorbike weather tool for adult riders
- Appeal to children: No

### News

Not a news app

### COVID-19

No contact tracing / status features

### Content rating

Start questionnaire. Email: your address.

Typical answers for this app:

- Category: **Utility, Productivity, Communication, or Other**
- No violence, no sexual content, no controlled substances, no user-generated content that is moderated
- Location sharing: yes, the user’s own location to fetch weather
- Users interact: no social features

Submit and apply the rating to the app.

### Data safety

Does your app collect or share any of the required user data types? **Yes**

Add **Location**:

- Approximate location: Yes
- Precise location: Yes (the app requests fine location)

For both:

- Collected: **Yes**
- Shared: **Yes** — shared with Open-Meteo to fetch the forecast
- Processed ephemerally: you can say **Yes** (used for the request, not kept on our server)
- Required or optional: **Optional** (app works with a Skopje fallback)
- Purposes: **App functionality** only
- Sold: **No**

Other data types (name, email, photos, contacts, financial, messages, files, audio, calendar, health, device IDs for ads): **No**

Security practices:

- Data is encrypted in transit: **Yes** (HTTPS to Open-Meteo)
- Users can request deletion: **No** (we do not store an account or a server-side copy)
- Independent security review: No

## 4. First upload

Release → Testing → Internal testing → Create new release

1. When asked about Play App Signing: **Use Google-generated key** / let Google manage the app signing key
2. Upload `app-release.aab`
3. Release name: `1.0 (1)`
4. Release notes:

```
First Play build. Today / Tomorrow / 7-day ride safety from your local forecast. Notifications only when tomorrow is yellow or red.
```

5. Add yourself as an internal tester (your Gmail)
6. Review and start rollout to Internal testing

Install from the Play internal-testing link on the Xiaomi (not the old sideload APK) to confirm signing.

## 5. If production is locked

Personal accounts created after November 2023 often must run **Closed testing** with **at least 12 testers opted in for 14 days** before production is allowed. There is no shortcut if Console shows that gate.

Closed testing → create a release with the same AAB → add 12 people who actually install and stay opted in.

## 6. Production

When Console allows it: Production → Create release → use the same AAB (or a later one with a higher `versionCode`) → send for review.
