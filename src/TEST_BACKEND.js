function getPeopleByBoundary(people) {
  if (people.length === 0) return [];

  // Tính tổng khoảng cách đến 2 trục gần nhất
  const distances = people.map(p => {
    let distX = Math.abs(p.x); // Khoảng cách đến hàng cờ theo trục X
    let distY = Math.abs(p.y); // Khoảng cách đến hàng cờ theo trục Y

    let totalDistance = distX + distY; // Tổng khoảng cách
    return { ...p, totalDistance };
  });

  // Sắp xếp theo tổng khoảng cách giảm dần
  distances.sort((a, b) => b.totalDistance - a.totalDistance);

  // Tính số lượng 10% người xa nhất
  const top10Percent = Math.max(1, Math.ceil(people.length * 0.1));

  return distances.slice(0, top10Percent);
}

// --- Test dữ liệu ---
const people = [
  { x: 1, y: 2 },
  { x: 5, y: 6 },
  { x: -3, y: -4 },
  { x: 8, y: 9 },
  { x: 10, y: -2 },
  { x: -7, y: 3 },
  { x: 0, y: 0 },
  { x: 2, y: -6 },
  { x: -5, y: -8 },
  { x: 6, y: 7 },
  { x: 15, y: 20 },
  { x: -12, y: -15 },
  { x: -37, y: -15 },
];

console.log(getPeopleByBoundary(people));
