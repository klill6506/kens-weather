import CoreLocation
import SwiftUI
import WidgetKit

// Home and Lock Screen widget: temperature, conditions and today's high/low
// for where you are (or Athens, GA, the app's default, when location is off).

struct Place {
    let name: String
    let coordinate: CLLocationCoordinate2D
    static let fallback = Place(name: "Athens, GA", coordinate: .init(latitude: 33.9519, longitude: -83.3576))
}

struct WeatherEntry: TimelineEntry {
    let date: Date
    let place: String
    let temp: Int
    let high: Int
    let low: Int
    let code: Int
    let isDay: Bool
    let hours: [Hour]
    let failed: Bool

    struct Hour: Hashable {
        let label: String
        let temp: Int
        let code: Int
        let isDay: Bool
    }

    static let sample = WeatherEntry(
        date: .now, place: "Athens, GA", temp: 72, high: 78, low: 58, code: 2, isDay: true,
        hours: [.init(label: "2 PM", temp: 74, code: 2, isDay: true), .init(label: "3 PM", temp: 76, code: 1, isDay: true),
                .init(label: "4 PM", temp: 77, code: 1, isDay: true), .init(label: "5 PM", temp: 75, code: 3, isDay: true)],
        failed: false)
}

// MARK: - Weather codes (WMO), matching the app's icons

enum Sky {
    static func symbol(_ c: Int, day: Bool) -> String {
        switch c {
        case 0, 1: return day ? "sun.max.fill" : "moon.stars.fill"
        case 2: return day ? "cloud.sun.fill" : "cloud.moon.fill"
        case 45, 48: return "cloud.fog.fill"
        case 51...57: return "cloud.drizzle.fill"
        case 61...67, 80...82: return "cloud.rain.fill"
        case 71...77, 85, 86: return "cloud.snow.fill"
        case 95...99: return "cloud.bolt.rain.fill"
        default: return "cloud.fill"
        }
    }

    static func words(_ c: Int) -> String {
        switch c {
        case 0: return "Clear"
        case 1: return "Mostly clear"
        case 2: return "Partly cloudy"
        case 3: return "Cloudy"
        case 45, 48: return "Fog"
        case 51...57: return "Drizzle"
        case 61, 80: return "Light rain"
        case 63, 81: return "Rain"
        case 65, 82: return "Heavy rain"
        case 66, 67: return "Freezing rain"
        case 71...77, 85, 86: return "Snow"
        case 95...99: return "Storms"
        default: return "Cloudy"
        }
    }
}

// MARK: - Location and forecast

final class OneShotLocation: NSObject, CLLocationManagerDelegate {
    private let manager = CLLocationManager()
    private var done: ((CLLocation?) -> Void)?

    // Location callbacks need a run loop, so everything here happens on the main queue.
    func fetch(_ completion: @escaping (CLLocation?) -> Void) {
        DispatchQueue.main.async { [self] in
            guard manager.isAuthorizedForWidgetUpdates else { completion(nil); return }
            if let last = manager.location, last.timestamp.timeIntervalSinceNow > -15 * 60 { completion(last); return }
            done = completion
            manager.delegate = self
            manager.desiredAccuracy = kCLLocationAccuracyKilometer
            manager.requestLocation()
            DispatchQueue.main.asyncAfter(deadline: .now() + 8) { [self] in finish(manager.location) }
        }
    }

    private func finish(_ location: CLLocation?) {
        done?(location); done = nil
    }

    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        finish(locations.last)
    }

    func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        finish(manager.location)
    }
}

enum Forecast {
    struct Response: Decodable {
        struct Current: Decodable { let temperature_2m: Double; let weather_code: Int; let is_day: Int }
        struct Daily: Decodable { let temperature_2m_max: [Double]; let temperature_2m_min: [Double] }
        struct Hourly: Decodable { let time: [String]; let temperature_2m: [Double]; let weather_code: [Int]; let is_day: [Int] }
        let current: Current
        let daily: Daily
        let hourly: Hourly
    }

    static func load(_ place: Place) async throws -> WeatherEntry {
        var url = URLComponents(string: "https://api.open-meteo.com/v1/forecast")!
        url.queryItems = [
            .init(name: "latitude", value: String(format: "%.4f", place.coordinate.latitude)),
            .init(name: "longitude", value: String(format: "%.4f", place.coordinate.longitude)),
            .init(name: "current", value: "temperature_2m,weather_code,is_day"),
            .init(name: "hourly", value: "temperature_2m,weather_code,is_day"),
            .init(name: "daily", value: "temperature_2m_max,temperature_2m_min"),
            .init(name: "temperature_unit", value: "fahrenheit"),
            .init(name: "timezone", value: "auto"),
            .init(name: "forecast_days", value: "1"),
            .init(name: "forecast_hours", value: "6"),
        ]
        let (data, _) = try await URLSession.shared.data(from: url.url!)
        let r = try JSONDecoder().decode(Response.self, from: data)
        let hours = r.hourly.time.indices.dropFirst().prefix(4).map { i in
            WeatherEntry.Hour(label: hourLabel(r.hourly.time[i]), temp: Int(r.hourly.temperature_2m[i].rounded()),
                              code: r.hourly.weather_code[i], isDay: r.hourly.is_day[i] == 1)
        }
        return WeatherEntry(
            date: .now, place: place.name, temp: Int(r.current.temperature_2m.rounded()),
            high: Int((r.daily.temperature_2m_max.first ?? r.current.temperature_2m).rounded()),
            low: Int((r.daily.temperature_2m_min.first ?? r.current.temperature_2m).rounded()),
            code: r.current.weather_code, isDay: r.current.is_day == 1, hours: Array(hours), failed: false)
    }

