export type HospitalProps = {
  address: string;
  distance_from_airport: string;
  distance_from_koteshwor: string;
  distance_from_sanga: string;
  distance_from_thankot: string;
  id: number;
  latitude: number;
  longitude: number;
  name_of_hospital: string;
  phone_number: string | null;
  significance: boolean;
};
export type StreetMapProps = {
  hospitals: Array<HospitalProps>;
};
