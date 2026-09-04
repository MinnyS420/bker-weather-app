/**
 * Browser stand-in for @react-native-community/geolocation.
 */
const Geolocation = {
  getCurrentPosition(
    success: (position: {
      coords: { latitude: number; longitude: number };
    }) => void,
    error?: (err: { code: number; message: string }) => void,
    options?: { timeout?: number },
  ): void {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      error?.({ code: 2, message: 'Geolocation unavailable' });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position =>
        success({
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        }),
      err => error?.({ code: err.code, message: err.message }),
      { timeout: options?.timeout, enableHighAccuracy: true },
    );
  },
};

export default Geolocation;