    // "2026-10-28T14:00" in the place's own time zone -> "2 PM"
    static func hourLabel(_ s: String) -> String {
        let h = Int(s.dropFirst(11).prefix(2)) ?? 0
        return "\(h % 12 == 0 ? 12 : h % 12) \(h >= 12 ? "PM" : "AM")"
    }
}

struct Provider: TimelineProvider {
    func placeholder(in context: Context) -> WeatherEntry { .sample }

    func getSnapshot(in context: Context, completion: @escaping (WeatherEntry) -> Void) {
        if context.isPreview { completion(.sample) } else { build(completion) }
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<WeatherEntry>) -> Void) {
        build { entry in
            let next = Calendar.current.date(byAdding: .minute, value: entry.failed ? 15 : 30, to: .now)!
            completion(Timeline(entries: [entry], policy: .after(next)))
        }
    }

    private func build(_ completion: @escaping (WeatherEntry) -> Void) {
        let locator = OneShotLocation()
        locator.fetch { location in
            Task {
                let place = await Self.place(for: location)
                do { completion(try await Forecast.load(place)) } catch {
                    completion(WeatherEntry(date: .now, place: place.name, temp: 0, high: 0, low: 0, code: 3,
                                            isDay: true, hours: [], failed: true))
                }
                _ = locator
            }
        }
    }

    private static func place(for location: CLLocation?) async -> Place {
        guard let location else { return .fallback }
        var name = "My location"
        if let mark = try? await CLGeocoder().reverseGeocodeLocation(location).first, let city = mark.locality {
            name = mark.administrativeArea.map { "\(city), \($0)" } ?? city
        }
        return Place(name: name, coordinate: location.coordinate)
    }
}

// MARK: - Views

struct WeatherBearWidgetView: View {
    @Environment(\.widgetFamily) private var family
    let entry: WeatherEntry

    var body: some View {
        switch family {
        case .accessoryCircular:
            VStack(spacing: 0) {
                Image(systemName: Sky.symbol(entry.code, day: entry.isDay)).font(.system(size: 14))
                Text(entry.failed ? "--" : "\(entry.temp)°").font(.system(size: 20, weight: .semibold))
            }
        case .accessoryInline:
            Label(entry.failed ? "Weather Bear" : "\(entry.temp)° \(Sky.words(entry.code))",
                  systemImage: Sky.symbol(entry.code, day: entry.isDay))
        case .accessoryRectangular:
            VStack(alignment: .leading, spacing: 1) {
                Text(entry.place).font(.headline).lineLimit(1)
                Text(entry.failed ? "Open Weather Bear" : "\(entry.temp)° \(Sky.words(entry.code))").lineLimit(1)
                if !entry.failed { Text("H \(entry.high)°  L \(entry.low)°").foregroundStyle(.secondary) }
            }
        case .systemMedium:
            HStack(alignment: .top) {
                summary
                Spacer(minLength: 8)
                HStack(spacing: 10) {
                    ForEach(entry.hours, id: \.self) { h in
                        VStack(spacing: 6) {
                            Text(h.label).font(.caption2).foregroundStyle(.white.opacity(0.85))
                            Image(systemName: Sky.symbol(h.code, day: h.isDay)).symbolRenderingMode(.multicolor)
                            Text("\(h.temp)°").font(.subheadline.weight(.semibold))
                        }
                    }
                }
                .padding(.top, 18)
            }
            .foregroundStyle(.white)
        default:
            summary.foregroundStyle(.white)
        }
    }

    private var summary: some View {
        VStack(alignment: .leading, spacing: 2) {
            Text(entry.place).font(.caption.weight(.semibold)).lineLimit(1)
            if entry.failed {
                Spacer()
                Text("Weather is unavailable right now").font(.caption)
            } else {
                Text("\(entry.temp)°").font(.system(size: 44, weight: .light)).minimumScaleFactor(0.7)
                Spacer(minLength: 0)
                Image(systemName: Sky.symbol(entry.code, day: entry.isDay)).symbolRenderingMode(.multicolor)
                Text(Sky.words(entry.code)).font(.caption.weight(.medium)).lineLimit(1)
                Text("H \(entry.high)°  L \(entry.low)°").font(.caption)
            }
        }
    }
}

struct WeatherBearWidget: Widget {
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: "WeatherBearWidget", provider: Provider()) { entry in
            WeatherBearWidgetView(entry: entry)
                .containerBackground(for: .widget) {
                    LinearGradient(colors: entry.isDay ? [Color(red: 0.24, green: 0.52, blue: 0.86), Color(red: 0.16, green: 0.38, blue: 0.70)]
                                                       : [Color(red: 0.10, green: 0.16, blue: 0.30), Color(red: 0.05, green: 0.09, blue: 0.20)],
                                   startPoint: .top, endPoint: .bottom)
                }
        }
        .configurationDisplayName("Weather Bear")
        .description("Current temperature and today's high and low.")
        .supportedFamilies([.systemSmall, .systemMedium, .accessoryCircular, .accessoryRectangular, .accessoryInline])
    }
}

@main
struct WeatherBearWidgets: WidgetBundle {
    var body: some Widget { WeatherBearWidget() }
}
