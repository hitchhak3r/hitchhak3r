export interface IOffer {
  Confirmation: {
    DriverConfirmation: boolean,
    HitchhackerConfirmation: boolean,
  },
  Destination: {
    Geoposition: string,
    Name: string,
  },
  Hitchhacker: {
    GeoPosition: {
      lat: number,
      lng: number
    }
  }
}
