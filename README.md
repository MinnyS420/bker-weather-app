# Moto Weather Guard

A standalone Android app that answers one question every evening: **is tomorrow safe for riding a motorbike in Skopje?** It also shows today's conditions and a seven-day outlook so a ride can be planned further ahead.

There is no backend, no cloud function and no hosting. The app calls the public
[Open-Meteo](https://open-meteo.com/) forecast API directly over the phone's own internet
connection, evaluates the result against motorbike safety thresholds, and posts a local
notification at 20:00 every evening.

## How the verdict is decided

`src/utils/safetyChecker.ts` applies three rules to each day's forecast:

| Metric | Threshold | Verdict when breached | Why |
| --- | --- | --- | --- |
| Max precipitation probability | `> 15 %` | `warning` (yellow) | Light rain, damp streets |
| Max precipitation probability | `> 35 %` | `danger` (red) | Slippery asphalt |
| Max wind gusts | `> 45 km/h` | `danger` (red) | Crosswinds destabilise two-wheelers |
| Min temperature | `< 8 °C` | `warning` (yellow) | Cold tyres, reduced grip |

Anything else is `safe`. Heavy rain and wind are disqualifying on their own; light rain and
cold only ever downgrade to a warning because they are rideable with extra caution.

The 20:00 briefing uses the same colours: a **red** notification when tomorrow is dangerous
("Лошо време доаѓа"), **yellow** for light rain or cold, and green when it is safe to ride.

## The dashboard

Three tabs along the bottom, each driven by the same rules:

1. **Денес** — today's verdict, metrics and reasoning.
2. **Утре** — the same for tomorrow, plus the notification schedule. This is the day the
   20:00 briefing talks about, so the app opens here.
3. **7 дена** — one row per day from today onward, colour-coded by severity.
4. **Settings** — reminder time (default 20:00, user-configurable) and language, plus the GPS city the forecast is using.

The forecast follows the phone's current location (with a Skopje fallback if GPS is denied). The UI language is chosen in Settings; the language list itself is always labelled in English next to each flag so it stays findable.

Tab switching is plain component state rather than a navigation library — with four fixed
tabs and no history or deep linking, React Navigation would have meant extra native
dependencies for no benefit.

## Project layout

```
src/
├─ App.tsx                         Root component
├─ screens/HomeScreen.tsx          Header, active tab content, loading state
├─ components/TabBar.tsx           Bottom tab bar with per-tab severity dots
├─ components/DayDetail.tsx        One day in full: verdict + metrics + reasoning
├─ components/VerdictCard.tsx      Colour-coded verdict banner
├─ components/MetricGrid.tsx       Metric tiles with the threshold each is judged against
├─ components/WeekOutlook.tsx      Seven-day strip
├─ components/theme.ts             Palette and per-severity styling
├─ services/weatherService.ts      Direct fetch to Open-Meteo (index 0 = today, 1 = tomorrow)
├─ services/notificationService.ts Notifee channel + repeating 20:00 trigger
├─ types/weather.ts                WeatherForecast, SafetyEvaluationResult, DailyOutlook
├─ utils/safetyChecker.ts          The safety rules above
└─ utils/format.ts                 Macedonian date formatting
```

## Requirements

- Node.js 20+
- JDK 17
- Android SDK with platform `android-36` and build-tools `36.0.0`

`android/local.properties` must point at your SDK, for example:

```properties
sdk.dir=C\:\\Users\\you\\AppData\\Local\\Android\\Sdk
```

## Install

```bash
npm install
```

## Build a release APK locally

```bash
cd android
./gradlew assembleRelease
```

On Windows PowerShell use `.\gradlew.bat assembleRelease`.

The APK is written to:

```
android/app/build/outputs/apk/release/app-release.apk
```

Install it on a connected device with:

```bash
adb install -r android/app/build/outputs/apk/release/app-release.apk
```

### Windows: 260-character path limit

Gradle unpacks React Native's prebuilt `.so` files into `GRADLE_USER_HOME`. If that path is
long, the native build fails with `Filename longer than 260 characters`. Point it somewhere
short before building:

```powershell
$env:GRADLE_USER_HOME = "C:\Users\you\.gradle"
```

## Signing

By default the release build is signed with the template's debug key, which is enough to
sideload but **not** suitable for distribution — the key is public and identical across every
React Native project.

To sign with your own key, generate a keystore:

```bash
keytool -genkeypair -v -storetype PKCS12 \
  -keystore android/app/motorbike-release.keystore \
  -alias motorbike-weather-guard \
  -keyalg RSA -keysize 2048 -validity 10950
```

Then create `android/keystore.properties` (already gitignored):

```properties
storeFile=motorbike-release.keystore
storePassword=<your password>
keyAlias=motorbike-weather-guard
keyPassword=<your password>
```

`android/app/build.gradle` picks the file up automatically and falls back to the debug key
when it is missing. Keep the keystore and its password backed up — losing them means you can
never update an installed app.

## Notifications

The daily briefing is rescheduled every time the app successfully loads a forecast, so the
notification text always reflects the newest data.

- **Android 13+** prompts for the notification permission on first launch.
- **Android 12+** additionally gates *exact* alarms. Without that permission the app falls
  back to an inexact alarm, so the briefing may drift by a few minutes. The dashboard shows a
  link that opens the system "Alarms & reminders" screen when this applies.

## Browser preview

To look at the dashboard on a desktop without an emulator:

```bash
npm run web        # http://localhost:5173
```

This renders the real `src/` components through
[react-native-web](https://necolas.github.io/react-native-web/) inside a phone-sized frame,
against live Open-Meteo data. It is a development aid only — nothing under `web/` is reachable
from `index.js`, so the Android bundle is unaffected. Notifee and
`react-native-safe-area-context` are native-only and are aliased to browser stubs in
`web/stubs`; scheduled notifications are logged to the browser console instead of posted.

Append a `mock` query parameter to force a state:

| URL | Shows |
| --- | --- |
| `?mock=safe` | Green verdict |
| `?mock=warning` | Amber verdict (cold) |
| `?mock=danger` | Red verdict (rain + wind) |
| `?mock=offline` | Lost-connection error card |

## Development

```bash
npm start          # Metro bundler
npm run android    # debug build on a connected device or emulator
npm test           # unit tests for the safety engine
npm run lint
npx tsc --noEmit
```
