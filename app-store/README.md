# Getting Weather Bear into the App Store

## How it's built (no Mac needed)
- **Capacitor 8** wraps the same `index.html` the website uses into a real iOS app.
  `npm run build` copies it into `www/` and adds the app-only bits (native location,
  in-app Privacy and Support links). The website is unchanged.
- **GitHub Actions** builds it on GitHub's Mac machines, free because the repo is public.
  `.github/workflows/ios.yml` has a "Build check" on every push and a manual
  "Upload to TestFlight" job that signs in the cloud with an App Store Connect API key.
- iPhone-only, portrait, iOS 15+. Bundle ID `com.kenlill.weatherbear` (can change until the first upload).

## Ken's steps, in order
1. **Join the Apple Developer Program as an individual** ($99/year): developer.apple.com/programs/enroll,
   or the Apple Developer app on iPhone. Needs an Apple Account with two-factor authentication
   and your legal name. The App Store will show "Ken Lill" as the seller.
2. **Make an API key**: App Store Connect › Users and Access › Integrations › App Store Connect API ›
   Team Keys › generate, role **Admin** (the first time, press Request Access and accept the terms).
   Download the .p8 file (one chance only). Note the Key ID and the Issuer ID shown above the list.
3. **Add three GitHub secrets** (repo Settings › Secrets and variables › Actions › New repository secret):
   `ASC_KEY_ID`, `ASC_ISSUER_ID`, `ASC_API_KEY_P8` (open the .p8 in Notepad and paste all of it,
   BEGIN and END lines included). The Team ID is already in the project.
4. **Register the bundle IDs**: Actions › iOS › Run workflow › register_ids ✔ (leave upload off).
   This also proves the three secrets work.
5. **Create the app in App Store Connect**: Apps › + › New App. Platform iOS, name
   Weather Bear: Radar & Forecast, language English (U.S.), bundle ID `com.kenlill.weatherbear`, SKU `weatherbear`.
6. **Run the upload**: Actions › iOS › Run workflow › upload ✔. The build shows up in TestFlight
   after Apple processes it; install the TestFlight app on your iPhone and try it.
7. **Fill in the listing** from `listing.md`, add screenshots, answer App Privacy, and press
   Submit for Review.

## Before submitting
- Guideline 4.2 rejects apps that are just a website in a wrapper. The app bundles its code
  (it doesn't load the website), uses native iOS location, and ships a **WidgetKit widget**
  (`ios/App/WeatherBearWidget`) for the Home Screen (small, medium) and Lock Screen
  (circular, rectangular, inline). The widget uses your location, or Athens, GA when location is off.
- The app greets people with "Good morning" instead of "Good morning, Ken"; the website still uses the name.
