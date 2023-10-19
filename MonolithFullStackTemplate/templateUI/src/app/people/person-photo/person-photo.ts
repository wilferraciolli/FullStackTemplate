export class PersonPhoto {
  constructor(
    public id: number,
    public fileId: number,
    public name: string,
    public mimeType: string,
    public personId: string,
    public size: number,
    public links: {
      self: {
        href: string
      },
      downloadPersonPhoto?: {
        href: string
      }
    }
  ) {  }
}
