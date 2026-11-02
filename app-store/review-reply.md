# Reply to App Review — Guideline 2.1 Information Needed (Weather Bear 1.0)

Apple asked for six things about build 15. Build 19 replaces it: it switches radar to
NOAA's public-domain service (RainViewer's free API is "personal and educational use
only") and makes the app identify itself to the map and weather services, as their
policies ask. It also carries the location purpose-string fix Apple flagged on build 15,
makes the in-app Privacy link easy to see (in build 17 it was faint blue on blue), and
gives the Privacy and Support pages a Back link (in build 18 they were a dead end).

## Ken's steps, in order

1. **Install build 19** (not 17 or 18) from the TestFlight app once Apple finishes processing it
   (usually 15–30 minutes after the upload; TestFlight sends a notification).
2. **Update the iPhone to the latest iOS**: Settings › General › Software Update.
3. **Record the screen** (shot list below). The Screen Recording button is a white dot
   inside a ring in Control Center (swipe down from the top-right corner). If it isn't
   there: in Control Center tap **+** at the top left, then **Add a Control**, search
   "Screen Recording" and tap it. Tapping the button gives a 3-second countdown; stop with
   the red pill at the top. The video lands in Photos. Aim for 1–2 minutes.
4. **App Store Connect › Weather Bear › the 1.0 version page**:
   - **Build**: remove build 15 and pick **build 19**.
   - **Description**: change the last line to
     `Forecast data by Open-Meteo. Alerts and radar by the National Weather Service (NOAA). Maps by OpenStreetMap contributors.`
   - **App Review Information › Notes**: paste the "Notes field" text below.
   - Save, then submit the version for review again.
5. **App Review message thread** (the rejection message): paste the "Reply" text below and
   attach the screen recording.

## Shot list for the recording

1. Start on the iPhone Home Screen. Tap the Weather Bear icon (the recording must show the launch).
2. When iOS asks for location, tap **Allow While Using App**.
3. **Today** tab: scroll slowly through current conditions, sunrise/sunset, the next 24
   hours, the 7-day forecast and the small radar map.
4. **Radar** tab: pinch to zoom once, tap **Play last hour**, let it loop twice, tap **Stop**.
5. **Alerts** tab.
6. **Tropics** tab.
7. Tap the **place name** at the top right, search a city (e.g. Miami), pick it, and show
   the weather change. Open the place list again, switch back to your city, and remove
   Miami with the ×.
8. Scroll to the bottom of Today and tap **Privacy** (white, under the data credits), then tap **‹ Back to Weather Bear** at the top.
9. Go to the Home Screen, long-press an empty spot, tap **+**, add the Weather Bear widget.

There is no sign-up, login, account, user-generated content or purchase to show; the reply
says so.

---

## Reply (paste into the App Review message, attach the recording)

Hello, and thank you for reviewing Weather Bear. Here is the information you asked for. Please review build 19, which replaces build 15 (details in item 6).

1. Screen recording
Attached: a recording on an iPhone running the latest iOS. It starts at app launch and walks through every screen. Weather Bear has no sign-up, login or account (so there is nothing to delete), no user-generated content, and no purchases, subscriptions or ads.

2. What the app is for and who it is for
Weather Bear is a free, ad-free weather app for people in the United States who want the essentials on one calm screen: current conditions, hourly and 7-day forecasts, live radar, National Weather Service alerts and hurricane tracking. Most free weather apps are crowded with ads and tracking; Weather Bear has none, collects nothing beyond the location needed to fetch the forecast, and keeps everything on the device.

3. How to set it up and reach the main features
No account or demo login is needed. Open the app and allow location access, or decline and tap the place name at the top right to search any city. The four tabs are Today (current conditions, sunrise and sunset, next 24 hours, 7-day forecast and a small radar map), Radar (full map with a "Play last hour" animation), Alerts (National Weather Service watches and warnings for that place) and Tropics (active storms and the 7-day tropical outlook). Searched cities are saved in the place list for quick switching. Home Screen widgets (small, medium) and Lock Screen widgets (circular, rectangular, inline) are added the usual way.

4. External services
The app has no server of its own and no authentication, payment, analytics, advertising or AI services. It reads public weather data directly from:
- Open-Meteo (open-meteo.com): forecasts and city search, in the app and widget
- U.S. National Weather Service (api.weather.gov): alerts and place names
- NOAA / NWS radar (opengeo.ncep.noaa.gov): radar images
- NOAA tropical map service and the National Hurricane Center (mapservices.weather.noaa.gov, nhc.noaa.gov): tropical storms and outlook map
- OpenStreetMap (tile.openstreetmap.org): base map under the radar
- Cloudflare cdnjs and Google Fonts: the open-source map library (Leaflet) and fonts

5. Regional differences
Weather Bear is offered only on the United States App Store and works the same for every user. Its radar, alerts and hurricane information come from U.S. government services and cover the United States and its territories (mainland, Alaska, Hawaii, Puerto Rico and the U.S. Virgin Islands, and Guam). If a user searches a city outside the U.S., the forecast still works, but radar and alerts are not available there.

6. Licenses for third-party data
- National Weather Service / NOAA (radar, alerts, tropical data): U.S. government information in the public domain, which "may be used without charge for any lawful purpose" (https://www.weather.gov/disclaimer). The app credits NOAA/NWS and does not imply endorsement.
- Open-Meteo (forecasts, city search): data licensed CC BY 4.0. Open-Meteo's free API is for non-commercial use, which its terms define to include apps "that do not have subscriptions or advertising" (https://open-meteo.com/en/terms). Weather Bear is free with no ads, subscriptions or purchases, and credits Open-Meteo in the app.
- OpenStreetMap (base map): map data © OpenStreetMap contributors under the ODbL, credited on the map. Tiles are used under the OpenStreetMap Foundation Tile Usage Policy (https://operations.osmfoundation.org/policies/tiles/); the app identifies itself with its own User-Agent as that policy requires.
- Leaflet (BSD 2-Clause license) and the Archivo and Atkinson Hyperlegible fonts (SIL Open Font License).
Build 19 replaced our earlier radar source (RainViewer, whose free API is limited to personal and educational use) with NOAA's public-domain radar, so every data source is clearly licensed for this app.

Thank you,
Ken Lill

---

## Notes field (App Review Information › Notes)

No account or login. Allow location, or tap the place name (top right) and search any city. Tabs: Today, Radar (tap "Play last hour"), Alerts, Tropics. Native features: iOS location services and Home Screen / Lock Screen widgets (WidgetKit). No ads, purchases, analytics or user content. Offered on the U.S. App Store only; radar and alerts cover the U.S. and its territories. Data: NOAA / National Weather Service (public domain: radar, alerts, tropical storms), Open-Meteo (CC BY 4.0; free non-commercial tier, the app has no ads or subscriptions), OpenStreetMap base map (ODbL, credited on the map). Build 19 replaced RainViewer radar with NOAA's public-domain radar. A screen recording is attached to our reply in the App Review messages.
