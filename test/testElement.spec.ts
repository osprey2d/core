import Element from "../src/index";

test("测试创建点", () => {
  const result = [{ x: 10, y: 10 }];
  const res = new Element().createPoint({ x: 10, y: 10 })
  expect(res).toMatchObject(result);
});
