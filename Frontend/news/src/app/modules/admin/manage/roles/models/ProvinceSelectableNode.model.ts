export class ProvinceSelectableNode {
  constructor(
    public name: string,
    public id: number,
    public parentId: number | null,
    public isSelected: boolean,
    public parent?: ProvinceSelectableNode[],
    public children?: ProvinceSelectableNode[]
  ) {}
}
