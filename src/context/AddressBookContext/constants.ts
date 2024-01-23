export interface IAddressBookEntity {
  name: string
  address: string;
  did: string;
}

export interface IAddressBookContext {
  didEntities: IAddressBookEntity[];
  // keyEntities: IAddressBookEntity[];
  addDidEntity: (entity: IAddressBookEntity) => void;
  // getEntitiesPerDid(did: string): IAddressBookEntity[];
  // getEntitiesPerKey(key: string): IAddressBookEntity[];
}

export const initialState = {
  didEntities: [],
  addDidEntity: () => {},
};
