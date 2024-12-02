export abstract class HashComparer {
  abstract compare(play: string, hash: string): Promise<boolean>
}
