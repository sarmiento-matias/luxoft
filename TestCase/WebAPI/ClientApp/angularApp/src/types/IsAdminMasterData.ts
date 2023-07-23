export class IsAdminMasterData {
  id: number | undefined;
  type: IsAdminMasterDataType | undefined;
}

export enum IsAdminMasterDataType {
  Radio,
  Dropdown
}
