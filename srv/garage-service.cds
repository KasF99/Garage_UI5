using { sap.garage as garage } from '../db/schema';


@path: 'garage'
service GarageService {
  entity Cars as projection on garage.Cars;
    annotate Cars;
  entity Member as projection on garage.Member;
    annotate Member;
}

extend projection GarageService.Member with {
  firstName || ' ' || lastName as name: String
}