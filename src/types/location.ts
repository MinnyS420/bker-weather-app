export interface GeoLocation {
  latitude: number;
  longitude: number;
  label: string;
  /** True when GPS failed and the last-known / default pin is in use. */
  isFallback: boolean;
}

/** Used only when the phone cannot provide a fix. */
export const FALLBACK_LOCATION: GeoLocation = {
  latitude: 42.0,
  longitude: 21.43,
  label: 'Skopje',
  isFallback: true,
};
