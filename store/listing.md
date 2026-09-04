# Play Store listing copy

Paste these into Play Console. Package name is permanent:
`com.motorbikeweatherguard`

## App name

Moto Weather Guard

## Short description (max 80 characters)

Is tomorrow safe to ride? Yellow or red alerts from your local forecast.

## Full description

Moto Weather Guard tells you whether tomorrow is safe for a motorbike ride.

The app reads the forecast for your current location (or a fallback city if GPS is off) and scores rain, wind, and cold against rider-specific limits:

- Rain above 15% — yellow warning (damp streets)
- Rain above 35% — red, stay home (slippery asphalt)
- Wind gusts above 45 km/h — red
- Temperature below 8°C — yellow (cold tyres)

You get a notification only when tomorrow is yellow or red. A good-weather day stays quiet.

No account. No ads. No server of ours. Weather comes from Open-Meteo over your phone’s internet.

Tabs: Today, Tomorrow, 7 days, and Settings (reminder time and language).

## Category

Weather

## Tags / contact

Default language: English (add Macedonian in Console if you want)

Contact: the email on your Play developer account

## Graphics in this folder

- `icon-512.png` — high-res icon (512×512)
- `feature-graphic-1024x500.png` — feature graphic (1024×500)

## Phone screenshots (you still need these)

Play wants at least 2 phone screenshots. JPEG or 24-bit PNG, 16:9 or 9:16.

Good sizes: 1080×1920 or 1080×2400.

Capture these four tabs on the phone:

1. Today
2. Tomorrow (with the notification card)
3. 7 days
4. Settings

On the Xiaomi, open each tab, then:

```
adb exec-out screencap -p > store/shot-today.png
```
