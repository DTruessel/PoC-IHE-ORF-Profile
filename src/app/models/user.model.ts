export class User {

  private _id: number;
  private _name: string;
  private _username: string;
  private _email: string;

  constructor(rawUser) {
    this._id = rawUser.id;
    this._name = rawUser.name;
    this._username = rawUser.username;
    this._email = rawUser.email;
  }

  public getId(): number {
    return this._id;
  }

  public getName(): string {
    return this._name;
  }

  public getUserName(): string {
    return this._username;
  }

  public getEmail(): string {
    return this._email;
  }
}

