/* File per le classi custom del programma */

export class GenericJsonClass {
  protected _id: number;
    public get id(): number {
      return this._id;
    }
    public set id(val: number) {
      this._id = val;
    }
  protected _title: string;
    public get title(): string {
      return this._title;
    }
    public set title(value: string) {
      this._title = value;
    }
  protected _description: string;
    public get description(): string {
      return this._description;
    }
    public set description(value: string) {
      this._description = value;
    }
  protected _imgUrl: string;
    public get imgUrl(): string {
      return this._imgUrl;
    }
    public set imgUrl(value: string) {
      this._imgUrl = value;
    }
  protected _containerStyle: string;
    public get containerStyle(): string {
      return this._containerStyle;
    }
    public set containerStyle(value: string) {
      this._containerStyle = value;
    }

  constructor(id, title, desc, imgUrl, contStyle) {
    this._id = id;
    this._title = title;
    this._description = desc;
    this._imgUrl = imgUrl;
    this._containerStyle = contStyle;
  }
}

export class Room extends GenericJsonClass {
  private _artworks: Array<Artwork>;
    public get artworks(): Array<Artwork> {
      return this._artworks;
    }
    public set artworks(value: Array<Artwork>) {
      this._artworks = value;
    }

  constructor(id, title, desc, imgUrl, contStyle) {
    super(id, title, desc, imgUrl, contStyle);
    this.artworks = [];
  }

  addArtwork(artwork: Artwork) {
    this.artworks.push(artwork);
  }

}

export class Artwork extends GenericJsonClass {
  private position: number;
    public get $position(): number {
      return this.position;
    }
    public set $position(value: number) {
      this.position = value;
    }
  private audioUrl: string;
    public get $audioUrl(): string {
      return this.audioUrl;
    }
    public set $audioUrl(value: string) {
      this.audioUrl = value;
    }

  constructor(id, title, desc, imgUrl, contStyle, position, audioUrl) {
    super(id, title, desc, imgUrl, contStyle);
    this.position = position;
    this.audioUrl = audioUrl;
  }
}
