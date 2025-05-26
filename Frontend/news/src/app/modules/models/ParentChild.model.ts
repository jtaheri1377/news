export class ParentChild {
  constructor(
    public childId: number | null,
    public child: string | null,
    public parentId: number | null,
    public parent: string | null
  ) {}
}
