import {calculateImagesReturn} from "./Photopage";

test('calculateImagesReturn', () => {
    let array = ["/a.jpg", "/b/c.jpg", "/b/d.jpg"];
    let correctResult = ["https://gocke-photo.de:8081//b/c.jpg", "https://gocke-photo.de:8081//b/d.jpg"];
    let functionResult = calculateImagesReturn(array, "/b");

    expect(functionResult).toEqual(correctResult);
  });

  test('calculates empty', () => {
    let array = ["/a.jpg", "/b/c.jpg", "/b/d.jpg"];
    let correctResult = [];
    let functionResult = calculateImagesReturn(array, "/c");

    expect(functionResult).toEqual(correctResult);
  });
  
  test('calculates for empty location', () => {
    let array = ["/a.jpg", "/b/c.jpg", "/b/d.jpg"];
    let correctResult = [a];
    let functionResult = calculateImagesReturn(array, "");

    expect(functionResult).toEqual(correctResult);
  });