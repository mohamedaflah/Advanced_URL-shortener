import { UAParser } from "ua-parser-js";

export function getOsAndDeviceDetails(userAgent: string) {
  const parser = new UAParser();
  const parsedResult = parser.setUA(userAgent).getResult();

  return {
    osName: parsedResult.os.name || "Unknown",
    deviceName: parsedResult.device.type || "desktop", // Default to 'desktop' if undefined
  };
}
