export class IncreaseSupply {
  static readonly type = "[Supply] Add To Supply";
  constructor(public payload: number) {}
}

export class DecreaseSupply {
  static readonly type = "[Supply] Deduct From Supply";
  constructor(public payload: number) {}
}

