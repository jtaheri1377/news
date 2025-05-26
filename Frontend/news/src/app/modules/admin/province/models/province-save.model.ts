import { Media } from "../../../../core/models/media/media.model";

export class ProvinceSave {
  constructor(
    public name: string,
    public id: number,
    public parentId: string|null,
  ) {}
}
