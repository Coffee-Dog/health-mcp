import { AlertFeature, ForecastPeriod } from "./types.js";

export function formatAlert(feature: AlertFeature): string {
  const props = feature.properties;
  return [
    `Event: ${props.event || "Unknown"}`,
    `Area: ${props.areaDesc || "Unknown"}`,
    `Severity: ${props.severity || "Unknown"}`,
    `Status: ${props.status || "Unknown"}`,
    `Headline: ${props.headline || "No headline"}`,
    "---",
  ].join("\n");
}

export function formatForecastPeriod(period: ForecastPeriod): string {
  return [
    `${period.name || "Unknown"}:`,
    `Temperature: ${period.temperature || "Unknown"}°${
      period.temperatureUnit || "F"
    }`,
    `Wind: ${period.windSpeed || "Unknown"} ${period.windDirection || ""}`,
    `${period.shortForecast || "No forecast available"}`,
    "---",
  ].join("\n");
}

export function formatForecast(
  periods: ForecastPeriod[],
  latitude: number,
  longitude: number
): string {
  const formattedForecast = periods.map(formatForecastPeriod);
  return `Forecast for ${latitude}, ${longitude}:\n\n${formattedForecast.join("\n")}`;
}

export function formatAlerts(
  features: AlertFeature[],
  stateCode: string
): string {
  const formattedAlerts = features.map(formatAlert);
  return `Active alerts for ${stateCode}:\n\n${formattedAlerts.join("\n")}`;
}