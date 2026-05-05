import { WatchedList } from "@/core/entities/watched-list";

class NumberWatchedList extends WatchedList<number> {
  compareItems(a: number, b: number): boolean {
    return a === b;
  }
}

describe("WatchedList additional", () => {
  it("should be able to check if an item exists in the list", () => {
    const list = new NumberWatchedList([1, 2, 3]);

    expect(list.exists(2)).toBe(true);
    expect(list.exists(5)).toBe(false);
  });

  it("should be able to remove a newly added item without adding to removed list", () => {
    const list = new NumberWatchedList([1, 2, 3]);

    list.add(4);
    expect(list.getNewItems()).toEqual([4]);
    expect(list.exists(4)).toBe(true);

    list.remove(4);
    expect(list.getItems()).toEqual([1, 2, 3]);
    expect(list.getNewItems()).toEqual([]);
    expect(list.getRemovedItems()).toEqual([]);
  });
});
