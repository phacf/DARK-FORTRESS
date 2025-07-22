export class IdController {
  private currentId = 0;
  private recycledIds: number[] = [];

  getNewId(): number {
    if (this.recycledIds.length > 0) {
      return this.recycledIds.pop()!;
    }
    return this.currentId++;
  }

  releaseId(id: number): void {
    this.recycledIds.push(id);
  }
}
